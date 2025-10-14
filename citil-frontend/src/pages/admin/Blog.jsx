import React, { useEffect, useState } from 'react';
import Card from '../../components/ui/Card.jsx';
import { Table, THead, TBody, TR, TH, TD } from '../../components/ui/Table.jsx';
import Button from '../../components/Button.jsx';
import Modal from '../../components/ui/Modal.jsx';
import { Label, Input, TextArea, Select, FieldError } from '../../components/ui/FormInput.jsx';
import { ApiService } from '../../services/api.js';

export default function BlogAdmin() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', image: '', imageFile: null, blog_category_id: '', author: 'Admin', published: false });
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    ApiService.getBlogPosts().then(setPosts);
    ApiService.getBlogCategories().then(setCategories);
  }, []);

  function validate(v) {
    const e = {};
    if (!v.title) e.title = 'Titre requis';
    if (!v.excerpt) e.excerpt = 'Extrait requis';
    if (!v.content) e.content = 'Contenu requis';
    if (!v.blog_category_id) e.blog_category_id = 'Catégorie requise';
    if (!v.image && !v.imageFile) e.image = 'Image requise';
    return e;
  }

  function openCreate() {
    setForm({ title: '', excerpt: '', content: '', image: '', imageFile: null, blog_category_id: categories[0]?.id || '', author: 'Admin', published: false });
    setErrors({});
    setOpen(true);
  }

  function onFileChange(e) {
    const file = e.target.files?.[0] || null;
    if (!file) return setForm(f => ({ ...f, imageFile: null }));
    const url = URL.createObjectURL(file);
    setForm(f => ({ ...f, imageFile: file, image: url }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const e1 = validate(form); setErrors(e1); if (Object.keys(e1).length) return;
    // Envoi vers backend (multipart)
    const created = await ApiService.createBlogPost({ ...form });
    setPosts(prev => [created, ...prev]);
    setOpen(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={openCreate}>Nouvel article</Button>
      </div>
      <Card title="Articles de blog">
        <Table>
          <THead>
            <TR hover={false}>
              <TH>Titre</TH>
              <TH>Auteur</TH>
              <TH>Date</TH>
              <TH>Statut</TH>
            </TR>
          </THead>
          <TBody>
            {posts.map((p) => (
              <TR key={p.id}>
                <TD className="max-w-[320px] truncate flex items-center gap-2">
                  {p.image && <img src={p.image} alt="" className="h-8 w-8 object-cover rounded" />}
                  <span className="truncate">{p.title}</span>
                </TD>
                <TD>{p.author || 'Admin'}</TD>
                <TD>{p.created_at ? new Date(p.created_at).toLocaleDateString() : '-'}</TD>
                <TD>{p.published ? 'Publié' : 'Brouillon'}</TD>
              </TR>
            ))}
          </TBody>
        </Table>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="Créer un article"
        actions={<><Button variant="secondary" onClick={() => setOpen(false)}>Annuler</Button><Button onClick={onSubmit}>Enregistrer</Button></>}
      >
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <Label htmlFor="title">Titre</Label>
            <Input id="title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            <FieldError>{errors.title}</FieldError>
          </div>
          <div>
            <Label htmlFor="excerpt">Extrait</Label>
            <TextArea id="excerpt" value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} rows={3} required />
            <FieldError>{errors.excerpt}</FieldError>
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
          <div>
            <Label htmlFor="content">Contenu</Label>
            <TextArea id="content" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={6} required />
            <FieldError>{errors.content}</FieldError>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="blog_category_id">Catégorie</Label>
              <Select id="blog_category_id" value={form.blog_category_id} onChange={e => setForm({ ...form, blog_category_id: e.target.value })}>
                <option value="">Sélectionner une catégorie</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </Select>
              <FieldError>{errors.blog_category_id}</FieldError>
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input id="published" type="checkbox" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} />
              <label htmlFor="published" className="text-sm">Publié</label>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
