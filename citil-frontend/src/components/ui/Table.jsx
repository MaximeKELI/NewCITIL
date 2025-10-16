import React from 'react';

export function Table({ children, className = '' }) {
  return (
    <div className={`w-full overflow-x-auto rounded-lg border border-[#AED5E6] bg-white/80 backdrop-blur ${className}`}>
      <table className="min-w-full text-sm text-[#2C3E50]">{children}</table>
    </div>
  );
}

export function THead({ children }) {
  return (
    <thead className="bg-[#F9F9EA] text-xs uppercase tracking-wide">
      {children}
    </thead>
  );
}

export function TBody({ children }) {
  return <tbody className="divide-y divide-[#AED5E6]">{children}</tbody>;
}

export function TR({ children, hover = true }) {
  return (
    <tr className={hover ? 'hover:bg-[#AED5E6]/20 transition-colors' : ''}>
      {children}
    </tr>
  );
}

export function TH({ children, className = '' }) {
  return (
    <th className={`px-3 py-2 text-left font-semibold text-[#2C3E50] ${className}`}>{children}</th>
  );
}

export function TD({ children, className = '' }) {
  return (
    <td className={`px-3 py-2 align-middle ${className}`}>{children}</td>
  );
}

const TableComponents = { Table, THead, TBody, TR, TH, TD };
export default TableComponents;
