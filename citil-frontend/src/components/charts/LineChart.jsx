import React from 'react';

// Simple responsive SVG line chart. data: [{x: string, y: number}]
export default function LineChart({ data = [], color = '#3498DB', height = 180 }) {
  const padding = 24;
  const width = 600; // container will handle overflow
  const maxY = Math.max(1, ...data.map(d => d.y));
  const points = data.map((d, i) => {
    const x = padding + (i * (width - padding * 2)) / Math.max(1, data.length - 1);
    const y = height - padding - (d.y / maxY) * (height - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full overflow-x-auto">
      <svg width={width} height={height} className="min-w-full">
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline fill="none" stroke={color} strokeWidth="3" points={points} />
        <polygon
          points={`${points} ${padding},${height - padding} ${width - padding},${height - padding}`}
          fill="url(#lineGradient)"
        />
      </svg>
    </div>
  );
}
