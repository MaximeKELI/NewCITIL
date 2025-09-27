import React from 'react';

export default function Card({ title, subtitle, actions, children, className = '' }) {
  return (
    <div className={`rounded-xl bg-white/80 backdrop-blur border border-[#AED5E6] shadow-sm hover:shadow-md transition-shadow ${className}`}>
      {(title || actions || subtitle) && (
        <div className="flex items-start justify-between gap-3 p-4 border-b border-[#AED5E6] bg-white/60 rounded-t-xl">
          <div>
            {title && <h3 className="text-base sm:text-lg font-semibold text-[#2C3E50]">{title}</h3>}
            {subtitle && <p className="text-xs sm:text-sm text-gray-600">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}
