import React, { useMemo, useState } from 'react';
import Card from '../../components/ui/Card.jsx';
import Tabs from '../../components/ui/Tabs.jsx';
import LineChart from '../../components/charts/LineChart.jsx';
import BarChart from '../../components/charts/BarChart.jsx';
import Button from '../../components/Button.jsx';

function downloadCSV(filename, rows) {
  const processRow = (row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',');
  const csvContent = [rows[0], ...rows.slice(1)].map(processRow).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function Stats() {
  const [period, setPeriod] = useState('semaine');
  const tabs = [
    { value: 'jour', label: 'Jour' },
    { value: 'semaine', label: 'Semaine' },
    { value: 'mois', label: 'Mois' },
  ];

  const clients = useMemo(() => {
    const steps = period === 'jour' ? 7 : period === 'semaine' ? 8 : 12;
    return Array.from({ length: steps }).map((_, i) => ({ x: `${i + 1}`, y: Math.floor(10 + Math.random() * 100) }));
  }, [period]);

  const produits = useMemo(() => (
    [
      { label: 'Arduino', value: 240 },
      { label: 'ESP32', value: 180 },
      { label: 'Capteurs', value: 320 },
      { label: 'Kits', value: 140 },
    ]
  ), []);

  const conversion = useMemo(() => {
    const steps = period === 'jour' ? 7 : period === 'semaine' ? 8 : 12;
    return Array.from({ length: steps }).map((_, i) => ({ x: `${i + 1}`, y: Math.floor(1 + Math.random() * 20) }));
  }, [period]);

  return (
    <div className="space-y-6">
      <Card title="Période">
        <Tabs tabs={tabs} value={period} onChange={setPeriod} />
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Évolution du nombre de clients inscrits">
          <LineChart data={clients} />
        </Card>
        <Card title="Produits les plus vendus">
          <BarChart data={produits} />
        </Card>
      </div>

      <Card title="Taux de conversion (visite → commande)">
        <LineChart data={conversion} />
        <div className="mt-4">
          <Button onClick={() => downloadCSV('statistiques.csv', [
            ['metrique', 'x', 'y'],
            ...clients.map((d) => ['clients', d.x, d.y]),
          ])}>Exporter en CSV</Button>
        </div>
      </Card>
    </div>
  );
}
