import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">CITIL</h3>
            <p className="text-gray-300">Cabinet d’Ingénierie des Technologies et Innovation le Leader.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Accueil</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Boutique</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Formations</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Projets</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Robotique</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">IA Appliquée</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Formation Arduino</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Vente de kits</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Suivez-nous</h4>
            <div className="flex space-x-4">
              <a href="#"><Facebook size={20} /></a>
              <a href="#"><Twitter size={20} /></a>
              <a href="#"><Instagram size={20} /></a>
              <a href="#"><Linkedin size={20} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          &copy; {new Date().getFullYear()} CITIL. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}