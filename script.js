// Fetch last played track from Spotify
async function fetchLastPlayed() {
  try {
    const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1');

    if (!response.ok) {
      throw new Error('Failed to fetch last played track.');
    }

    const data = await response.json();
    return data.items[0];
  } catch (error) {
    console.error('Error fetching last played track:', error);
    return null;
  }
}

// Update song info on the page
async function updateSongInfo() {
  const songInfoElem = document.getElementById('song-info');

  const lastPlayed = await fetchLastPlayed();
  if (lastPlayed) {
    const songName = lastPlayed.track.name;
    const artist = lastPlayed.track.artists.map(artist => artist.name).join(', ');
    const albumCover = lastPlayed.track.album.images[0].url;

    // Update HTML with song information
    songInfoElem.innerHTML = `
      <div>
        <img src="${albumCover}" alt="Album Cover">
        <p>Song: ${songName}</p>
        <p>Artist(s): ${artist}</p>
      </div>
    `;
  } else {
    songInfoElem.innerHTML = '<p>No recent tracks played.</p>';
  }
}

// Update song info initially and every 30 seconds
updateSongInfo();
setInterval(updateSongInfo, 30000); // Update every 30 seconds
