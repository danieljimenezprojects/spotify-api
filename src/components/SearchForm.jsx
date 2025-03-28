'use client'

import { useState } from 'react'
import getTrack from '../services/getTracks'
import { createTracksObject } from '../utils/createTracksObject'
import styles from './SearchForm.module.css'

function SearchForm({ token, setTrackObject }) {
	const [track, setTrack] = useState('')

	async function handleSubmit(e) {
		e.preventDefault()
		if (!token) {
			console.error('No hay token disponible')
			return
		}

		try {
			const response = await getTrack(track, token)
			const tracks = createTracksObject(response)
			setTrackObject(tracks)
		} catch (error) {
			console.error('Error obteniendo la canción:', error)
		}
	}

	return (
		<form
			className={styles.form}
			onSubmit={handleSubmit}
		>
			<div className={styles.searchContainer}>
				<div className={styles.searchBox}>
					<input
						type="text"
						id="track"
						placeholder={`Search track...`}
						value={track}
						onChange={(e) => setTrack(e.target.value)}
						className={styles.searchInput}
					/>
					<button
						type="submit"
						disabled={!token}
						className={styles.searchButton}
						aria-label="Search"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path
								stroke="none"
								d="M0 0h24v24H0z"
								fill="none"
							/>
							<path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
							<path d="M21 21l-6 -6" />
						</svg>
					</button>
				</div>
			</div>
		</form>
	)
}

export default SearchForm
