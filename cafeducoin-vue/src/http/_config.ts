const hostname = import.meta.env.VITE_API_HOSTNAME || 'localhost';
const apiUrl = `http://${hostname}:7654`;

export { apiUrl };