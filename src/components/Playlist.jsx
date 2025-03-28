import { useState } from 'react'
import { BASE_URL, STATUS } from '../constants/spotify-constants'
import useUserId from '../hooks/useUserId'
import CardPlaylist from './CardPlaylist'
import Dialog from './Dialog'
import styles from './Playlist.module.css'

function Playlist({ playlist, setPlaylist, songUri, setSongUri, token }) {
	const [status, setStatus] = useState(STATUS.INIT)

	const { userId } = useUserId(token)
	async function removeSong(e) {
		e.preventDefault()
		const inputUri = e.target[0].value
		console.log(inputUri)
		setSongUri((prev) => [...prev].filter((id) => id !== inputUri))
		setPlaylist((prev) => [...prev].filter((track) => track.uri !== inputUri))
		console.log(playlist)
	}

	function openModal() {
		setStatus(STATUS.INIT)
		const dialog = document.getElementById('dialog')
		dialog.showModal()
	}

	function handleSubmit(e) {
		e.preventDefault()
		async function createPlaylist() {
			try {
				const response = await fetch(`${BASE_URL}users/${userId}/playlists`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + token,
					},
					body: JSON.stringify({
						name: e.target[0].value,
						description: e.target[1].value,
					}),
				})
				const data = await response.json()
				return data
			} catch (error) {
				setStatus(STATUS.ERROR)
				console.error('Error creating playlist:', error)
			}
		}
		createPlaylist()
			.then((playlistData) => {
				async function addTracks(playlistData) {
					try {
						const response = await fetch(
							`${BASE_URL}playlists/${playlistData.id}/tracks`,
							{
								method: 'POST',
								headers: {
									'Content-Type': 'application/json',
									Authorization: 'Bearer ' + token,
								},
								body: JSON.stringify({
									uris: playlist.map((track) => track.uri),
								}),
							}
						)
						const data = await response.json()
						setStatus(STATUS.SUCCESS)
						console.log(data)
					} catch (error) {
						console.error('error adding tracks:', error)
						setStatus(STATUS.ERROR)
					}
				}
				addTracks(playlistData)
			})
			.catch((error) => console.error('Error creating playlist:', error))
	}
	return (
		<section className={styles.section}>
			<h2 className={styles.h2}>Playlist</h2>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'wrap',
					gap: '1rem',
				}}
			>
				{playlist?.map((track, index) => {
					return (
						<CardPlaylist
							track={track}
							index={index}
							deleteSong={removeSong}
							key={index}
						/>
					)
				})}
			</div>
			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<button
					onClick={() => openModal()}
					className={styles.spotifyButton}
				>
					Save Playlist to Spotify
				</button>
			</div>
			<Dialog
				handleSubmit={handleSubmit}
				playlist={playlist}
				songUri={songUri}
				status={status}
			/>
		</section>
	)
}

export default Playlist
