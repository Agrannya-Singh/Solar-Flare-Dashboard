import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { fetchSolarFlares } from './utils/api';
import DatePicker from './components/DatePicker';
import Legend from './components/Legend';
import FlareGlobe from './components/FlareGlobe';
import './App.css';

// Constants
const CLASS_TYPES = ['C', 'M', 'X'];
const CLASS_COLORS = { C: '#00f', M: '#f80', X: '#f00' };
const CLASS_SIZES = { C: 8, M: 12, X: 16 };
const DEFAULT_DATE_RANGE_DAYS = 7;

const App = () => {
  // Date handling
  const getFormattedDate = (date) => date.toISOString().slice(0, 10);
  const today = getFormattedDate(new Date());
  const priorDate = getFormattedDate(
    new Date(Date.now() - DEFAULT_DATE_RANGE_DAYS * 24 * 60 * 60 * 1000)
  );

  // State management
  const [dates, setDates] = useState({ startDate: priorDate, endDate: today });
  const [flares, setFlares] = useState([]);
  const [status, setStatus] = useState('loading');
  const [classFilter, setClassFilter] = useState(
  CLASS_TYPES.reduce((acc, cls) => ({ ...acc, [cls]: true }), {})
);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    content: ''
  });

  // Data fetching
  useEffect(() => {
    const loadFlares = async () => {
      setStatus('loading');
      try {
        const data = await fetchSolarFlares(dates.startDate, dates.endDate);
        setFlares(data);
        setStatus('ok');
      } catch (error) {
        console.error('Error fetching solar flares:', error);
        setStatus('error');
      }
    };

    loadFlares();
  }, [dates]);

  // Filter flares based on class filter
  const filteredFlares = useMemo(
    () => flares.filter((f) => classFilter[f.classType?.[0]]),
    [flares, classFilter]
  );

  const countByClass = (cls) =>
    filteredFlares.filter((f) => f.classType?.startsWith(cls)).length;

  const toggleClassFilter = (cls) => {
    setClassFilter((prev) => ({ ...prev, [cls]: !prev[cls] }));
  };

  // Handle flare hover events
  const handleFlareHover = (event, flare) => {
    setTooltip({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      content: `${flare.flrID || 'Unknown Flare'} (${flare.classType})`
    });
  };

  const handleFlareLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  // Status rendering
  const renderStatus = () => {
    switch (status) {
      case 'loading':
        return <p className="status-message">Loading solar flare data...</p>;
      case 'error':
        return (
          <p className="status-message error">
            Failed to load data. Please try again later.
          </p>
        );
      case 'ok':
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo">SolarFlareViz</div>
        <nav>
          <Link to="/" className="nav-link">
            Dashboard
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
          <Link to="/glossary" className="nav-link">
            Glossary
          </Link>
        </nav>
      </aside>

      <div className="content-wrapper">
        <header className="header">
          <h1>Solar Flare Dashboard</h1>
          <div className="controls">
            <DatePicker {...dates} onChange={setDates} />
            <div className="class-filter">
              {CLASS_TYPES.map((cls) => (
                <label key={cls} className="filter-label">
                  <input
                    type="checkbox"
                    checked={classFilter[cls]}
                    onChange={() => toggleClassFilter(cls)}
                    className="filter-checkbox"
                  />
                  {cls}-Class
                </label>
              ))}
            </div>
          </div>
        </header>

        <main className="main">
          {renderStatus()}

          {status === 'ok' && (
            <>
              <section className="card-row">
                <div className="stat-card">
                  <h2>Total Flares</h2>
                  <p className="stat-value">{filteredFlares.length}</p>
                </div>
                {CLASS_TYPES.map((cls) => (
                  <div key={cls} className="stat-card">
                    <h2>{cls}-Class</h2>
                    <p className="stat-value">{countByClass(cls)}</p>
                  </div>
                ))}
              </section>

              <Legend classTypes={CLASS_TYPES} colors={CLASS_COLORS} />

              <section className="globe-container">
                <FlareGlobe
                  flares={filteredFlares}
                  colors={CLASS_COLORS}
                  sizes={CLASS_SIZES}
                  onFlareHover={handleFlareHover}
                  onFlareLeave={handleFlareLeave}
                />
              </section>
            </>
          )}

          {/* Tooltip */}
          {tooltip.visible && (
            <div
              className="flare-tooltip"
              style={{
                position: 'fixed',
                left: tooltip.x + 10,
                top: tooltip.y + 10,
              }}
            >
              {tooltip.content}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;