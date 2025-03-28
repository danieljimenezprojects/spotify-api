'use client'

import { useEffect, useState } from 'react'
import getToken from '../services/getToken'

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

		if (storedToken) {
			// Use the stored token immediately
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
			// Set loading state while we fetch the token
			setTokenState((prev) => ({ ...prev, loading: true }))

			getToken(code)
				.then((accessToken) => {
					// Don't validate the token here, just use what we get
					// Store token in localStorage
					if (accessToken) {
						localStorage.setItem('spotifyToken', accessToken)

						// Update state with the new token
						setTokenState({
							token: accessToken,
							loading: false,
							error: null,
						})
					} else {
						// Handle empty token case
						setTokenState({
							token: null,
							loading: false,
							error: 'No token received from Spotify',
						})
					}

					// Clean the URL after getting the token
					window.history.replaceState(
						{},
						document.title,
						window.location.origin
					)
				})
				.catch((error) => {
					console.error('Error getting token:', error)
					setTokenState({
						token: null,
						loading: false,
						error: error.message,
					})
				})
		} else {
			// No code and no stored token, we're just not logged in
			setTokenState({
				token: null,
				loading: false,
				error: null,
			})
		}
	}, []) // Empty dependency array - only run once on mount

	return {
		token: tokenState.token,
		loading: tokenState.loading,
		error: tokenState.error,
	}
}
