import React, { useState } from 'react';
import { ApiService } from '../services/api.js';

export default function Stages() {
  const [form, setForm] = useState({ name: '', email: '', message: '', cvFile: null });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function validate(v) {
    const e = {};
    if (!v.name) e.name = 'Nom complet requis';
    if (!v.email) e.email = "Adresse mail requise";
    if (!v.cvFile) e.cvFile = 'CV requis (PDF ou DOC)';
    return e;
  }

  function onFileChange(e) {
    const file = e.target.files?.[0] || null;
    setForm(f => ({ ...f, cvFile: file }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const e1 = validate(form); setErrors(e1); if (Object.keys(e1).length) return;
    try {
      setSubmitting(true);
      await ApiService.submitInternshipApplication(form);
      alert('Votre candidature a été envoyée avec succès. Merci !');
      setForm({ name: '', email: '', message: '', cvFile: null });
      setErrors({});
      e.target.reset();
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Erreur lors de l\'envoi de la candidature.';
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#2C3E50] mb-6">Candidature de stage</h1>
      <p className="text-[#2C3E50]/80 mb-8">Remplissez ce formulaire pour postuler à un stage chez CITIL. Nous reviendrons vers vous rapidement.</p>

      <form onSubmit={onSubmit} className="space-y-5 bg-white border border-[#AED5E6] rounded-lg p-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1 text-[#2C3E50]">Nom complet</label>
          <input id="name" className="w-full rounded-md border border-[#AED5E6] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3498DB]" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          {errors.name && <div className="text-sm text-red-600 mt-1">{errors.name}</div>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1 text-[#2C3E50]">Adresse mail</label>
          <input id="email" type="email" className="w-full rounded-md border border-[#AED5E6] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3498DB]" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          {errors.email && <div className="text-sm text-red-600 mt-1">{errors.email}</div>}
        </div>
        <div>
          <label htmlFor="cv" className="block text-sm font-medium mb-1 text-[#2C3E50]">CV (PDF/DOC)</label>
          <input id="cv" type="file" accept=".pdf,.doc,.docx" onChange={onFileChange} className="block w-full text-sm text-[#2C3E50] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#3498DB] file:text-white hover:file:bg-[#2980B9]" required />
          {errors.cvFile && <div className="text-sm text-red-600 mt-1">{errors.cvFile}</div>}
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1 text-[#2C3E50]">Message (motivation)</label>
          <textarea id="message" rows={4} className="w-full rounded-md border border-[#AED5E6] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3498DB]" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Expliquez votre motivation et la raison de votre demande de stage" />
        </div>
        <div>
          <button type="submit" disabled={submitting} className="inline-flex items-center justify-center rounded-md bg-[#3498DB] px-4 py-2 text-white hover:bg-[#2980B9] disabled:opacity-50">
            {submitting ? 'Envoi…' : 'Envoyer ma candidature'}
          </button>
        </div>
      </form>
    </section>
  );
}
