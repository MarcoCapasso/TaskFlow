//URL base del backend: configurabile con VITE_API_URL (es. in .env.local), default per lo sviluppo locale
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5285";
