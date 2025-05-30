function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

async function fetchStoriesForSpeaker(speakerName) {
  try {
    const apiUrl = `http://localhost:5000/api/stories?speaker=${encodeURIComponent(speakerName)}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch stories: ${response.status} - ${errorText}`);
    }

    const stories = await response.json();
    renderStories(stories);
  } catch (error) {
    console.error('Error fetching stories:', error);
    document.getElementById('story-list').innerHTML = `<p style="color:red;">Error loading stories: ${error.message}</p>`;
  }
}

function renderStories(stories) {
  const container = document.getElementById('story-list');
  container.innerHTML = '';

  if (!Array.isArray(stories) || stories.length === 0) {
    container.innerHTML = '<p>No stories found for this speaker.</p>';
    return;
  }

  stories.forEach(story => {
    const storyCard = document.createElement('div');
    storyCard.className = 'story-card';

    const title = story.title || 'Untitled';
    const intro = story.intro || '';
    const speaker = story.speaker || 'unknown';
    const storyId = story._id || '';

    let imageUrl = story.image || '';
    if (imageUrl) {
      imageUrl = imageUrl.trim();
      const isAbsoluteUrl = /^(https?:)?\/\//i.test(imageUrl);
      if (!isAbsoluteUrl) {
        imageUrl = imageUrl.startsWith('/') ? imageUrl : `/uploads/${imageUrl}`;
      }
      imageUrl = `http://localhost:5000${imageUrl}`;
    }

    const storyLink = `readStory.html?id=${encodeURIComponent(storyId)}&speaker=${encodeURIComponent(speaker)}`;

    // Sanitize text content before inserting to prevent XSS
    const safeTitle = DOMPurify.sanitize(title);
    const safeIntro = DOMPurify.sanitize(intro);

    storyCard.innerHTML = `
      <h3>${safeTitle}</h3>
      ${imageUrl ? `<img src="${imageUrl}" alt="${safeTitle}" />` : ''}
      <p>${safeIntro}</p>
      <a href="${storyLink}">Read More</a>
    `;

    container.appendChild(storyCard);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const speaker = getQueryParam('speaker');
  const speakerTitle = speaker ? `${speaker.charAt(0).toUpperCase() + speaker.slice(1)}'s Stories` : 'Stories';

  document.getElementById('speaker-name').innerText = speakerTitle;

  if (speaker) {
    fetchStoriesForSpeaker(speaker);
  } else {
    document.getElementById('story-list').innerHTML = '<p>No speaker selected.</p>';
  }
});
