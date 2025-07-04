import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { parseHeliographic } from '../utils/api';

export default function FlareGlobe({ flares, width=600, height=600 }) {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr('viewBox', [0,0,width,height]);
    svg.selectAll('*').remove();

    const projection = d3.geoOrthographic()
      .scale(width/2 - 10)
      .translate([width/2, height/2])
      .clipAngle(90);

    // Solar disk
    svg.append('circle')
      .attr('cx', width/2)
      .attr('cy', height/2)
      .attr('r', projection.scale())
      .attr('fill', '#fff5e1')
      .attr('stroke', '#fbb040')
      .attr('stroke-width', 2);

    // Flares
    svg.selectAll('circle.flare')
      .data(flares.filter(f => f.sourceLocation))
      .enter().append('circle')
      .attr('class', 'flare')
      .attr('r', d => ({C:4,M:6,X:8}[d.classType[0]]||5))
      .attr('fill', d => ({C:'#00f',M:'#f80',X:'#f00'}[d.classType[0]]||'#888'))
      .attr('transform', d => {
        const [lon,lat] = parseHeliographic(d.sourceLocation);
        const [x,y] = projection([lon,lat]);
        return `translate(${x},${y})`;
      })
      .append('title')
      .text(d => `${d.flrID} (${d.classType})\nPeak: ${d.peakTime}`);
  }, [flares]);

  return <svg ref={svgRef} />;
}
