'use client'

import { useState } from 'react'
import SearchForm from './components/SearchForm'
import MainContainer from './components/MainContainer'
import SearchResults from './components/SearchResults'
import Playlist from './components/Playlist'
import Login from './components/Login'
import { useToken } from './hooks/useToken'
import Header from './components/Header'
import { BASE_URL } from './constants/spotify-constants'

function App() {
	const [trackObject, setTrackObject] = useState([])
	const [songUri, setSongUri] = useState([])
	const [playlist, setPlaylist] = useState([])
	const { token, loading, error } = useToken()

	const effectiveToken = token || localStorage.getItem('spotifyToken')

	// Show loading state
	if (loading) {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
					color: '#f8f8f8',
					fontSize: '2rem',
				}}
			>
				Loading...
			</div>
		)
	}

	// Show error state if there was a problem getting the token
	if (error && !effectiveToken) {
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
					color: '#f8f8f8',
					fontSize: '1.5rem',
				}}
			>
				<p>Error authenticating with Spotify: {error}</p>
				<button
					onClick={() => (window.location.href = '/')}
					style={{
						marginTop: '20px',
						padding: '10px 20px',
						background: '#1DB954',
						color: 'white',
						border: 'none',
						borderRadius: '30px',
						cursor: 'pointer',
					}}
				>
					Try Again
				</button>
			</div>
		)
	}

	return (
		<>
			{effectiveToken ? (
				<MainContainer>
					<Header />
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'flex-start',
							height: 'auto',
							maxWidth: '800px',
							margin: '0 auto',
							gap: '1rem',
							marginTop: '1rem',
							padding: '0 1rem',
							textAlign: 'center',
						}}
					>
						<h1 style={{ fontSize: '3rem', color: '#f8f8f8', margin: 0 }}>
							Create your playlist on Spotify
						</h1>
						<p style={{ color: '#f8f8f8', margin: 0, marginBottom: '2rem' }}>
							Search for your favorite tracks and create the perfect playlist
						</p>
					</div>

					<SearchForm
						token={effectiveToken}
						setTrackObject={setTrackObject}
					/>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<div style={{ display: 'flex', width: '100vw' }}>
							<SearchResults
								setSongUri={setSongUri}
								setPlaylist={setPlaylist}
								trackObject={trackObject}
							/>
							<Playlist
								playlist={playlist}
								setPlaylist={setPlaylist}
								setSongUri={setSongUri}
								songUri={songUri}
								token={effectiveToken}
							/>
						</div>
					</div>
				</MainContainer>
			) : (
				<Login />
			)}
		</>
	)
}

export default App
