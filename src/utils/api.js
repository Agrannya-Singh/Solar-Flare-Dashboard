// src/utils/api.js

/**
 * NASA DONKI Solar Flare API endpoint (no API key required).
 * See: https://kauai.ccmc.gsfc.nasa.gov/DONKI/WS/
 */
const BASE_URL = 'https://kauai.ccmc.gsfc.nasa.gov/DONKI/WS/get/FLR';

/**
 * Fetches solar flare data from NASA DONKI API for a given date range.
 * @param {string} startDate - Format: 'YYYY-MM-DD'
 * @param {string} endDate - Format: 'YYYY-MM-DD'
 * @returns {Promise<Array>} - Array of solar flare event objects.
 */
export async function fetchSolarFlares(startDate, endDate) {
  const url = `${BASE_URL}?startDate=${startDate}&endDate=${endDate}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`NASA DONKI API error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    // Ensure data is always an array
    return Array.isArray(data) ? data : [];
  } catch (error) {
    // Log error for debugging
    console.error('Failed to fetch solar flares:', error);
    return [];
  }
}

/**
 * Parses a heliographic coordinate string (e.g., "N15E30") into [longitude, latitude].
 * Returns [0, 0] if parsing fails.
 * @param {string} loc - Heliographic coordinate string.
 * @returns {[number, number]} - [longitude, latitude]
 */
export function parseHeliographic(loc) {
  const match = loc && loc.match(/([NS])(\d+)([EW])(\d+)/);
  if (!match) return [0, 0];
  const [, ns, latDeg, ew, lonDeg] = match;
  const latitude  = (ns === 'N' ? 1 : -1) * parseInt(latDeg, 10);
  const longitude = (ew === 'E' ? 1 : -1) * parseInt(lonDeg, 10);
  return [longitude, latitude];
}

/**
 * Extracts the flare class (C, M, X) from a classType string.
 * @param {string} classType - e.g., "M1.2", "X2.1"
 * @returns {string} - "C", "M", "X" or "" if unknown
 */
export function getFlareClass(classType) {
  if (!classType) return '';
  const cls = classType[0].toUpperCase();
  return ['C', 'M', 'X'].includes(cls) ? cls : '';
}
