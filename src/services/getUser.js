import { BASE_URL } from "../constants/spotify-constants"

async function getUser(effectiveToken, setUserId) {
	try {
		if (!effectiveToken) return
		const response = await fetch(`${BASE_URL}me`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + effectiveToken,
			},
		})
		const data = await response.json()
		setUserId(data.id)
	} catch (error) {
		console.error('Error getting user:', error)
	}
}
export default getUser