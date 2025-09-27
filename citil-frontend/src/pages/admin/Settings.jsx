import React, { useState } from 'react';
import Card from '../../components/ui/Card.jsx';
import { Label, Input } from '../../components/ui/FormInput.jsx';
import Button from '../../components/Button.jsx';

export default function SettingsAdmin() {
  const [company, setCompany] = useState('CITIL');
  const [email, setEmail] = useState('contact@citil.tg');
  const [phone, setPhone] = useState('+228 90 00 00 00');

  function onSave(e) {
    e.preventDefault();
    // Mock save
    alert('Paramètres enregistrés');
  }

  return (
    <div className="space-y-6">
      <Card title="Paramètres généraux">
        <form onSubmit={onSave} className="space-y-3 max-w-xl">
          <div>
            <Label htmlFor="company">Nom de l’entreprise</Label>
            <Input id="company" value={company} onChange={e => setCompany(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="email">Email de contact</Label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="phone">Téléphone</Label>
            <Input id="phone" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
          <Button type="submit">Enregistrer</Button>
        </form>
      </Card>
    </div>
  );
}
