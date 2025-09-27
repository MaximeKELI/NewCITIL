import React from 'react';

export function Label({ htmlFor, children, className = '' }) {
  return <label htmlFor={htmlFor} className={`block text-sm font-medium text-[#2C3E50] mb-1 ${className}`}>{children}</label>;
}

export function Input({ id, type = 'text', value, onChange, placeholder, required, className = '', ...props }) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`w-full rounded-lg border border-[#AED5E6] bg-white/80 backdrop-blur px-3 py-2 text-[#2C3E50] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3498DB] focus:border-transparent transition ${className}`}
      {...props}
    />
  );
}

export function TextArea({ id, value, onChange, rows = 4, placeholder, required, className = '', ...props }) {
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      required={required}
      className={`w-full rounded-lg border border-[#AED5E6] bg-white/80 backdrop-blur px-3 py-2 text-[#2C3E50] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3498DB] focus:border-transparent transition ${className}`}
      {...props}
    />
  );
}

export function Select({ id, value, onChange, children, required, className = '' }) {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full rounded-lg border border-[#AED5E6] bg-white/80 backdrop-blur px-3 py-2 text-[#2C3E50] focus:outline-none focus:ring-2 focus:ring-[#3498DB] focus:border-transparent transition ${className}`}
    >
      {children}
    </select>
  );
}

export function FieldError({ children }) {
  if (!children) return null;
  return <p className="mt-1 text-xs text-red-600">{children}</p>;
}

export default { Label, Input, TextArea, Select, FieldError };
