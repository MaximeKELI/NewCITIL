import React, { useEffect, useState } from 'react';
import Card from '../../components/ui/Card.jsx';
import { Table, THead, TBody, TR, TH, TD } from '../../components/ui/Table.jsx';
import Button from '../../components/Button.jsx';
import Modal from '../../components/ui/Modal.jsx';
import { Label, Input, TextArea, FieldError } from '../../components/ui/FormInput.jsx';
import { ApiService } from '../../services/api.js';

export default function StagesAdmin() {
  const [apps, setApps] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', location: '', contact: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => { ApiService.getApplications().then(setApps); }, []);

  function validate(v) {
    const e = {};
    if (!v.title) e.title = 'Titre requis';
    if (!v.description) e.description = 'Description requise';
    return e;
  }

  async function changeStatus(id, status) {
    const updated = await ApiService.updateApplicationStatus(id, status);
    setApps(prev => prev.map(a => a.id === id ? updated : a));
  }

  function openCreate() { setForm({ title: '', description: '', location: '', contact: '' }); setErrors({}); setOpen(true); }

  function onSubmit(e) {
    e.preventDefault();
    const e1 = validate(form); setErrors(e1); if (Object.keys(e1).length) return;
    // Mock: just close modal; in Laravel this would POST the offer
    setOpen(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={openCreate}>Publier une offre de stage</Button>
      </div>

      <Card title="Candidatures reçues">
        <Table>
          <THead>
            <TR hover={false}>
              <TH>Nom</TH>
              <TH>Email</TH>
              <TH>CV</TH>
              <TH>Message</TH>
              <TH>Statut</TH>
              <TH>Actions</TH>
            </TR>
          </THead>
          <TBody>
            {apps.map(a => (
              <TR key={a.id}>
                <TD className="font-medium">{a.name}</TD>
                <TD>{a.email}</TD>
                <TD>
                  <a href={a.cvUrl} className="text-[#3498DB] hover:underline" download>
                    Télécharger
                  </a>
                </TD>
                <TD className="max-w-[240px] truncate">{a.message}</TD>
                <TD>{a.status}</TD>
                <TD className="space-x-2 whitespace-nowrap">
                  <Button variant="secondary" className="px-2 py-1 text-xs" onClick={() => changeStatus(a.id, 'Validé')}>Valider</Button>
                  <Button className="px-2 py-1 text-xs" onClick={() => changeStatus(a.id, 'Refusé')}>Refuser</Button>
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="Publier une offre de stage"
        actions={<><Button variant="secondary" onClick={() => setOpen(false)}>Annuler</Button><Button onClick={onSubmit}>Publier</Button></>}
      >
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <Label htmlFor="title">Titre</Label>
            <Input id="title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            <FieldError>{errors.title}</FieldError>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <TextArea id="description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={4} required />
            <FieldError>{errors.description}</FieldError>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="location">Lieu</Label>
              <Input id="location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="contact">Contact</Label>
              <Input id="contact" value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
