import { CLIENT_ID, CLIENT_SECRET, TOKEN_ENDPOINT, REDIRECT_URI } from '../constants/spotify-constants'

async function getToken(code) {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
    }),
  })

  const data = await response.json()
  return data.access_token
}

export default getToken
