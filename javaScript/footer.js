// Show footer only when user reaches bottom
// window.addEventListener("scroll", function () {
//   const footer = document.querySelector("footer");
//   const scrollPosition = window.innerHeight + window.scrollY;
//   const bottomOffset = document.body.offsetHeight - 20;
//
//   if (scrollPosition >= bottomOffset) {
//     footer.style.display = "block";
//   } else {
//     footer.style.display = "none";
//   }
// });
// footer.js
// footer.js
// function updateFooterVisibility() {
//   const footer = document.querySelector("footer");
//   const scrollable = document.documentElement.scrollHeight > window.innerHeight;
//
//   if (!scrollable) {
//     footer.classList.add("always-visible");
//     return;
//   }
//
//   window.addEventListener("scroll", () => {
//     const scrollTop = window.scrollY;
//     const viewportHeight = window.innerHeight;
//     const fullHeight = document.body.offsetHeight;
//
//     if (scrollTop + viewportHeight >= fullHeight - 50) {
//       footer.classList.add("show");
//       footer.classList.remove("hide");
//     } else {
//       footer.classList.remove("show");
//       footer.classList.add("hide");
//     }
//   });
// }
//
// document.addEventListener("DOMContentLoaded", updateFooterVisibility);
function checkFooterVisibility() {
  const footer = document.querySelector("footer");
  const pageContent = document.querySelector(".page-border");

  if (!footer || !pageContent) return;

  const contentBottom = pageContent.getBoundingClientRect().bottom;
  const viewportHeight = window.innerHeight;

  const threshold = 50; // give a small buffer

  if (contentBottom <= viewportHeight - threshold) {
    footer.classList.add("footer-visible");
  } else {
    footer.classList.remove("footer-visible");
  }
}

["scroll", "resize", "load"].forEach(evt =>
  window.addEventListener(evt, checkFooterVisibility)
);
