// Utilitaires pour les images
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  // Si c'est déjà une URL complète, la retourner
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Si c'est un chemin relatif, construire l'URL complète
  if (imagePath.startsWith('/uploads/')) {
    return `http://localhost:8001${imagePath}`;
  }
  
  // Si c'est un chemin sans slash initial, l'ajouter
  if (!imagePath.startsWith('/')) {
    return `http://localhost:8001/uploads/${imagePath}`;
  }
  
  return `http://localhost:8001${imagePath}`;
};

export const getApiUrl = () => {
  return 'http://localhost:8001';
};
