import React, { useEffect, useMemo, useState } from 'react';
import Card from '../../components/ui/Card.jsx';
import { Table, THead, TBody, TR, TH, TD } from '../../components/ui/Table.jsx';
import { Input, Select } from '../../components/ui/FormInput.jsx';
import { ApiService } from '../../services/api.js';

export default function UsersAdmin() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => { ApiService.getUsers().then(setUsers); }, []);

  const filtered = useMemo(() => users.filter(u => (
    (!query || `${u.name} ${u.email}`.toLowerCase().includes(query.toLowerCase())) &&
    (!role || u.role === role)
  )), [users, query, role]);

  return (
    <div className="space-y-6">
      <Card title="Filtrer">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <Input placeholder="Rechercher par nom ou email..." value={query} onChange={e => setQuery(e.target.value)} className="sm:max-w-xs" />
          <Select value={role} onChange={e => setRole(e.target.value)} className="sm:w-56">
            <option value="">Tous les rôles</option>
            <option value="client">Client</option>
            <option value="admin">Admin</option>
          </Select>
        </div>
      </Card>

      <Card title="Clients & Utilisateurs">
        <Table>
          <THead>
            <TR hover={false}>
              <TH>Nom</TH>
              <TH>Email</TH>
              <TH>Téléphone</TH>
              <TH>Rôle</TH>
              <TH>Date d’inscription</TH>
            </TR>
          </THead>
          <TBody>
            {filtered.length === 0 ? (
              <TR>
                <TD colSpan="5" className="text-center py-8 text-gray-500">
                  Aucun utilisateur trouvé.
                </TD>
              </TR>
            ) : (
              filtered.map(u => (
                <TR key={u.id}>
                  <TD className="font-medium">{u.name}</TD>
                  <TD>{u.email}</TD>
                  <TD>{u.phone || '-'}</TD>
                  <TD className="capitalize">{u.role}</TD>
                  <TD>{u.createdAt}</TD>
                </TR>
              ))
            )}
          </TBody>
        </Table>
      </Card>
    </div>
  );
}
