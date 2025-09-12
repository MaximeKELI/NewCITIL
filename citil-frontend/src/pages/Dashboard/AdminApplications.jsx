import { useState, useEffect } from 'react';
import { Search, Mail, Phone, User, CheckCircle, XCircle } from 'lucide-react';

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    setTimeout(() => {
      const mockApplications = [
        { 
          id: 1, 
          fullName: "Komi Amedome", 
          email: "komi@gmail.com", 
          phone: "+228 90 01 38 02", 
          cvPath: "/cv/komi.pdf", 
          message: "Étudiant en informatique passionné par la robotique.", 
          status: "received", 
          submittedAt: "2025-04-01T10:30:00Z" 
        },
        { 
          id: 2, 
          fullName: "Adjoa Lawson", 
          email: "adjoa@gmail.com", 
          phone: "+228 98 76 54 32", 
          cvPath: "/cv/adjoa.pdf", 
          message: "Je souhaite acquérir des compétences pratiques en IA.", 
          status: "reviewed", 
          submittedAt: "2025-03-29T14:20:00Z" 
        },
        { 
          id: 3, 
          fullName: "Koffi Agbessi", 
          email: "koffi@gmail.com", 
          phone: "+228 97 88 99 00", 
          cvPath: "/cv/koffi.pdf", 
          message: "Passionné par l'IoT et les systèmes embarqués.", 
          status: "accepted", 
          submittedAt: "2025-03-28T09:15:00Z" 
        }
      ];
      setApplications(mockApplications);
      setLoading(false);
    }, 800);
  }, []);

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id, newStatus) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'received': return 'bg-gray-100 text-gray-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pl-16">
      <header className="bg-white shadow-sm border-b fixed top-0 left-16 right-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Gestion des candidatures</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher par nom ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="md:w-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">Tous les statuts</option>
              <option value="received">Reçues</option>
              <option value="reviewed">Examinées</option>
              <option value="accepted">Acceptées</option>
              <option value="rejected">Refusées</option>
            </select>
          </div>
        </div>

        {/* Applications List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des candidatures...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredApplications.map(app => (
              <div key={app.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <User size={24} className="text-indigo-600" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{app.fullName}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Mail size={14} />
                            <span>{app.email}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone size={14} />
                            <span>{app.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4 line-clamp-2">{app.message}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <a 
                        href={app.cvPath} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                      >
                        Voir le CV
                      </a>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(app.status)}`}>
                        {app.status === 'received' && 'Reçue'}
                        {app.status === 'reviewed' && 'Examinée'}
                        {app.status === 'accepted' && 'Acceptée'}
                        {app.status === 'rejected' && 'Refusée'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(app.submittedAt).toLocaleDateString('fr-FR')} à {new Date(app.submittedAt).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 min-w-fit">
                    <button
                      onClick={() => updateStatus(app.id, 'accepted')}
                      disabled={app.status === 'accepted'}
                      className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <CheckCircle size={16} />
                      Accepter
                    </button>
                    <button
                      onClick={() => updateStatus(app.id, 'rejected')}
                      disabled={app.status === 'rejected'}
                      className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <XCircle size={16} />
                      Refuser
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredApplications.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucune candidature ne correspond aux critères.</p>
          </div>
        )}
      </main>
    </div>
  );
}