import { useState, useEffect } from 'react';
import { ArrowLeft, Save, Clock } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditBlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    image: null,
    author: 'Nanga Ditorga',
    published: true
  });
  const [originalData, setOriginalData] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Simuler un appel API
    setTimeout(() => {
      const mockPost = {
        id: 1,
        title: "Introduction à TensorFlow.js",
        excerpt: "Découvrez comment implémenter l'intelligence artificielle dans vos navigateurs web.",
        content: "TensorFlow.js est une bibliothèque JavaScript...",
        category: "IA",
        author: "Nanga Ditorga",
        published: true,
        created_at: "2025-04-01T09:00:00Z",
        updated_at: "2025-04-01T10:30:00Z"
      };
      setFormData(mockPost);
      setOriginalData(mockPost);
      setLoading(false);
    }, 800);
  }, [id]);

  const categories = [
    { id: 1, name: "IA" },
    { id: 2, name: "IoT" },
    { id: 3, name: "Arduino" },
    { id: 4, name: "Éducation" },
    { id: 5, name: "Actualités" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Le titre est requis';
    if (!formData.excerpt.trim()) newErrors.excerpt = 'L\'extrait est requis';
    if (!formData.content.trim()) newErrors.content = 'Le contenu est requis';
    if (!formData.category) newErrors.category = 'Veuillez choisir une catégorie';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simuler un appel API
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`Article "${formData.title}" mis à jour avec succès !`);
      navigate('/admin/blog');
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement de l'article...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pl-16">
      <header className="bg-white shadow-sm border-b fixed top-0 left-16 right-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Modifier un article</h1>
            <button
              onClick={() => navigate('/admin/blog')}
              className="flex items-center gap-2 text-indigo-600 hover:text-indipo-800"
            >
              <ArrowLeft size={18} /> Retour à la liste
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Informations générales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Titre *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Auteur</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                disabled
                className="w-full px-4 py-3 border border-gray-300 bg-gray-100 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
              <select
                name="published"
                value={formData.published ? 'published' : 'draft'}
                onChange={(e) => setFormData({ ...formData, published: e.target.value === 'published' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              >
                <option value="draft">Brouillon</option>
                <option value="published">Publié</option>
              </select>
            </div>
          </div>

          {/* Extrait */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Extrait *</label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows="3"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                errors.excerpt ? 'border-red-500' : 'border-gray-300'
              }`}
            ></textarea>
            {errors.excerpt && <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>}
          </div>

          {/* Contenu */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contenu *</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="8"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                errors.content ? 'border-red-500' : 'border-gray-300'
              }`}
            ></textarea>
            {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image actuelle</label>
            <img src="https://placehold.co/100x100/EF4444/FFFFFF?text=Blog" alt="Article" className="h-20 w-20 object-cover rounded-lg mb-2" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Métadonnées */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Métadonnées</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span><strong>Créé le :</strong> {new Date(originalData.created_at).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span><strong>Dernière modification :</strong> {new Date(originalData.updated_at).toLocaleDateString('fr-FR')}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => navigate('/admin/blog')}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Mise à jour...
                </>
              ) : (
                <>
                  <Save size={20} /> Mettre à jour
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}