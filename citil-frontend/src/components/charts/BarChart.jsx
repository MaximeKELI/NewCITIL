import React from 'react';

// data: [{label: string, value: number}]
export default function BarChart({ data = [], color = '#3498DB', height = 200 }) {
  const padding = 24;
  const barWidth = 42;
  const gap = 16;
  const width = padding * 2 + data.length * (barWidth + gap) - gap;
  const maxY = Math.max(1, ...data.map(d => d.value));

  return (
    <div className="w-full overflow-x-auto">
      <svg width={width} height={height} className="min-w-full">
        {data.map((d, i) => {
          const x = padding + i * (barWidth + gap);
          const h = ((d.value / maxY) * (height - padding * 2));
          const y = height - padding - h;
          return (
            <g key={i}>
              <rect x={x} y={y} width={barWidth} height={h} rx="8" fill={color} className="transition-all" />
              <text x={x + barWidth / 2} y={height - padding / 2} textAnchor="middle" fontSize="10" fill="#2C3E50">{d.label}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
