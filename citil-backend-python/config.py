# Configuration de l'application
SECRET_KEY = "your-secret-key-change-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Base de données
DATABASE_URL = "sqlite:///./citil.db"

# Uploads
UPLOAD_DIR = "uploads"
MAX_FILE_SIZE = 2 * 1024 * 1024  # 2MB
ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"]

# CORS
ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]
