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

  const validate = (v) => {
    const e = {};
    if (!v.name) e.name = 'Nom requis';
    return e;
  };

  function openCreate() { setEditing(null); setForm({ name: '', description: '' }); setErrors({}); setOpen(true); }
  function openEdit(c) { setEditing(c); setForm({ name: c.name, description: c.description || '' }); setErrors({}); setOpen(true); }

  async function onSubmit(e) {
    e.preventDefault();
    const e1 = validate(form); setErrors(e1); if (Object.keys(e1).length) return;
    if (editing) {
      const updated = await ApiService.updateCategory(editing.id, form);
      setItems(prev => prev.map(i => i.id === updated.id ? updated : i));
    } else {
      const created = await ApiService.createCategory(form);
      setItems(prev => [created, ...prev]);
    }
    setOpen(false);
  }

  async function onDelete(id) {
    if (!window.confirm('Supprimer cette catégorie ?')) return;
    await ApiService.deleteCategory(id);
    setItems(prev => prev.filter(i => i.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={openCreate}>Ajouter une catégorie</Button>
      </div>
      <Card title="Catégories">
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
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Modifier la catégorie' : 'Ajouter une catégorie'}
        actions={<><Button variant="secondary" onClick={() => setOpen(false)}>Annuler</Button><Button onClick={onSubmit}>Enregistrer</Button></>}
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
