import React from 'react';

export default function Tabs({ tabs = [], value, onChange }) {
  return (
    <div className="flex w-full overflow-x-auto rounded-lg border border-[#AED5E6] bg-white/70 backdrop-blur">
      {tabs.map((t) => (
        <button
          key={t.value}
          className={`px-4 py-2 text-sm font-medium transition-colors border-r border-[#AED5E6] last:border-r-0 ${
            value === t.value ? 'bg-[#3498DB] text-white' : 'hover:bg-[#AED5E6]/30 text-[#2C3E50]'
          }`}
          onClick={() => onChange(t.value)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
