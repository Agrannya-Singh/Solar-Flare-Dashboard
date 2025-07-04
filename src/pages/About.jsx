import React from 'react';

export default function About() {
  return (
    <div style={{
      maxWidth: 900,
      margin: '2rem auto',
      background: '#161b22',
      padding: '2.5rem',
      borderRadius: 12,
      boxShadow: '0 4px 32px rgba(0,0,0,0.25)'
    }}>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/X3.2_Solar_flare_on_2013-05-14_at_four_wavelengths.jpg/500px-X3.2_Solar_flare_on_2013-05-14_at_four_wavelengths.jpg"
          alt="Solar Flare"
          style={{ width: 220, borderRadius: 12, boxShadow: '0 2px 8px #0008' }}
        />
        <div>
          <h2 style={{ marginTop: 0 }}>About Solar Flare Dashboard</h2>
          <p>
            <b>Solar flares</b> are sudden flashes of increased brightness on the Sun, often associated with sunspots and intense magnetic activity. They are classified into C, M, and X classes based on their X-ray brightness, with X-class being the most intense.<br />
            <a
              href="https://en.wikipedia.org/wiki/Solar_flare"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#ff6a00', textDecoration: 'underline' }}
            >
              Learn more on Wikipedia
            </a>
          </p>
          <p>
            This dashboard visualizes solar flare events detected by NASA's Solar Dynamics Observatory and other satellites.<br />
            Data is sourced from NASA's <a href="https://api.nasa.gov/" target="_blank" rel="noopener noreferrer" style={{ color: '#ff6a00', textDecoration: 'underline' }}>DONKI API</a>.
          </p>
        </div>
      </div>
      <div style={{ marginTop: '2.5rem', background: '#23272e', padding: '1.5rem', borderRadius: 8 }}>
        <h3 style={{ marginTop: 0, color: '#ff6a00' }}>How to Read this Dashboard?</h3>
        <ul>
          <li><b>Date Picker:</b> Select the date range to view flares detected in that period.</li>
          <li><b>Class Filter:</b> Toggle C, M, X classes to show/hide flares by intensity.</li>
          <li><b>Summary Cards:</b> See total and per-class flare counts for the selected range.</li>
          <li><b>Solar Disk Map:</b> Each colored dot marks a flare's location on the Sun's surface (as seen from Earth).</li>
          <li><b>Legend:</b> Explains the color and size coding for flare classes.</li>
          <li><b>Glossary:</b> Visit the Glossary page for definitions of all terms used.</li>
        </ul>
      </div>
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/X3.2_Solar_flare_on_2013-05-14_at_four_wavelengths.jpg/500px-X3.2_Solar_flare_on_2013-05-14_at_four_wavelengths.jpg"
          alt="Solar Flare and CME"
          style={{ width: '80%', maxWidth: 600, borderRadius: 12, boxShadow: '0 2px 8px #0008' }}
        />
        <div style={{ fontSize: '0.95rem', color: '#8b949e', marginTop: 8 }}>
          <em>Solar flare and coronal mass ejection, July 2012 (NASA/SDO/AIA) – via Wikipedia</em>
        </div>
      </div>
    </div>
  );
}
