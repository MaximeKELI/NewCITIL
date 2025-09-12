import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Brain, Code } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Bienvenue chez <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">CITIL</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Cabinet d'Ingénierie des Technologies et Innovation le Leader. Spécialiste en robotique, intelligence artificielle, IoT et formation technique.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105"
            >
              Découvrir la boutique
              <ArrowRight className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/trainings"
              className="inline-flex items-center gap-2 border-2 border-white/30 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 backdrop-blur-sm"
            >
              Voir les formations
            </Link>
          </div>
        </div>

        {/* Floating tech icons */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:flex gap-12">
          <div className="animate-bounce text-cyan-400"><Cpu size={40} /></div>
          <div className="animate-bounce text-purple-400" style={{ animationDelay: '0.2s' }}><Brain size={40} /></div>
          <div className="animate-bounce text-pink-400" style={{ animationDelay: '0.4s' }}><Code size={40} /></div>
        </div>
      </div>
    </div>
  );
}