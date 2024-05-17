const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_BASE_URL_FILE = import.meta.env.VITE_API_URL_FILE;
export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getApiUrl = (endpoint) => `${API_BASE_URL}/${endpoint}`;
export const getApiUrlFile = (endpoint) => `${API_BASE_URL_FILE}/${endpoint}`;
