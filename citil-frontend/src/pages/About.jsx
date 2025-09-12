import { Trophy, Users, Lightbulb, Rocket } from 'lucide-react';

export default function About() {
  const values = [
    { icon: <Lightbulb size={24} />, title: "Innovation", desc: "Nous repoussons constamment les limites de la technologie." },
    { icon: <Users size={24} />, title: "Formation", desc: "Former la nouvelle génération de développeurs africains." },
    { icon: <Rocket size={24} />, title: "Excellence", desc: "Qualité et précision dans chaque projet que nous réalisons." },
    { icon: <Trophy size={24} />, title: "Leadership", desc: "Pionniers dans la promotion de la tech au Togo et en Afrique." }
  ];

  const recognitions = [
    "Participation au programme national VaRRIWA",
    "Partenaire de l'initiative KIDS in TECH",
    "Reconnu par l'Office des Examens Professionnels du Supérieur (O.E.P.S)",
    "Entreprise innovante soutenue par FORMATEC"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">À propos de CITIL</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Cabinet d’Ingénierie des Technologies et Innovation le Leader – Spécialiste en robotique, intelligence artificielle et formation technique.
        </p>
      </div>

      {/* Mission */}
      <section className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Notre mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Démocratiser l'accès à la technologie en Afrique en formant les jeunes talents, en développant des solutions locales innovantes et en promouvant l'entrepreneuriat numérique. 
            Nous croyons que l'innovation ne doit pas être réservée à quelques-uns, mais accessible à tous.
          </p>
        </div>
      </section>

      {/* Valeurs */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Nos valeurs fondamentales</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition-all duration-300">
              <div className="text-indigo-600 mb-4 flex justify-center">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{value.title}</h3>
              <p className="text-gray-600">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reconnaissance */}
      <section className="bg-white rounded-2xl p-8 shadow-lg mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Reconnaissance & Partenariats</h2>
        <div className="max-w-3xl mx-auto">
          <ul className="space-y-4">
            {recognitions.map((recognition, index) => (
              <li key={index} className="flex items-center gap-3 text-gray-700">
                <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                {recognition}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Équipe */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Notre équipe</h2>
        <div className="bg-white rounded-2xl p-8 shadow-lg inline-block">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-indigo-600 rounded-full mb-4 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">MP</span>
            </div>
            <h3 className="text-xl font-semibold">M. Magnim PADABOH</h3>
            <p className="text-gray-600">Fondateur & Directeur Technique</p>
            <p className="text-sm text-gray-500 mt-2">Expert en IA, Robotique et IoT</p>
          </div>
        </div>
      </section>
    </div>
  );
}