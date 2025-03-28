import { useEffect, useState } from 'react'
import getToken from '../services/getToken'
import refreshToken from '../services/refreshToken'

export function useToken() {
	// Initialize with a loading state
	const [tokenState, setTokenState] = useState({
		token: null,
		loading: true,
		error: null,
	})

	useEffect(() => {
		// First check if we already have a token in localStorage
		const storedToken = localStorage.getItem('spotifyToken')
		const storedRefreshToken = localStorage.getItem('spotifyRefreshToken')

		if (storedToken) {
			setTokenState({
				token: storedToken,
				loading: false,
				error: null,
			})
			return
		}

		// If no token in localStorage, check for code in URL
		const urlParams = new URLSearchParams(window.location.search)
		const code = urlParams.get('code')

		if (code) {
			setTokenState((prev) => ({ ...prev, loading: true }))

			getToken(code)
				.then(({ accessToken, refreshToken }) => {
					if (accessToken) {
						localStorage.setItem('spotifyToken', accessToken)
						localStorage.setItem('spotifyRefreshToken', refreshToken)

						setTokenState({
							token: accessToken,
							loading: false,
							error: null,
						})
					} else {
						setTokenState({
							token: null,
							loading: false,
							error: 'No token received from Spotify',
						})
					}

					window.history.replaceState(
						{},
						document.title,
						window.location.origin
					)
				})
				.catch((error) => {
					console.error('Error getting token:', error)
					setTokenState({ token: null, loading: false, error: error.message })
				})
		} else if (storedRefreshToken) {
			// Attempt to refresh token if we have a refresh token
			setTokenState((prev) => ({ ...prev, loading: true }))
			refreshToken(storedRefreshToken)
				.then(({ accessToken, refreshToken }) => {
					if (accessToken) {
						localStorage.setItem('spotifyToken', accessToken)
						localStorage.setItem('spotifyRefreshToken', refreshToken)
						setTokenState({ token: accessToken, loading: false, error: null })
					} else {
						setTokenState({
							token: null,
							loading: false,
							error: 'Failed to refresh token',
						})
					}
				})
				.catch((error) => {
					console.error('Error refreshing token:', error)
					setTokenState({ token: null, loading: false, error: error.message })
				})
		} else {
			setTokenState({ token: null, loading: false, error: null })
		}
	}, [])

	return {
		token: tokenState.token,
		loading: tokenState.loading,
		error: tokenState.error,
	}
}
