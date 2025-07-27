// async function loadHeaderMenu() {
//   try {
//     const res = await fetch(`${window.BACKEND_BASE_URL}/header`); // CORS should be allowed on backend
//     const menus = await res.json();
//
//     const nav = document.getElementById("dynamic-nav");
//     nav.innerHTML = ""; // Clear previous
//
//     menus.forEach(item => {
//       const anchor = document.createElement("a");
//       const name = item.title.trim();
//
//       anchor.textContent = name;
//
//       // Determine the link:
//       if (name.toLowerCase() === "home") {
//         anchor.href = "#home";
//       } else {
//         anchor.href = `${name.toLowerCase()}.html`; // e.g., about.html, contact.html
//       }
//
//       nav.appendChild(anchor);
//     });
//   } catch (err) {
//     console.error("Error loading header menu:", err);
//   }
// }
//
// loadHeaderMenu();
async function loadHeaderMenu(navElementId = "dynamic-nav") {
  try {
    const res = await fetch(`${window.BACKEND_BASE_URL}/header`);
    const menus = await res.json();
    menus.sort((a, b) => a.menuOrder - b.menuOrder);
    // menus.sort((a, b) => a.order - b.order);
    // const menus = await fetch("/header/menus").then(res => res.json());
    // menus.sort((a, b) => a.order - b.order);


    const nav = document.getElementById(navElementId);
    if (!nav) {
      console.error("Nav element not found");
      return;
    }

    nav.innerHTML = ""; // Clear previous

    // Determine current page
    const currentPage = window.location.pathname.split("/").pop(); // e.g., 'index.html' or 'about.html'

    menus.forEach(item => {
      const anchor = document.createElement("a");
      const name = item.title.trim();
      anchor.textContent = name;

      let pageFile = name.toLowerCase().replace(/\s+/g, "") + ".html"; // Default
      if (name.toLowerCase() === "home") {
        anchor.href = currentPage === "index.html" || currentPage === "" ? "#home" : "index.html";
      } else if (name.toLowerCase() === "terms and conditions") {
        pageFile = "termsConditions.html";
        anchor.href = pageFile;
      }else {
        anchor.href = pageFile;
      }

      nav.appendChild(anchor);
    });
  } catch (err) {
    console.error("Error loading header menu:", err);
  }
}
