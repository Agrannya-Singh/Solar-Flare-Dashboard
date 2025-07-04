import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { scaleSequential, interpolateYlOrRd } from 'd3-scale';
import { feature } from 'topojson-client';
import { geoOrthographic, geoPath } from 'd3-geo';
import { select } from 'd3-selection';
import { easeQuadInOut } from 'd3-ease';

const FlareMap = ({ flares, width, height, mode = 'globe' }) => {
  const svgRef = useRef();
  const [mapData, setMapData] = useState(null);
  const [rotation, setRotation] = useState([0, 0]);
  const [isDragging, setIsDragging] = useState(false);
  const [lastPosition, setLastPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch world map data
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const fetchMapData = async () => {
      try {
        const response = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
        const worldData = await response.json();

        // Convert TopoJSON to GeoJSON
        const countries = feature(worldData, worldData.objects.countries);
        setMapData(countries);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load map data');
        setIsLoading(false);
        console.error('Error loading map data:', err);
      }
    };

    fetchMapData();
  }, []);

  // Set up the map visualization
  useEffect(() => {
    if (!mapData || !svgRef.current) return;

    const svg = select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous render

    const projection = geoOrthographic()
      .fitSize([width, height], { type: 'Sphere' })
      .rotate(rotation);

    const pathGenerator = geoPath().projection(projection);

    // Draw the globe
    svg.append('path')
      .datum({ type: 'Sphere' })
      .attr('class', 'globe-sphere')
      .attr('d', pathGenerator)
      .attr('fill', '#1a1a2e')
      .attr('stroke', '#333');

    // Draw countries
    svg.append('g')
      .selectAll('path')
      .data(mapData.features)
      .enter()
      .append('path')
      .attr('class', 'country')
      .attr('d', pathGenerator)
      .attr('fill', '#2a2a4a')
      .attr('stroke', '#444')
      .attr('stroke-width', 0.5);

    // Color scale for flare intensity
    const intensityScale = scaleSequential()
      .domain([0, d3.max(flares, f => parseFloat(f.classType.slice(1)) || 0)])
      .interpolator(interpolateYlOrRd);

    // Draw flares based on view mode
    if (mode === 'globe') {
      // Point markers for globe view
      svg.append('g')
        .selectAll('circle')
        .data(flares)
        .enter()
        .append('circle')
        .attr('class', 'flare-point')
        .attr('cx', d => {
          const coords = parseCoordinates(d.sourceLocation);
          if (coords) {
            const [x, y] = projection([coords.lon, coords.lat]);
            return x || 0;
          }
          return 0;
        })
        .attr('cy', d => {
          const coords = parseCoordinates(d.sourceLocation);
          if (coords) {
            const [x, y] = projection([coords.lon, coords.lat]);
            return y || 0;
          }
          return 0;
        })
        .attr('r', d => {
          const intensity = parseFloat(d.classType.slice(1)) || 1;
          return Math.min(5 + intensity * 2, 15); // Scale radius by intensity
        })
        .attr('fill', d => intensityScale(parseFloat(d.classType.slice(1)) || 0))
        .attr('opacity', 0.8)
        .append('title')
        .text(d => `${d.classType} flare at ${d.sourceLocation}\nActive Region: ${d.activeRegionNum}`);
    } else {
      // Heatmap for heatmap view
      const heatmapData = flares.map(f => {
        const coords = parseCoordinates(f.sourceLocation);
        return {
          ...f,
          x: coords ? projection([coords.lon, coords.lat])[0] : 0,
          y: coords ? projection([coords.lon, coords.lat])[1] : 0,
          intensity: parseFloat(f.classType.slice(1)) || 1
        };
      }).filter(d => d.x && d.y);

      // Create a heatmap
      const heatmap = svg.append('g')
        .selectAll('circle')
        .data(heatmapData)
        .enter()
        .append('circle')
        .attr('class', 'flare-heat')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 10) // Fixed radius for heatmap
        .attr('fill', d => intensityScale(d.intensity))
        .attr('opacity', 0.6)
        .attr('blur', 5);
    }

    // Add drag behavior for globe rotation
    const drag = d3.drag()
      .on('start', (event) => {
        setIsDragging(true);
        setLastPosition([event.x, event.y]);
      })
      .on('drag', (event) => {
        if (lastPosition) {
          const [x, y] = lastPosition;
          const dx = event.x - x;
          const dy = event.y - y;
          setRotation([rotation[0] + dx * 0.2, rotation[1] - dy * 0.2]);
          setLastPosition([event.x, event.y]);
        }
      })
      .on('end', () => {
        setIsDragging(false);
        setLastPosition(null);
      });

    svg.call(drag);

  }, [mapData, flares, width, height, rotation, mode]);

  // Auto-rotate when not dragging
  useEffect(() => {
    if (isDragging || mode !== 'globe') return;

    const interval = setInterval(() => {
      setRotation(prev => [prev[0] + 0.3, prev[1]]);
    }, 50);

    return () => clearInterval(interval);
  }, [isDragging, mode]);

  // Parse solar coordinates (e.g., "S18E44")
  const parseCoordinates = (location) => {
    if (!location) return null;

    const match = location.match(/([NS])(\d+)([EW])(\d+)/);
    if (!match) return null;

    const [, ns, latStr, ew, lonStr] = match;
    let lat = parseInt(latStr, 10);
    let lon = parseInt(lonStr, 10);

    lat = ns === 'S' ? -lat : lat;
    lon = ew === 'W' ? -lon : lon;

    return { lat, lon };
  };

  if (isLoading) {
    return (
      <div className="map-loading">
        <div className="spinner"></div>
        <p>Loading solar map...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="map-error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={`flare-map ${mode}`}
      aria-label="Solar flare visualization map"
    />
  );
};

export default FlareMap;