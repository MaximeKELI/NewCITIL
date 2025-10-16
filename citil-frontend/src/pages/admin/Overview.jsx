import React, { useState, useEffect } from 'react';
import Card from '../../components/ui/Card.jsx';
import { ApiService } from '../../services/api.js';

export default function Overview() {
  const [stats, setStats] = useState({
    products: 0,
    trainings: 0,
    users: 0,
    applications: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [products, trainings, users, applications] = await Promise.all([
          ApiService.getProducts().catch(() => []),
          ApiService.getTrainings().catch(() => []),
          ApiService.getUsers().catch(() => []),
          ApiService.getApplications().catch(() => [])
        ]);
        
        setStats({
          products: products.length,
          trainings: trainings.length,
          users: users.length,
          applications: applications.length
        });
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Message d'information pour l'admin */}
      <Card title="Bienvenue dans l'administration" className="border-blue-200 bg-blue-50">
        <div className="text-blue-800">
          <p className="mb-2">
            <strong>Plateforme prête !</strong> Vous pouvez maintenant commencer à ajouter du contenu.
          </p>
          <p className="text-sm">
            Utilisez les menus de gauche pour gérer les produits, formations, articles de blog et autres contenus.
          </p>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Produits">
          <div className="text-3xl font-bold text-[#2C3E50]">
            {loading ? '...' : stats.products}
          </div>
          <div className="text-xs text-gray-600 mt-1">
            {stats.products === 0 ? 'Aucun produit ajouté' : 'Produits en stock'}
          </div>
        </Card>
        <Card title="Formations">
          <div className="text-3xl font-bold text-[#2C3E50]">
            {loading ? '...' : stats.trainings}
          </div>
          <div className="text-xs text-gray-600 mt-1">
            {stats.trainings === 0 ? 'Aucune formation ajoutée' : 'Formations actives'}
          </div>
        </Card>
        <Card title="Utilisateurs">
          <div className="text-3xl font-bold text-[#2C3E50]">
            {loading ? '...' : stats.users}
          </div>
          <div className="text-xs text-gray-600 mt-1">
            {stats.users === 0 ? 'Aucun utilisateur' : 'Utilisateurs inscrits'}
          </div>
        </Card>
        <Card title="Candidatures">
          <div className="text-3xl font-bold text-[#2C3E50]">
            {loading ? '...' : stats.applications}
          </div>
          <div className="text-xs text-gray-600 mt-1">
            {stats.applications === 0 ? 'Aucune candidature' : 'Candidatures reçues'}
          </div>
        </Card>
      </div>

      <Card title="Actions recommandées" subtitle="Prochaines étapes pour configurer votre plateforme">
        <div className="space-y-3">
          {stats.products === 0 && (
            <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm">Ajoutez vos premiers produits dans la section "Produits"</span>
            </div>
          )}
          {stats.trainings === 0 && (
            <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm">Créez des formations dans la section "Formations"</span>
            </div>
          )}
          {stats.products > 0 && stats.trainings > 0 && (
            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Excellent ! Votre plateforme est prête à être utilisée.</span>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}