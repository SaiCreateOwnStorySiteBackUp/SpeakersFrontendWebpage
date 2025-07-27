async function loadFooterLinks() {
try {
  const res = await fetch(`${BACKEND_BASE_URL}/editIndexPages/footer`);
  const data = await res.json();

  const iconMap = {
    youtube: "fab fa-youtube",
    whatsapp: "fab fa-whatsapp",
    facebook: "fab fa-facebook",
    instagram: "fab fa-instagram",
    email: "fas fa-envelope",
    twitter:"fab fa-twitter"
  };

  const socialContainer = document.getElementById("socialIcons");
  const copyrightContainer = document.getElementById("copyrightText");

  socialContainer.innerHTML = "";
  copyrightContainer.innerHTML = "";

  data.forEach(item => {
    if (item.enabled && iconMap[item.type]) {
      let href = "#";
      if (item.type === "email") {
        href = `mailto:${item.value}`;
      } else if (item.type === "whatsapp") {
        href = `https://wa.me/${item.value}`;
      } else {
        if (!item.value.startsWith("http://") && !item.value.startsWith("https://")) {
          href = `https://${item.value}`;
        }
      }

      const a = document.createElement("a");
      a.href = href;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.innerHTML = `<i class="${iconMap[item.type]}"></i>`;
      socialContainer.appendChild(a);
    }

    if (item.type === "copyright") {
      const p = document.createElement("p");
      p.innerHTML = `${item.value}`;
      copyrightContainer.appendChild(p);
    }
  });

} catch (err) {
  console.error("Error loading footer:", err);
}
}
  window.onload = loadFooterLinks;
