// // /public/js/api.js
// async function fetchFromAPI(path, options = {}) {
//   const url = `${BACKEND_BASE_URL}${path}`;
//   const response = await fetch(url, options);
//   if (!response.ok) throw new Error("API Error");
//   return await response.json();
// }
async function fetchFromAPI(path, options = {}) {
  const url = `${BACKEND_BASE_URL}${path}`;
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }
    return await response.json();
  } catch (err) {
    console.error("fetchFromAPI error:", err);
    throw err;
  }
}
