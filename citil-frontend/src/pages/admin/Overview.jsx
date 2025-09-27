import React, { useMemo } from 'react';
import Card from '../../components/ui/Card.jsx';
import LineChart from '../../components/charts/LineChart.jsx';

export default function Overview() {
  const visitors = useMemo(() => {
    // 7 derniers jours
    const today = new Date();
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (6 - i));
      const label = d.toLocaleDateString('fr-FR', { weekday: 'short' });
      return { x: label, y: Math.floor(50 + Math.random() * 200) };
    });
  }, []);

  const recent = [
    { id: 1, text: 'Nouveau produit ajouté: ESP32 DevKit' },
    { id: 2, text: 'Commande passée par Kossi D.' },
    { id: 3, text: 'Nouvel utilisateur inscrit: Awa K.' },
    { id: 4, text: 'Article publié: Démarrer avec Arduino' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Total clients">
          <div className="text-3xl font-bold text-[#2C3E50]">1 245</div>
          <div className="text-xs text-gray-600 mt-1">+4% cette semaine</div>
        </Card>
        <Card title="Produits en stock">
          <div className="text-3xl font-bold text-[#2C3E50]">128</div>
          <div className="text-xs text-gray-600 mt-1">-2% vs mois dernier</div>
        </Card>
        <Card title="Formations actives">
          <div className="text-3xl font-bold text-[#2C3E50]">6</div>
          <div className="text-xs text-gray-600 mt-1">2 nouvelles</div>
        </Card>
        <Card title="Candidatures reçues">
          <div className="text-3xl font-bold text-[#2C3E50]">32</div>
          <div className="text-xs text-gray-600 mt-1">+8 cette semaine</div>
        </Card>
      </div>

      <Card title="Visiteurs (7 derniers jours)">
        <LineChart data={visitors} />
      </Card>

      <Card title="Activité récente" subtitle="Dernières actions sur la plateforme">
        <ul className="space-y-2 text-sm">
          {recent.map((r) => (
            <li key={r.id} className="rounded-lg border border-[#AED5E6] bg-white/70 px-3 py-2">{r.text}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
