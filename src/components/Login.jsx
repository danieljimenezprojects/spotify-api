import {
	CLIENT_ID,
	REDIRECT_URI,
	AUTH_ENDPOINT,
	SCOPES,
} from '../constants/spotify-constants'
import Header from './Header'
import styles from './Login.module.css'

function Login() {
	const AUTH_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${SCOPES}`

	return (
		<>
			<Header />
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'flex-start',
					height: '100vh',
					maxWidth: '448px',
					margin: '0 auto',
					gap: '1rem',
					marginTop: '3rem',
					padding: '0 1rem',
					textAlign: 'center',
				}}
			>
				<h1 style={{ fontSize: '3rem', color: '#f8f8f8', margin: 0 }}>
					Create your playlist for Spotify
				</h1>
				<p style={{ color: 'white', margin: 0 }}>
					Discover, mix, and create your perfect music collection
				</p>
				<div
					style={{
						width: '100px',
						height: '4px',
						backgroundColor: '#1db954',
						marginTop: '2rem',
					}}
				></div>
				<a
					href={AUTH_URL}
					className={styles.a}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width={24}
						height={24}
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
						className="icon icon-tabler icons-tabler-outline icon-tabler-logout"
					>
						<path
							stroke="none"
							d="M0 0h24v24H0z"
							fill="none"
						/>
						<path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
						<path d="M9 12h12l-3 -3" />
						<path d="M18 15l3 -3" />
					</svg>
					<span>Login with Spotify</span>
				</a>
				<footer style={{ position: 'absolute', bottom: '1rem' }}>
					<p style={{ color: 'white' }}>
						© 2025 SoundMood. All rights reserved.
					</p>
				</footer>
			</div>
		</>
	)
}

export default Login
