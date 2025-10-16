// Utilitaires pour la gestion des avatars
export const getAvatarUrl = (avatarPath) => {
  if (!avatarPath) return null;
  
  // Si l'URL est déjà complète, la retourner telle quelle
  if (avatarPath.startsWith('http')) {
    return avatarPath;
  }
  
  // Construire l'URL complète avec le domaine du backend
  return `http://localhost:8001${avatarPath}`;
};

// Fonction pour vérifier si une image existe
export const checkImageExists = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};
