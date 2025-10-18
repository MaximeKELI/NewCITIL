import React, { useEffect, useState } from 'react';
import Card from '../../components/ui/Card.jsx';
import { Table, THead, TBody, TR, TH, TD } from '../../components/ui/Table.jsx';
import Button from '../../components/Button.jsx';
import Modal from '../../components/ui/Modal.jsx';
import { Label, Input, TextArea, FieldError } from '../../components/ui/FormInput.jsx';
import { ApiService } from '../../services/api.js';

export default function TrainingsAdmin() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', price: '', duration_hours: '', start_date: '', schedule: '', image: '', imageFile: null, is_active: true });
  const [errors, setErrors] = useState({});

  useEffect(() => { ApiService.getTrainings().then(setItems); }, []);

  const validate = (v) => {
    const e = {};
    if (!v.title) e.title = 'Titre requis';
    if (!v.description) e.description = 'Description requise';
    if (!v.start_date) e.start_date = 'Date requise';
    if (!v.price || Number(v.price) <= 0) e.price = 'Prix invalide';
    if (!v.duration_hours) e.duration_hours = 'Durée requise';
    if (!v.schedule) e.schedule = 'Horaires requis';
    if (!v.image && !v.imageFile) e.image = 'Image requise';
    return e;
  };

  function openCreate() { setEditing(null); setForm({ title: '', description: '', price: '', duration_hours: '', start_date: '', schedule: '', image: '', imageFile: null, is_active: true }); setErrors({}); setOpen(true); }
  function openEdit(t) { setEditing(t); setForm({ title: t.title, description: t.description || '', price: t.price, duration_hours: t.duration_hours, start_date: t.start_date, schedule: t.schedule || '', image: t.image || '', imageFile: null, is_active: t.is_active }); setErrors({}); setOpen(true); }

  function onFileChange(e) {
    const file = e.target.files?.[0] || null;
    if (!file) return setForm(f => ({ ...f, imageFile: null }));
    const url = URL.createObjectURL(file);
    setForm(f => ({ ...f, imageFile: file, image: url }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const e1 = validate(form); setErrors(e1); if (Object.keys(e1).length) return;
    
    try {
      const trainingData = {
        ...form,
        price: Number(form.price),
        is_active: Boolean(form.is_active)
      };

      if (editing) {
        const updated = await ApiService.updateTraining(editing.id, trainingData);
        setItems(prev => prev.map(i => i.id === updated.id ? updated : i));
      } else {
        const created = await ApiService.createTraining(trainingData);
        setItems(prev => [created, ...prev]);
      }
      setOpen(false);
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la formation:', error);
      const errorMessage = error.message || 'Une erreur est survenue lors de l\'enregistrement de la formation.';
      alert(errorMessage);
    }
  }

  async function onDelete(id) {
    if (!window.confirm('Supprimer cette formation ?')) return;
    await ApiService.deleteTraining(id);
    setItems(prev => prev.filter(i => i.id !== id));
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex justify-end">
        <Button onClick={openCreate} className="w-full sm:w-auto">Ajouter une formation</Button>
      </div>
      <Card title="Formations">
        {/* Desktop Table */}
        <div className="hidden md:block">
          <Table>
            <THead>
              <TR hover={false}>
                <TH>Titre</TH>
                <TH>Date</TH>
                <TH>Durée</TH>
                <TH>Prix</TH>
                <TH>Horaires</TH>
                <TH>Actions</TH>
              </TR>
            </THead>
            <TBody>
              {items.length === 0 ? (
                <TR>
                  <TD colSpan="6" className="text-center py-8 text-gray-500">
                    Aucune formation trouvée. Commencez par ajouter votre première formation.
                  </TD>
                </TR>
              ) : (
                items.map(t => (
                  <TR key={t.id}>
                    <TD className="font-medium max-w-[260px] truncate flex items-center gap-2">
                      {t.image && <img src={t.image} alt="" className="h-8 w-8 object-cover rounded" />}
                      <span className="truncate">{t.title}</span>
                    </TD>
                    <TD>{t.start_date}</TD>
                    <TD>{t.duration_hours}h</TD>
                    <TD>{Number(t.price).toLocaleString()} CFA</TD>
                    <TD>{t.schedule || '-'}</TD>
                    <TD className="space-x-2">
                      <Button variant="secondary" className="px-2 py-1 text-xs" onClick={() => openEdit(t)}>Modifier</Button>
                      <Button className="px-2 py-1 text-xs" onClick={() => onDelete(t.id)}>Supprimer</Button>
                    </TD>
                  </TR>
                ))
              )}
            </TBody>
          </Table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Aucune formation trouvée. Commencez par ajouter votre première formation.
            </div>
          ) : (
            items.map(t => (
              <div key={t.id} className="bg-white rounded-lg border border-[#AED5E6] p-4 space-y-3">
                <div className="flex items-start gap-3">
                  {t.image && <img src={t.image} alt="" className="h-12 w-12 object-cover rounded flex-shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-[#2C3E50] truncate">{t.title}</h3>
                    <p className="text-sm text-gray-600">Date: {t.start_date}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Durée:</span>
                    <span className="ml-1 font-medium">{t.duration_hours}h</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Prix:</span>
                    <span className="ml-1 font-medium">{Number(t.price).toLocaleString()} CFA</span>
                  </div>
                </div>
                {t.schedule && (
                  <div className="text-sm">
                    <span className="text-gray-600">Horaires:</span>
                    <span className="ml-1">{t.schedule}</span>
                  </div>
                )}
                <div className="flex gap-2 pt-2">
                  <Button variant="secondary" className="flex-1 text-xs" onClick={() => openEdit(t)}>Modifier</Button>
                  <Button className="flex-1 text-xs" onClick={() => onDelete(t.id)}>Supprimer</Button>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Modifier la formation' : 'Ajouter une formation'} size="lg"
        actions={<><Button variant="secondary" onClick={() => setOpen(false)} className="w-full sm:w-auto">Annuler</Button><Button onClick={onSubmit} className="w-full sm:w-auto">Enregistrer</Button></>}
      >
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <Label htmlFor="title">Titre</Label>
            <Input id="title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            <FieldError>{errors.title}</FieldError>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <TextArea id="description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={4} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="start_date">Date de début</Label>
              <Input id="start_date" type="date" value={form.start_date} onChange={e => setForm({ ...form, start_date: e.target.value })} required />
              <FieldError>{errors.start_date}</FieldError>
            </div>
            <div>
              <Label htmlFor="duration_hours">Durée (heures)</Label>
              <Input id="duration_hours" type="number" value={form.duration_hours} onChange={e => setForm({ ...form, duration_hours: e.target.value })} placeholder="ex: 20" required />
              <FieldError>{errors.duration_hours}</FieldError>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="price">Prix</Label>
              <Input id="price" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
              <FieldError>{errors.price}</FieldError>
            </div>
            <div>
              <Label htmlFor="schedule">Horaires</Label>
              <Input id="schedule" value={form.schedule} onChange={e => setForm({ ...form, schedule: e.target.value })} placeholder="ex: Lun-Ven 18h-20h" />
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
          <div className="flex items-center gap-2">
            <input id="is_active" type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} />
            <label htmlFor="is_active" className="text-sm">Formation active</label>
          </div>
        </form>
      </Modal>
    </div>
  );
}
