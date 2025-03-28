import { BASE_URL } from '../constants/spotify-constants'

// Obtener una canción
async function getTrack(searchInput, token) {
	const response = await fetch(
		`${BASE_URL}search?q=${searchInput}&type=track`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: 'Bearer ' + token,
			},
		}
	)

	const data = await response.json()
	return data
}

export default getTrack
