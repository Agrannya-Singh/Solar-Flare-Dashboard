import React from 'react';

export default function Glossary() {
  return (
    <div style={{
      maxWidth: 900,
      margin: '2rem auto',
      background: '#161b22',
      padding: '2rem',
      borderRadius: 12,
      boxShadow: '0 4px 32px rgba(0,0,0,0.18)'
    }}>
      <h2>Glossary</h2>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/X_Class_Solar_Flare_Sends_%E2%80%98Shockwaves%E2%80%99_on_The_Sun_%286819094556%29.jpg/1196px-X_Class_Solar_Flare_Sends_%E2%80%98Shockwaves%E2%80%99_on_The_Sun_%286819094556%29.jpg"
          alt="Solar Flare and CME"
          style={{ width: 200, borderRadius: 10, boxShadow: '0 2px 8px #0008' }}
        />
        <ul>
          <li>
            <strong>C/M/X Class:</strong> Solar flares are classified by their X-ray brightness:
            <ul>
              <li><b>C-class:</b> Small flares with minor effects on Earth.</li>
              <li><b>M-class:</b> Medium flares, can cause brief radio blackouts at the poles.</li>
              <li><b>X-class:</b> Major flares, can trigger global radio blackouts and long-lasting radiation storms.</li>
            </ul>
            <span style={{ fontSize: '0.95em', color: '#ff6a00' }}>
              <a
                href="https://en.wikipedia.org/wiki/Solar_flare"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#ff6a00', textDecoration: 'underline' }}
              >
                Read more on Wikipedia
              </a>
            </span>
          </li>
          <li>
            <strong>Heliographic Coordinates:</strong> Latitude and longitude system for locations on the Sun.
            <span style={{ fontSize: '0.95em', color: '#ff6a00' }}>
              <a
                href="https://en.wikipedia.org/wiki/Heliographic_and_heliocentric_coordinates"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#ff6a00', textDecoration: 'underline', marginLeft: 8 }}
              >
                More info
              </a>
            </span>
          </li>
          <li>
            <strong>Peak Time:</strong> The time when the flare reached its maximum intensity.
          </li>
        </ul>
      </div>
    </div>
  );
}
