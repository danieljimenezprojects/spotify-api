import {
	CLIENT_ID,
	CLIENT_SECRET,
	TOKEN_ENDPOINT,
} from '../constants/spotify-constants'

async function refreshToken(refreshToken) {
	const response = await fetch(TOKEN_ENDPOINT, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: refreshToken,
		}),
	})

	const data = await response.json()
	return {
		accessToken: data.access_token,
		refreshToken: data.refresh_token || refreshToken,
	}
}

export default refreshToken
