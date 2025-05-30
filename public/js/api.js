// /public/js/api.js
async function fetchFromAPI(path, options = {}) {
  const url = `${BACKEND_BASE_URL}${path}`;
  const response = await fetch(url, options);
  if (!response.ok) throw new Error("API Error");
  return await response.json();
}
