from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.models import Order, OrderItem, Product, User
from app.schemas.schemas import OrderResponse, OrderCreate, OrderItemCreate
from app.api.core.deps import get_current_user, get_current_admin_user
from typing import List

router = APIRouter()

@router.post("/admin/orders", response_model=OrderResponse)
async def create_order(
    order_data: OrderCreate,
    db: Session = Depends(get_db),
    admin_user = Depends(get_current_admin_user)
):
    """Créer une nouvelle commande (admin seulement)"""
    # Calculer le montant total
    total_amount = 0
    order_items = []
    
    for item_data in order_data.items:
        # Vérifier que le produit existe
        product = db.query(Product).filter(Product.id == item_data.product_id).first()
        if not product:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Produit avec l'ID {item_data.product_id} non trouvé"
            )
        
        # Vérifier le stock
        if product.stock < item_data.quantity:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Stock insuffisant pour le produit {product.name}"
            )
        
        # Calculer le prix total pour cet item
        item_total = product.price * item_data.quantity
        total_amount += item_total
        
        # Créer l'item de commande
        order_item = OrderItem(
            product_id=item_data.product_id,
            quantity=item_data.quantity,
            price=product.price
        )
        order_items.append(order_item)
    
    # Créer la commande
    order = Order(
        user_id=admin_user.id,  # Pour l'instant, on utilise l'admin
        total_amount=total_amount,
        shipping_address=order_data.shipping_address,
        notes=order_data.notes,
        status="pending"
    )
    
    db.add(order)
    db.flush()  # Pour obtenir l'ID de la commande
    
    # Ajouter les items à la commande
    for order_item in order_items:
        order_item.order_id = order.id
        db.add(order_item)
    
    # Mettre à jour le stock des produits
    for item_data in order_data.items:
        product = db.query(Product).filter(Product.id == item_data.product_id).first()
        product.stock -= item_data.quantity
    
    db.commit()
    db.refresh(order)
    
    return OrderResponse(
        id=order.id,
        user_id=order.user_id,
        total_amount=order.total_amount,
        status=order.status,
        shipping_address=order.shipping_address,
        notes=order.notes,
        created_at=order.created_at
    )

@router.get("/admin/orders", response_model=List[OrderResponse])
async def get_all_orders(
    db: Session = Depends(get_db),
    admin_user = Depends(get_current_admin_user)
):
    """Obtenir toutes les commandes (admin seulement)"""
    orders = db.query(Order).all()
    return [
        OrderResponse(
            id=order.id,
            user_id=order.user_id,
            total_amount=order.total_amount,
            status=order.status,
            shipping_address=order.shipping_address,
            notes=order.notes,
            created_at=order.created_at
        )
        for order in orders
    ]

@router.get("/admin/orders/{order_id}", response_model=OrderResponse)
async def get_order(
    order_id: int,
    db: Session = Depends(get_db),
    admin_user = Depends(get_current_admin_user)
):
    """Obtenir une commande par ID (admin seulement)"""
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Commande non trouvée"
        )
    
    return OrderResponse(
        id=order.id,
        user_id=order.user_id,
        total_amount=order.total_amount,
        status=order.status,
        shipping_address=order.shipping_address,
        notes=order.notes,
        created_at=order.created_at
    )

@router.put("/admin/orders/{order_id}", response_model=OrderResponse)
async def update_order_status(
    order_id: int,
    status: str,
    db: Session = Depends(get_db),
    admin_user = Depends(get_current_admin_user)
):
    """Mettre à jour le statut d'une commande (admin seulement)"""
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Commande non trouvée"
        )
    
    # Valider le statut
    valid_statuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"]
    if status not in valid_statuses:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Statut invalide. Statuts autorisés: {', '.join(valid_statuses)}"
        )
    
    order.status = status
    db.commit()
    db.refresh(order)
    
    return OrderResponse(
        id=order.id,
        user_id=order.user_id,
        total_amount=order.total_amount,
        status=order.status,
        shipping_address=order.shipping_address,
        notes=order.notes,
        created_at=order.created_at
    )

@router.delete("/admin/orders/{order_id}")
async def delete_order(
    order_id: int,
    db: Session = Depends(get_db),
    admin_user = Depends(get_current_admin_user)
):
    """Supprimer une commande (admin seulement)"""
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Commande non trouvée"
        )
    
    # Supprimer les items de commande
    db.query(OrderItem).filter(OrderItem.order_id == order_id).delete()
    
    # Supprimer la commande
    db.delete(order)
    db.commit()
    
    return {"message": "Commande supprimée avec succès"}
