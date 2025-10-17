import React, { useEffect, useMemo, useState } from 'react';
import Card from '../../components/ui/Card.jsx';
import { Table, THead, TBody, TR, TH, TD } from '../../components/ui/Table.jsx';
import Button from '../../components/Button.jsx';
import Modal from '../../components/ui/Modal.jsx';
import { Label, Input, TextArea, Select, FieldError } from '../../components/ui/FormInput.jsx';
import { ApiService } from '../../services/api.js';

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', price: '', stock: '', image: '', imageFile: null, category: '', ref: '' });
  const [errors, setErrors] = useState({});

  function handleApiError(err, fallback = 'Une erreur réseau est survenue.') {
    const msg = err?.response?.data?.message || err?.message || fallback;
    console.error('API error:', err);
    window.alert(msg);
  }

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
  }, []);

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
    setForm({ name: '', description: '', price: '', stock: '', image: '', imageFile: null, category: '', ref: '' });
    setErrors({});
    setOpen(true);
  }

  function openEdit(p) {
    setEditing(p);
    setForm({ name: p.name, description: p.description, price: p.price, stock: p.stock, image: p.image, imageFile: null, category: p.category?.name || '', ref: p.ref || '' });
    setErrors({});
    setOpen(true);
  }

  async function onSubmit(e) {
    e.preventDefault();
    const e1 = validate(form);
    setErrors(e1);
    if (Object.keys(e1).length) return;

    try {
      if (editing) {
        const updated = await ApiService.updateProduct(editing.id, { ...form, image: form.image, price: Number(form.price), stock: Number(form.stock) });
        setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
      } else {
        const created = await ApiService.createProduct({ ...form, image: form.image, price: Number(form.price), stock: Number(form.stock) });
        setProducts(prev => [created, ...prev]);
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <Input placeholder="Rechercher un produit..." value={query} onChange={e => setQuery(e.target.value)} className="sm:max-w-xs" />
        <Select value={category} onChange={e => setCategory(e.target.value)} className="sm:w-56">
          <option value="">Toutes catégories</option>
          {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
        </Select>
        <div className="flex-1" />
        <Button onClick={openCreate}>Ajouter un produit</Button>
      </div>

      <Card title="Produits">
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
                    {p.image && <img src={p.image} alt="" className="h-8 w-8 object-cover rounded" />}
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
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Modifier le produit' : 'Ajouter un produit'}
        actions={(
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>Annuler</Button>
            <Button onClick={onSubmit}>Enregistrer</Button>
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
        </form>
      </Modal>
    </div>
  );
}
