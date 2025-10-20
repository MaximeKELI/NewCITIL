import React, { useEffect, useState } from 'react';
import Card from '../../components/ui/Card.jsx';
import { Table, THead, TBody, TR, TH, TD } from '../../components/ui/Table.jsx';
import Button from '../../components/Button.jsx';
import Modal from '../../components/ui/Modal.jsx';
import { Label, Input, TextArea, FieldError } from '../../components/ui/FormInput.jsx';
import { ApiService } from '../../services/api.js';

export default function CategoriesAdmin() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', description: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => { ApiService.getCategories().then(setItems); }, []);

  // Fonction pour générer un slug à partir du nom
  function generateSlug(name) {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
      .replace(/[^a-z0-9\s-]/g, '') // Supprimer les caractères spéciaux
      .replace(/\s+/g, '-') // Remplacer les espaces par des tirets
      .replace(/-+/g, '-') // Supprimer les tirets multiples
      .trim();
  }

  const validate = (v) => {
    const e = {};
    if (!v.name) e.name = 'Nom requis';
    return e;
  };

  function openCreate() { setEditing(null); setForm({ name: '', description: '' }); setErrors({}); setOpen(true); }
  function openEdit(c) { setEditing(c); setForm({ name: c.name, description: c.description || '' }); setErrors({}); setOpen(true); }

  async function onSubmit(e) {
    e.preventDefault();
    const e1 = validate(form); 
    setErrors(e1); 
    if (Object.keys(e1).length) return;
    
    try {
      // Préparer les données avec le slug généré automatiquement
      const categoryData = {
        ...form,
        slug: generateSlug(form.name)
      };
      
      console.log('Données à envoyer:', categoryData);
      
      if (editing) {
        const updated = await ApiService.updateCategory(editing.id, categoryData);
        setItems(prev => prev.map(i => i.id === updated.id ? updated : i));
      } else {
        const created = await ApiService.createCategory(categoryData);
        setItems(prev => [created, ...prev]);
      }
      setOpen(false);
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la catégorie:', error);
      
      // Gestion des erreurs de validation du backend
      if (error.response?.data?.errors) {
        const backendErrors = {};
        Object.keys(error.response.data.errors).forEach(key => {
          backendErrors[key] = error.response.data.errors[key][0];
        });
        setErrors(backendErrors);
      } else {
        // Erreur générale
        const errorMessage = error.message || 'Une erreur est survenue lors de l\'enregistrement de la catégorie.';
        alert(errorMessage);
      }
    }
  }

  async function onDelete(id) {
    if (!window.confirm('Supprimer cette catégorie ?')) return;
    
    try {
      await ApiService.deleteCategory(id);
      setItems(prev => prev.filter(i => i.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie:', error);
      const errorMessage = error.message || 'Impossible de supprimer cette catégorie. Elle est peut-être utilisée par des produits.';
      alert(errorMessage);
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex justify-end">
        <Button onClick={openCreate} className="w-full sm:w-auto">Ajouter une catégorie</Button>
      </div>
      <Card title="Catégories">
        {/* Desktop Table */}
        <div className="hidden md:block">
          <Table>
            <THead>
              <TR hover={false}>
                <TH>Nom</TH>
                <TH>Slug</TH>
                <TH>Description</TH>
                <TH>Actions</TH>
              </TR>
            </THead>
            <TBody>
              {items.map(c => (
                <TR key={c.id}>
                  <TD className="font-medium">{c.name}</TD>
                  <TD>{c.slug}</TD>
                  <TD className="max-w-[360px] truncate">{c.description}</TD>
                  <TD className="space-x-2">
                    <Button variant="secondary" className="px-2 py-1 text-xs" onClick={() => openEdit(c)}>Modifier</Button>
                    <Button className="px-2 py-1 text-xs" onClick={() => onDelete(c.id)}>Supprimer</Button>
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {items.map(c => (
            <div key={c.id} className="bg-white rounded-lg border border-[#AED5E6] p-4 space-y-3">
              <div>
                <h3 className="font-medium text-[#2C3E50]">{c.name}</h3>
                <p className="text-sm text-gray-600">Slug: {c.slug}</p>
              </div>
              {c.description && (
                <p className="text-sm text-gray-700">{c.description}</p>
              )}
              <div className="flex gap-2 pt-2">
                <Button variant="secondary" className="flex-1 text-xs" onClick={() => openEdit(c)}>Modifier</Button>
                <Button className="flex-1 text-xs" onClick={() => onDelete(c.id)}>Supprimer</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Modifier la catégorie' : 'Ajouter une catégorie'}
        actions={<><Button variant="secondary" onClick={() => setOpen(false)} className="w-full sm:w-auto">Annuler</Button><Button onClick={onSubmit} className="w-full sm:w-auto">Enregistrer</Button></>}
      >
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <Label htmlFor="name">Nom</Label>
            <Input id="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            <FieldError>{errors.name}</FieldError>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <TextArea id="description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={4} />
          </div>
        </form>
      </Modal>
    </div>
  );
}
