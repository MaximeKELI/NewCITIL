import React, { useEffect, useMemo, useState, useCallback } from 'react';
import Card from '../../components/ui/Card.jsx';
import { Table, THead, TBody, TR, TH, TD } from '../../components/ui/Table.jsx';
import Button from '../../components/Button.jsx';
import Modal from '../../components/ui/Modal.jsx';
import { Label, Input, TextArea, Select, FieldError } from '../../components/ui/FormInput.jsx';
import { ApiService } from '../../services/api.js';
import { getImageUrl } from '../../utils/imageUtils.js';
import { useNotificationContext } from '../../context/NotificationContext.js';

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', price: '', stock: '', image: '', imageFile: null, category: '', ref: '', is_active: true });
  const [errors, setErrors] = useState({});
  const { success, error } = useNotificationContext();

  const handleApiError = useCallback((err, fallback = 'Une erreur réseau est survenue.') => {
    const msg = err?.response?.data?.message || err?.message || fallback;
    console.error('API error:', err);
    error(msg);
  }, [error]);

  useEffect(() => {
    (async () => {
      try {
        const [prods, cats] = await Promise.all([
          ApiService.getProducts(),
          ApiService.getCategories(),
        ]);
        setProducts(prods || []);
        setCategories(cats || []);
      } catch (err) {
        handleApiError(err, 'Impossible de charger les produits ou catégories.');
      }
    })();
  }, [handleApiError]);

  const filtered = useMemo(() => products.filter(p => (
    (!query || p.name.toLowerCase().includes(query.toLowerCase())) &&
    (!category || p.category?.name === category)
  )), [products, query, category]);

  function validate(values) {
    const e = {};
    if (!values.name) e.name = 'Nom requis';
    if (!values.price || Number(values.price) <= 0) e.price = 'Prix invalide';
    if (!values.stock || Number(values.stock) < 0) e.stock = 'Stock invalide';
    if (!values.category) e.category = 'Catégorie requise';
    if (!values.image && !values.imageFile) e.image = 'Image requise (sélectionnez un fichier)';
    return e;
  }

  function openCreate() {
    setEditing(null);
    setForm({ name: '', description: '', price: '', stock: '', image: '', imageFile: null, category: '', ref: '', is_active: true });
    setErrors({});
    setOpen(true);
  }

  function openEdit(p) {
    setEditing(p);
    setForm({ name: p.name, description: p.description, price: p.price, stock: p.stock, image: p.image, imageFile: null, category: p.category?.name || '', ref: p.ref || '', is_active: p.is_active !== false });
    setErrors({});
    setOpen(true);
  }

  async function onSubmit(e) {
    e.preventDefault();
    const e1 = validate(form);
    setErrors(e1);
    if (Object.keys(e1).length) return;

    try {
      // Trouver l'ID de la catégorie sélectionnée
      const selectedCategory = categories.find(c => c.name === form.category);
      const categoryId = selectedCategory ? selectedCategory.id : null;

      const productData = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        category_id: categoryId,
        reference: form.ref || `REF-${Date.now()}`,
        is_active: Boolean(form.is_active)
      };

      if (editing) {
        const updated = await ApiService.updateProduct(editing.id, productData);
        setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
        success('Produit modifié avec succès !');
      } else {
        const created = await ApiService.createProduct(productData);
        setProducts(prev => [created, ...prev]);
        success('Produit créé avec succès !');
      }
      setOpen(false);
    } catch (err) {
      handleApiError(err, 'Impossible d\'enregistrer le produit.');
    }
  }

  async function onDelete(id) {
    if (!window.confirm('Supprimer ce produit ?')) return;
    try {
      await ApiService.deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      success('Produit supprimé avec succès !');
    } catch (err) {
      handleApiError(err, 'Impossible de supprimer le produit.');
    }
  }

  function onFileChange(e) {
    const file = e.target.files?.[0] || null;
    if (!file) return setForm(f => ({ ...f, imageFile: null }));
    const url = URL.createObjectURL(file);
    setForm(f => ({ ...f, imageFile: file, image: url }));
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-1">
          <Input placeholder="Rechercher un produit..." value={query} onChange={e => setQuery(e.target.value)} className="sm:max-w-xs" />
          <Select value={category} onChange={e => setCategory(e.target.value)} className="sm:w-56">
            <option value="">Toutes catégories</option>
            {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          </Select>
        </div>
        <Button onClick={openCreate} className="w-full sm:w-auto">Ajouter un produit</Button>
      </div>

      <Card title="Produits">
        {/* Desktop Table */}
        <div className="hidden md:block">
          <Table>
            <THead>
              <TR hover={false}>
                <TH>ID</TH>
                <TH>Nom</TH>
                <TH>Prix</TH>
                <TH>Stock</TH>
                <TH>Catégorie</TH>
                <TH>Statut</TH>
                <TH>Actions</TH>
              </TR>
            </THead>
            <TBody>
              {filtered.length === 0 ? (
                <TR>
                  <TD colSpan="7" className="text-center py-8 text-gray-500">
                    Aucun produit trouvé. Commencez par ajouter votre premier produit.
                  </TD>
                </TR>
              ) : (
                filtered.map(p => (
                  <TR key={p.id}>
                    <TD>{p.id}</TD>
                    <TD className="max-w-[220px] truncate flex items-center gap-2">
                      {p.image && <img src={getImageUrl(p.image)} alt="" className="h-8 w-8 object-cover rounded" />}
                      <span className="truncate">{p.name}</span>
                    </TD>
                    <TD>{Number(p.price).toLocaleString()} CFA</TD>
                    <TD>{p.stock}</TD>
                    <TD>{p.category?.name || 'N/A'}</TD>
                    <TD>{p.stock > 0 ? 'En stock' : 'Rupture'}</TD>
                    <TD className="space-x-2 whitespace-nowrap">
                      <Button variant="secondary" className="px-2 py-1 text-xs" onClick={() => openEdit(p)}>Modifier</Button>
                      <Button className="px-2 py-1 text-xs" onClick={() => onDelete(p.id)}>Supprimer</Button>
                    </TD>
                  </TR>
                ))
              )}
            </TBody>
          </Table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Aucun produit trouvé. Commencez par ajouter votre premier produit.
            </div>
          ) : (
            filtered.map(p => (
              <div key={p.id} className="bg-white rounded-lg border border-[#AED5E6] p-4 space-y-3">
                <div className="flex items-start gap-3">
                  {p.image && <img src={getImageUrl(p.image)} alt="" className="h-12 w-12 object-cover rounded flex-shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-[#2C3E50] truncate">{p.name}</h3>
                    <p className="text-sm text-gray-600">ID: {p.id}</p>
                    <p className="text-sm text-gray-600">{p.category?.name || 'N/A'}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Prix:</span>
                    <span className="ml-1 font-medium">{Number(p.price).toLocaleString()} CFA</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Stock:</span>
                    <span className={`ml-1 font-medium ${p.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {p.stock} ({p.stock > 0 ? 'En stock' : 'Rupture'})
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="secondary" className="flex-1 text-xs" onClick={() => openEdit(p)}>Modifier</Button>
                  <Button className="flex-1 text-xs" onClick={() => onDelete(p.id)}>Supprimer</Button>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Modifier le produit' : 'Ajouter un produit'} size="lg"
        actions={(
          <>
            <Button variant="secondary" onClick={() => setOpen(false)} className="w-full sm:w-auto">Annuler</Button>
            <Button onClick={onSubmit} className="w-full sm:w-auto">Enregistrer</Button>
          </>
        )}
      >
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <Label htmlFor="name">Nom</Label>
            <Input id="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            <FieldError>{errors.name}</FieldError>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <TextArea id="description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="price">Prix</Label>
              <Input id="price" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
              <FieldError>{errors.price}</FieldError>
            </div>
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input id="stock" type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} required />
              <FieldError>{errors.stock}</FieldError>
            </div>
          </div>
          <div>
            <Label htmlFor="image">Image</Label>
            <input id="image" type="file" accept="image/*" onChange={onFileChange} className="block w-full text-sm text-[#2C3E50] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#3498DB] file:text-white hover:file:bg-[#2980B9]" />
            {form.image && (
              <div className="mt-2">
                <img src={form.image} alt="Aperçu" className="h-24 w-24 object-cover rounded border" />
              </div>
            )}
            <FieldError>{errors.image}</FieldError>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="category">Catégorie</Label>
              <Select id="category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required>
                <option value="">Choisir...</option>
                {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </Select>
              <FieldError>{errors.category}</FieldError>
            </div>
            <div>
              <Label htmlFor="ref">Référence</Label>
              <Input id="ref" value={form.ref} onChange={e => setForm({ ...form, ref: e.target.value })} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input 
              id="is_active" 
              type="checkbox" 
              checked={form.is_active} 
              onChange={e => setForm({ ...form, is_active: e.target.checked })} 
            />
            <label htmlFor="is_active" className="text-sm">Produit actif</label>
          </div>
        </form>
      </Modal>
    </div>
  );
}
