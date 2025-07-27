// /js/speakerDynamicMeta.js

// function initSpeakerPage(slug, email) {
//   if (!slug || !email) {
//     console.error("Missing slug or email in initSpeakerPage");
//     return;
//   }
//
//   // 1. Update Meta Tags
//   // fetch(`/meta/${slug}`)
//   // fetch(`http://localhost:5000/meta/${slug}`)
//   fetchFromAPI(`/meta/${slug}`)
//     // .then(res => res.json())
//     .then(meta => {
//       if (!meta || meta.error) return;
//
//       document.title = meta.title;
//
//       const setMeta = (attr, val, type = "name") => {
//         let tag = document.querySelector(`meta[${type}="${attr}"]`);
//         if (!tag) {
//           tag = document.createElement("meta");
//           tag.setAttribute(type, attr);
//           document.head.appendChild(tag);
//         }
//         tag.setAttribute("content", val);
//       };
//
//       // Standard
//       setMeta("title", meta.title);
//       setMeta("description", meta.description);
//
//       // Open Graph
//       setMeta("og:title", meta.title, "property");
//       setMeta("og:description", meta.description, "property");
//       setMeta("og:image", meta.image, "property");
//       setMeta("og:url", meta.url, "property");
//
//       // Twitter
//       setMeta("twitter:title", meta.title);
//       setMeta("twitter:description", meta.description);
//       setMeta("twitter:image", meta.image);
//       setMeta("twitter:url", meta.url);
//     })
//     .catch(err => console.error("Meta fetch failed:", err));
//
//   // 2. Speaker Info (Image, Name, Intro) with Cache
//   const cacheKey = `speakerInfo_${slug}`;
//   const cacheTTL = 3600 * 1000; // 1 hour
//   const cached = JSON.parse(sessionStorage.getItem(cacheKey) || "{}");
//   const now = Date.now();
//
//   if (cached.data && now - cached.timestamp < cacheTTL) {
//     renderSpeakerInfo(cached.data);
//   } else {
//     fetchFromAPI(`/users/email/${encodeURIComponent(email)}`)
//       // .then(res => res.json())
//       // .then(user => renderSpeakerInfo(user))
//       .then(resp => {
//         const user = resp.user || resp;
//         sessionStorage.setItem(cacheKey, JSON.stringify({
//           data: user,
//           timestamp: now
//         }));
//         renderSpeakerInfo(user);
//       })
//       .catch(err => {
//         console.error("Speaker info fetch failed:", err);
//         renderSpeakerInfo({ name: slug, intro: "", profileImage: "/images/default.jpg" });
//       });
//   }
//
//   function renderSpeakerInfo(user) {
//   const container = document.getElementById("speakerInfo");
//   if (!container) return;
//
//   // Force reload by appending a timestamp query
//   const imageUrl = user.profileImage
//     ? `${user.profileImage}?t=${Date.now()}`
//     : '/images/default.jpg';
//
//   container.innerHTML = `
//     <img src="${imageUrl}" alt="${user.name}">
//     <h2>${user.name}</h2>
//     <p>${user.intro || ''}</p>
//   `;
//   }
//   }


// function initSpeakerPage(slug) {
//   if (!slug) {
//     console.error("Missing slug in initSpeakerPage");
//     return;
//   }
//
//   // 1. Load meta tags
//   fetchFromAPI(`/meta/${slug}`)
//     .then(meta => {
//       if (!meta || meta.error) return;
//       document.title = meta.title;
//
//       const setMeta = (attr, val, type = "name") => {
//         let tag = document.querySelector(`meta[${type}="${attr}"]`);
//         if (!tag) {
//           tag = document.createElement("meta");
//           tag.setAttribute(type, attr);
//           document.head.appendChild(tag);
//         }
//         tag.setAttribute("content", val);
//       };
//
//       setMeta("title", meta.title);
//       setMeta("description", meta.description);
//       setMeta("og:title", meta.title, "property");
//       setMeta("og:description", meta.description, "property");
//       setMeta("og:image", meta.image, "property");
//       setMeta("og:url", meta.url, "property");
//       setMeta("twitter:title", meta.title);
//       setMeta("twitter:description", meta.description);
//       setMeta("twitter:image", meta.image);
//       setMeta("twitter:url", meta.url);
//     })
//     .catch(err => console.error("Meta fetch failed:", err));
//
//   // 2. Speaker info by slug
//   const cacheKey = `speakerInfo_${slug}`;
//   const cacheTTL = 3600 * 1000;
//   const cached = JSON.parse(sessionStorage.getItem(cacheKey) || "{}");
//   const now = Date.now();
//
//   if (cached.data && now - cached.timestamp < cacheTTL) {
//     renderSpeakerInfo(cached.data);
//   } else {
//     fetchFromAPI(`/users/slug/${slug}`)
//       .then(user => {
//         sessionStorage.setItem(cacheKey, JSON.stringify({
//           data: user,
//           timestamp: now
//         }));
//         renderSpeakerInfo(user);
//       })
//       .catch(err => {
//         console.error("Speaker info fetch failed:", err);
//         renderSpeakerInfo({ name: slug, intro: "", profileImage: "/images/default.jpg" });
//       });
//   }
//
//   function renderSpeakerInfo(user) {
//     const container = document.getElementById("speakerInfo");
//     if (!container) return;
//     const imageUrl = user.profileImage
//       ? `${user.profileImage}?t=${Date.now()}`
//       : '/images/default.jpg';
//     container.innerHTML = `
//       <img src="${imageUrl}" alt="${user.name}">
//       <h2>${user.name}</h2>
//       <p>${user.intro || ''}</p>
//     `;
//   }
// }
// ***************************************************************************************************************
function initSpeakerPage(slug) {
  return new Promise((resolve, reject) => {
    if (!slug) return reject("Missing slug");

  // 1. Load SEO Meta Tags
  fetchFromAPI(`/meta/${slug}`)
    .then(meta => {
      if (!meta || meta.error) return;
      document.title = meta.title;

      const setMeta = (attr, val, type = "name") => {
        let tag = document.querySelector(`meta[${type}="${attr}"]`);
        if (!tag) {
          tag = document.createElement("meta");
          tag.setAttribute(type, attr);
          document.head.appendChild(tag);
        }
        tag.setAttribute("content", val);
      };

      setMeta("title", meta.title);
      setMeta("description", meta.description);
      setMeta("og:title", meta.title, "property");
      setMeta("og:description", meta.description, "property");
      setMeta("og:image", meta.image, "property");
      setMeta("og:url", meta.url, "property");
      setMeta("twitter:title", meta.title);
      setMeta("twitter:description", meta.description);
      setMeta("twitter:image", meta.image);
      setMeta("twitter:url", meta.url);
    })
    .catch(err => console.error("Meta fetch failed:", err));

  // 2. Load speaker info from cache or API
  const cacheKey = `speakerInfo_${slug}`;
  const cacheTTL = 3600 * 1000;
  const cached = JSON.parse(sessionStorage.getItem(cacheKey) || "{}");
  const now = Date.now();

  if (cached.data && now - cached.timestamp < cacheTTL) {
    renderSpeakerInfo(cached.data);
    return resolve(cached.data);
    // fetchAndRenderStories(cached.data.email); // ✅ Fetch stories using email
  } else {
    fetchFromAPI(`/users/slug/${slug}`)
      .then(user => {
        sessionStorage.setItem(cacheKey, JSON.stringify({
          data: user,
          timestamp: now
        }));
        renderSpeakerInfo(user);
        resolve(user.email); // ✅ Return email from fetch
        // fetchAndRenderStories(user.email); // ✅ Fetch stories using email
      })
      .catch(err => {
        console.error("Speaker info fetch failed:", err);
        renderSpeakerInfo({ name: slug, intro: "", profileImage: "/images/default.jpg" });
        reject(err);
      });
  }

  function renderSpeakerInfo(user) {
    const container = document.getElementById("speakerInfo");
    if (!container) return;
    const imageUrl = user.profileImage
      ? `${user.profileImage}?t=${Date.now()}`
      : '/images/default.jpg';
    container.innerHTML = `
      <img src="${imageUrl}" alt="${user.name}">
      <h2>${user.name}</h2>
      <p>${user.intro || ''}</p>
    `;
  }
});
}
  // }
  //
  // // 3. New Function: Fetch and Render Stories
  // async function fetchAndRenderStories(email) {
  //   if (!email) return;
  //
  //   const storySection = document.getElementById("storySection");
  //   const paginationContainer = document.getElementById("paginationContainer");
  //   if (!storySection) return;
  //
  //   try {
  //     const storyRes = await fetchFromAPI(`/stories?email=${encodeURIComponent(email)}`);
  //     if (!Array.isArray(storyRes) || storyRes.length === 0) {
  //       storySection.innerHTML = '<p>No stories posted yet.</p>';
  //       return;
  //     }
  //
  //     let allStories = storyRes;
  //     let currentPage = 1;
  //     const storiesPerPage = 5;
  //
  //     function renderStories(page) {
  //       const start = (page - 1) * storiesPerPage;
  //       const end = start + storiesPerPage;
  //       const storiesToShow = allStories.slice(start, end);
  //
  //       storySection.innerHTML = storiesToShow
  //         .map(story => {
  //           const dateStr = new Date(story.createdAt).toLocaleDateString();
  //           const media = story.url.includes("youtube.com") || story.url.includes("youtu.be")
  //             ? `<iframe src="${story.url}" frameborder="0" allowfullscreen></iframe>`
  //             : `<img src="${story.url}" alt="Story Image">`;
  //           return `
  //             <div class="story-card">
  //               <h3>${story.title}</h3>
  //               <p><strong>State:</strong> ${story.state}, <strong>Locality:</strong> ${story.locality}</p>
  //               <p><strong>Date:</strong> ${dateStr}</p>
  //               <div class="story-media">${media}</div>
  //               <div class="story-desc">${story.description}</div>
  //             </div>
  //           `;
  //         }).join("");
  //     }
  //
  //     function renderPagination(currentPage, total, perPage) {
  //       if (!paginationContainer) return;
  //       const totalPages = Math.ceil(total / perPage);
  //
  //       let html = "";
  //
  //       if (currentPage > 1) {
  //         html += `<button onclick="window.changePage(1)"><< First</button>`;
  //         html += `<button onclick="window.changePage(${currentPage - 1})">< Prev</button>`;
  //       }
  //
  //       html += `<span> Page ${currentPage} of ${totalPages} </span>`;
  //
  //       if (currentPage < totalPages) {
  //         html += `<button onclick="window.changePage(${currentPage + 1})">Next ></button>`;
  //         html += `<button onclick="window.changePage(${totalPages})">Last >></button>`;
  //       }
  //
  //       paginationContainer.innerHTML = html;
  //     }
  //
  //     // Global page change function
  //     window.changePage = function (page) {
  //       currentPage = page;
  //       renderStories(currentPage);
  //       renderPagination(currentPage, allStories.length, storiesPerPage);
  //     };
  //
  //     renderStories(currentPage);
  //     renderPagination(currentPage, allStories.length, storiesPerPage);
  //
  //   } catch (err) {
  //     console.error("❌ Failed to load stories:", err);
  //     storySection.innerHTML = `<p>Failed to load stories. Please try again later.</p>`;
  //   }

  function forceRefreshSpeakerInfo(name, email) {
    const cacheKey = `speakerInfo_${name.toLowerCase()}`;

    // Remove cached data
    sessionStorage.removeItem(cacheKey);

    // Optionally, re-fetch and update DOM if on same page
    if (document.location.pathname.includes(`${name.toLowerCase()}.html`)) {
      fetchFromAPI(`/users/email/${email}`)
        .then(user => {
          const container = document.getElementById("speakerInfo");
          container.innerHTML = `
            <img src="${user.profileImage || '/images/default.jpg'}" alt="${user.name}">
            <h2>${user.name}</h2>
            <p>${user.intro || ''}</p>
          `;
        })
        .catch(err => console.error("❌ Error refreshing speaker info:", err));
    }
  }

  // **************************************************************************************************************************

  // function renderSpeakerInfo(user) {
  //   const container = document.getElementById("speakerInfo");
  //   if (!container) return;
  //   container.innerHTML = `
  //     <img src="${user.profileImage || '/images/default.jpg'}" alt="${user.name}">
  //     <h2>${user.name}</h2>
  //     <p>${user.intro || ''}</p>
  //   `;
  // }

// function forceRefreshSpeakerInfo(slug) {
//   const cacheKey = `speakerInfo_${slug}`;
//   sessionStorage.removeItem(cacheKey);
// }




// window.forceRefreshSpeakerInfo = function(slug, email) {
//   const cacheKey = `speakerInfo_${slug}`;
//   sessionStorage.removeItem(cacheKey); // Clear the cache
//   initSpeakerPage(slug, email); // Reload speaker info and meta
// };
