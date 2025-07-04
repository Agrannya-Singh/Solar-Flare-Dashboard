import React from 'react';
import './DatePicker.css';

export default function DatePicker({ startDate, endDate, onChange }) {
  return (
    <div className="date-picker">
      <label>
        Start:
        <input
          type="date"
          value={startDate}
          max={endDate}
          onChange={e => onChange({ startDate: e.target.value, endDate })}
        />
      </label>
      <label>
        End:
        <input
          type="date"
          value={endDate}
          min={startDate}
          onChange={e => onChange({ startDate, endDate: e.target.value })}
        />
      </label>
    </div>
  );
}
