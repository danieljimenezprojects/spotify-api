import CardTrack from './CardTrack'
import styles from './SearchResults.module.css'

function SearchResults({ setSongUri, setPlaylist, trackObject }) {
	async function addSong(e) {
		e.preventDefault()
		const inputUri = e.target[0].value
		setSongUri((prev) => [...prev, inputUri])
		const filteredSong = trackObject.filter((track) => track.uri === inputUri)
		setPlaylist((prev) => [...prev, ...filteredSong])
	}
	return (
		<section className={styles.section}>
			<h2 className={styles.h2}>Search Results</h2>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'wrap',
					gap: '1rem',
				}}
			>
				{trackObject?.map((track, index) => {
					return (
						<CardTrack
							track={track}
							index={index}
							addSong={addSong}
							key={index}
						/>
					)
				})}
			</div>
		</section>
	)
}

export default SearchResults
