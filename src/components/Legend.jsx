import React from 'react';
import './Legend.css';

const CLASS_INFO = {
  C: { label: 'C-class', color: '#00f', size: 4 },
  M: { label: 'M-class', color: '#f80', size: 6 },
  X: { label: 'X-class', color: '#f00', size: 8 },
};

export default function Legend() {
  return (
    <div className="legend">
      {Object.entries(CLASS_INFO).map(([key, { label, color, size }]) => (
        <div key={key} className="legend-item">
          <svg width={size+4} height={size+4}>
            <circle
              cx={(size+4)/2}
              cy={(size+4)/2}
              r={size/2}
              fill={color}
            />
          </svg>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
