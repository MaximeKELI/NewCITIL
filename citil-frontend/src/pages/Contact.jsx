import { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'stage',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler un appel API
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ fullName: '', email: '', phone: '', subject: 'stage', message: '' });
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Contactez-nous</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Vous souhaitez vous inscrire à une formation, commander un composant ou candidater comme stagiaire ? 
          Notre équipe est à votre écoute.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Informations de contact */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Informations</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-indigo-100 p-3 rounded-full flex-shrink-0">
                  <MapPin className="text-indigo-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Adresse</h3>
                  <p className="text-gray-600">Lomé, Adido-Adin - Togo</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
                  <Phone className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Téléphone</h3>
                  <p className="text-gray-600">+228 90 01 38 02</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                  <Mail className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-600">contact@citil-tech.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Programme KIDS in TECH */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-3">🎓 KIDS in TECH</h3>
            <p className="mb-4">Des ateliers spécialement conçus pour stimuler la créativité technologique des jeunes.</p>
            <button className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition-colors">
              En savoir plus
            </button>
          </div>
        </div>

        {/* Formulaire de contact */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          {isSubmitted ? (
            <div className="text-center py-12">
              <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Message envoyé !</h2>
              <p className="text-gray-600">Nous avons bien reçu votre message. Nous vous répondrons dans les plus brefs délais.</p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
              >
                Envoyer un nouveau message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Formulaire de candidature / Contact</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Objet *</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="stage">Candidature de stage</option>
                  <option value="formation">Inscription à une formation</option>
                  <option value="commande">Commande de produit</option>
                  <option value="autre">Autre demande</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Présentez-vous, indiquez vos motivations..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send size={20} /> Envoyer le message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Carte Google Maps (simulée) */}
      <div className="mt-12 bg-gray-200 rounded-2xl h-80 flex items-center justify-center">
        <p className="text-gray-600">Emplacement de CITIL sur Google Maps</p>
      </div>
    </div>
  );
}