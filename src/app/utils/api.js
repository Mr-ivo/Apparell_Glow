/**
 * API utilities for consistent backend connections
 */

// Get the API base URL from environment variables or use the default
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://glow-backend-2nxl.onrender.com/api';

/**
 * Get the full API URL for a specific endpoint
 * @param {string} endpoint - The API endpoint (without leading slash)
 * @returns {string} The full API URL
 */
export const getApiUrl = (endpoint) => {
  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
};

/**
 * Standard fetch wrapper with error handling
 * @param {string} endpoint - API endpoint to fetch
 * @param {Object} options - Fetch options
 * @returns {Promise} - Response data or error
 */
export const fetchApi = async (endpoint, options = {}) => {
  try {
    const url = getApiUrl(endpoint);
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
};
