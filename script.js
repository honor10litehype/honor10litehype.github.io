// Fetch currently playing song from Spotify
async function fetchCurrentlyPlaying() {
  try {
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        'Authorization': 'Bearer d40cdfa225794f7dbcca52ca7e0454a5', // Replace with your access token
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch currently playing song.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching currently playing:', error);
    return null;
  }
}

// Update song info on the page
async function updateSongInfo() {
  const songInfoElem = document.getElementById('song-info');

  const data = await fetchCurrentlyPlaying();
  if (data && data.is_playing) {
    const songName = data.item.name;
    const artist = data.item.artists.map(artist => artist.name).join(', ');
    const albumCover = data.item.album.images[0].url;

    // Update HTML with song information
    songInfoElem.innerHTML = `
      <img src="${albumCover}" alt="Album Cover">
      <p>Song: ${songName}</p>
      <p>Artist(s): ${artist}</p>
    `;
  } else {
    songInfoElem.innerHTML = '<p>No song is currently playing.</p>';
  }
}

// Update song info initially and every 10 seconds
updateSongInfo();
setInterval(updateSongInfo, 5000); // Update every 5 seconds
