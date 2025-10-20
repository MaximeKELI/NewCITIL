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
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', image: '', imageFile: null, author: 'Admin', published: false });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    ApiService.getBlogPosts().then(setPosts);
  }, []);

  function validate(v) {
    const e = {};
    if (!v.title) e.title = 'Titre requis';
    if (!v.excerpt) e.excerpt = 'Extrait requis';
    if (!v.content) e.content = 'Contenu requis';
    if (!v.image && !v.imageFile) e.image = 'Image requise';
    return e;
  }

  function openCreate() {
    setForm({ title: '', excerpt: '', content: '', image: '', imageFile: null, author: 'Admin', published: false });
    setErrors({});
    setOpen(true);
  }

  function onFileChange(e) {
    const file = e.target.files?.[0] || null;
    if (!file) return setForm(f => ({ ...f, imageFile: null }));
    const url = URL.createObjectURL(file);
    setForm(f => ({ ...f, imageFile: file, image: url }));
  }

  // Fonction pour générer un slug à partir du titre
  function generateSlug(title) {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
      .replace(/[^a-z0-9\s-]/g, '') // Supprimer les caractères spéciaux
      .replace(/\s+/g, '-') // Remplacer les espaces par des tirets
      .replace(/-+/g, '-') // Supprimer les tirets multiples
      .trim();
  }

  async function onSubmit(e) {
    e.preventDefault();
    const e1 = validate(form); setErrors(e1); if (Object.keys(e1).length) return;
    
    try {
      const postData = {
        ...form,
        slug: generateSlug(form.title),
        published: Boolean(form.published)
      };
      
      console.log('Données à envoyer:', postData);
      const created = await ApiService.createBlogPost(postData);
      setPosts(prev => [created, ...prev]);
      setOpen(false);
    } catch (error) {
      console.error('Erreur lors de la création de l\'article:', error);
      const errorMessage = error.message || 'Une erreur est survenue lors de la création de l\'article.';
      alert(errorMessage);
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex justify-end">
        <Button onClick={openCreate} className="w-full sm:w-auto">Nouvel article</Button>
      </div>
      <Card title="Articles de blog">
        {/* Desktop Table */}
        <div className="hidden md:block">
          <Table>
            <THead>
              <TR hover={false}>
                <TH>ID</TH>
                <TH>Titre</TH>
                <TH>Auteur</TH>
                <TH>Catégorie</TH>
                <TH>Statut</TH>
                <TH>Date</TH>
                <TH>Actions</TH>
              </TR>
            </THead>
            <TBody>
              {posts.length === 0 ? (
                <TR>
                  <TD colSpan="7" className="text-center py-8 text-gray-500">
                    Aucun article trouvé. Commencez par créer votre premier article.
                  </TD>
                </TR>
              ) : (
                posts.map(p => (
                  <TR key={p.id}>
                    <TD>{p.id}</TD>
                    <TD className="max-w-[220px] truncate flex items-center gap-2">
                      {p.image && <img src={p.image} alt="" className="h-8 w-8 object-cover rounded" />}
                      <span className="truncate">{p.title}</span>
                    </TD>
                    <TD>{p.author || 'Admin'}</TD>
                    <TD>{p.category?.name || 'N/A'}</TD>
                    <TD>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        p.published 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {p.published ? 'Publié' : 'Brouillon'}
                      </span>
                    </TD>
                    <TD>{p.created_at ? new Date(p.created_at).toLocaleDateString() : '-'}</TD>
                    <TD className="space-x-2 whitespace-nowrap">
                      <Button variant="secondary" className="px-2 py-1 text-xs">Modifier</Button>
                      <Button className="px-2 py-1 text-xs">Supprimer</Button>
                    </TD>
                  </TR>
                ))
              )}
            </TBody>
          </Table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {posts.map((p) => (
            <div key={p.id} className="bg-white rounded-lg border border-[#AED5E6] p-4 space-y-3">
              <div className="flex items-start gap-3">
                {p.image && <img src={p.image} alt="" className="h-12 w-12 object-cover rounded flex-shrink-0" />}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-[#2C3E50] truncate">{p.title}</h3>
                  <p className="text-sm text-gray-600">Par {p.author || 'Admin'}</p>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">
                  {p.created_at ? new Date(p.created_at).toLocaleDateString() : '-'}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  p.published 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {p.published ? 'Publié' : 'Brouillon'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="Créer un article" size="lg"
        actions={<><Button variant="secondary" onClick={() => setOpen(false)} className="w-full sm:w-auto">Annuler</Button><Button onClick={onSubmit} className="w-full sm:w-auto">Enregistrer</Button></>}
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
          <div className="flex items-center gap-2">
            <input id="published" type="checkbox" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} />
            <label htmlFor="published" className="text-sm">Publié</label>
          </div>
        </form>
      </Modal>
    </div>
  );
}
