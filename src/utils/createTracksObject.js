export function createTracksObject(response) {
	return response.tracks.items
		.map((track) => ({
			uri: track.uri,
			name: track.name,
			artist: track.artists[0].name,
			album: track.album.name,
			image: track.album.images[0]?.url,
		}))
		.slice(0, 5)
}
