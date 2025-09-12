import { useState } from 'react';
import { ArrowLeft, Users, Clock, DollarSign, Calendar, CheckCircle, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TrainingDetail() {
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Simuler une formation (remplacée par API plus tard)
  const training = {
    id: 1,
    title: "Initiation à Arduino",
    description: "Apprenez à programmer des microcontrôleurs Arduino pour créer vos premiers projets électroniques. Ce stage est accessible aux débutants.",
    price: 15000,
    duration_hours: 20,
    start_date: "2025-04-15",
    schedule: "Lun-Ven 18h-20h",
    image: "https://placehold.co/800x400/3B82F6/FFFFFF?text=Formation+Arduino",
    modules: [
      "Introduction à l'électronique",
      "Programmation en C++ avec Arduino IDE",
      "Utilisation des capteurs et actionneurs",
      "Projet final : Robot suiveur de ligne"
    ],
    prerequisites: "Aucune compétence préalable requise",
    level: "Débutant",
    maxParticipants: 15,
    currentParticipants: 8
  };

  const handleEnroll = () => {
    setIsEnrolled(true);
    alert('Inscription confirmée ! Vous recevrez un email de confirmation.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/trainings" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indipo-800 mb-6">
        <ArrowLeft size={18} /> Retour aux formations
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <img
            src={training.image}
            alt={training.title}
            className="w-full h-96 object-cover rounded-xl"
          />
        </div>

        {/* Infos */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{training.title}</h1>
          
          <p className="text-gray-700 mb-6 leading-relaxed">{training.description}</p>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-blue-700">
                <Clock size={18} />
                <span>{training.duration_hours} heures</span>
              </div>
              <div className="flex items-center gap-2 text-green-700">
                <Users size={18} />
                <span>{training.currentParticipants}/{training.maxParticipants} places</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-purple-700">
                <Calendar size={18} />
                <span>Début : {new Date(training.start_date).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="flex items-center gap-2 text-orange-700">
                <DollarSign size={18} />
                <span className="font-bold">{training.price?.toLocaleString()} FCFA</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <BookOpen size={18} />
              <span>Niveau : {training.level}</span>
            </div>
          </div>

          {/* Progression d'inscription */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Inscrits</span>
              <span>{training.currentParticipants}/{training.maxParticipants}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(training.currentParticipants / training.maxParticipants) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Actions */}
          {!isEnrolled ? (
            <button
              onClick={handleEnroll}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
            >
              <CheckCircle size={20} /> S'inscrire à cette formation
            </button>
          ) : (
            <div className="bg-green-100 border border-green-200 p-4 rounded-lg text-center">
              <CheckCircle size={24} className="text-green-600 mx-auto mb-2" />
              <p className="text-green-800 font-medium">Vous êtes inscrit à cette formation !</p>
            </div>
          )}
        </div>
      </div>

      {/* Détails pédagogiques */}
      <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Programme détaillé</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Modules du stage</h3>
            <ol className="space-y-3">
              {training.modules.map((module, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  {module}
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Informations pratiques</h3>
            <dl className="space-y-3">
              <div>
                <dt className="font-medium text-gray-800">Prérequis :</dt>
                <dd className="text-gray-600">{training.prerequisites}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-800">Horaires :</dt>
                <dd className="text-gray-600">{training.schedule}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-800">Lieu :</dt>
                <dd className="text-gray-600">Lomé, Agoè - CITIL Lab</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-800">Matériel fourni :</dt>
                <dd className="text-gray-600">Kit Arduino, câbles, capteurs, manuel</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}