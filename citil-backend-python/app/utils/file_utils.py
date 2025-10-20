import os
import uuid
from fastapi import UploadFile, HTTPException
from PIL import Image
from config import UPLOAD_DIR, MAX_FILE_SIZE, ALLOWED_IMAGE_TYPES

def save_uploaded_file(file: UploadFile, subfolder: str = "") -> str:
    """Sauvegarder un fichier uploadé"""
    # Vérifier la taille du fichier
    if file.size and file.size > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail="Fichier trop volumineux (max 2MB)")
    
    # Vérifier le type de fichier
    if file.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(status_code=400, detail="Type de fichier non autorisé")
    
    # Créer le dossier de destination
    upload_path = os.path.join(UPLOAD_DIR, subfolder)
    os.makedirs(upload_path, exist_ok=True)
    
    # Générer un nom de fichier unique
    file_extension = file.filename.split('.')[-1] if '.' in file.filename else 'jpg'
    unique_filename = f"{uuid.uuid4()}.{file_extension}"
    file_path = os.path.join(upload_path, unique_filename)
    
    # Sauvegarder le fichier
    with open(file_path, "wb") as buffer:
        content = file.file.read()
        buffer.write(content)
    
    # Optimiser l'image si c'est une image
    if file.content_type.startswith('image/'):
        optimize_image(file_path)
    
    # Retourner le chemin relatif
    return os.path.join(subfolder, unique_filename)

def optimize_image(file_path: str, max_size: tuple = (800, 600)):
    """Optimiser une image"""
    try:
        with Image.open(file_path) as img:
            # Convertir en RGB si nécessaire
            if img.mode in ('RGBA', 'LA', 'P'):
                img = img.convert('RGB')
            
            # Redimensionner si nécessaire
            img.thumbnail(max_size, Image.Resampling.LANCZOS)
            
            # Sauvegarder avec optimisation
            img.save(file_path, 'JPEG', quality=85, optimize=True)
    except Exception as e:
        print(f"Erreur lors de l'optimisation de l'image: {e}")

def delete_file(file_path: str):
    """Supprimer un fichier"""
    if file_path and os.path.exists(file_path):
        try:
            os.remove(file_path)
        except Exception as e:
            print(f"Erreur lors de la suppression du fichier: {e}")

def get_file_url(file_path: str) -> str:
    """Obtenir l'URL d'un fichier"""
    if file_path:
        return f"/uploads/{file_path}"
    return None
