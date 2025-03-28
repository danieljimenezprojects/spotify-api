export const CLIENT_ID = '74e7de16d52c474d98a5d24bf09e972a'
export const CLIENT_SECRET = '70d38b8597d8426f9bc1141b471f774a'
export const BASE_URL = 'https://api.spotify.com/v1/'
export const AUTH_URL = 'https://accounts.spotify.com/api/token'
export const REDIRECT_URI = 'https://soundmood.netlify.app/'
export const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
export const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
export const SCOPES = [
	'playlist-modify-public',
	'playlist-modify-private',
	'user-read-email',
].join('%20')
export const STATUS = {
	INIT: '',
	ERROR: 'error',
	SUCCESS: 'success',
}
