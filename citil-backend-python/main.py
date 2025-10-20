from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.api.endpoints import auth, users, products, categories, trainings, blog_posts, projects, orders, internship_applications
from app.database.database import engine
from app.models.models import Base

# Créer les tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="CITIL Platform API",
    description="API pour la plateforme CITIL - Centre d'Innovation Technologique et d'Intelligence Locale",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Servir les fichiers statiques
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Inclure les routes
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api", tags=["Users"])
app.include_router(products.router, prefix="/api", tags=["Products"])
app.include_router(categories.router, prefix="/api", tags=["Categories"])
app.include_router(trainings.router, prefix="/api", tags=["Trainings"])
app.include_router(blog_posts.router, prefix="/api", tags=["Blog"])
app.include_router(projects.router, prefix="/api", tags=["Projects"])
app.include_router(orders.router, prefix="/api", tags=["Orders"])
app.include_router(internship_applications.router, prefix="/api", tags=["Internship Applications"])

@app.get("/")
async def root():
    return {"message": "CITIL Platform API v2.0", "status": "running"}

@app.get("/api/test")
async def test():
    return {"message": "API is working!", "version": "2.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
