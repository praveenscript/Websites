// Function to fetch the Spotify access token
async function fetchToken() {
    const clientId = 'bd3f42fc46184dd4860e6ae28ff76274';
    const clientSecret = 'e6106bacde304a22882d169bd0e4a909';
    const encodedCredentials = btoa(`${clientId}:${clientSecret}`);

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${encodedCredentials}`
        },
        body: new URLSearchParams({
            'grant_type': 'client_credentials'
        })
    });

    const data = await response.json();
    console.log('Access Token:', data.access_token);
    return data.access_token;
}

// Call the function to fetch the token


fetchToken().then(accessToken => {
    console.log('Received Token:', accessToken);

    setInterval(fetchToken, 3600*1000)
    // Now you can use this token for future API calls
});

// Event listener for the search form submission
document.getElementById("search").addEventListener('submit', async function(event){
    event.preventDefault();

    const query = document.getElementById("search_input").value;
    console.log('Search query:', query);

    const accessToken = await fetchToken();

    // Use the token to search Spotify
    const searchResponse = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=10&market=IN`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const searchData = await searchResponse.json();
    console.log('Search Results:', searchData);

    function displaySongs(songs){
        const container =document.getElementById('songContainer');
        songs.forEach(item => {
            const song =item;
            const songItem = document.createElement('div');
            songItem.className = 'song-item';
            songItem.innerHTML =`
            <h3>${song.name}</h3> 
            <p>Artist: ${song.artists.map(artist => artist.name).join(', ')}</p> 
            <p>Album: ${song.album.name}</p>`;
            container.appendChild(songItem);
            
        })
    }

    displaySongs(searchData.tracks.items);
});
