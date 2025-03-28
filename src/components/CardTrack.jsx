import styles from './CardTrack.module.css'

function CardTrack({ track, index, addSong }) {
	return (
		<article
			key={index}
			className={styles.article}
		>
			<div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
				<img
					src={track.image}
					alt={track.name}
					width={60}
					height={60}
				/>
				<div>
					<h2 style={{ margin: 0, color: 'white', fontSize: '1.2rem' }}>
						{track.name}
					</h2>
					<p style={{ margin: 0, color: 'white' }}>
						{track.artist} - {track.album}
					</p>
				</div>
			</div>
			<form onSubmit={addSong}>
				<input
					type="hidden"
					value={track.uri || ''}
				/>
				<button className={styles.button}>
					{' '}
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
						className="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus"
					>
						<path
							stroke="none"
							d="M0 0h24v24H0z"
							fill="none"
						/>
						<path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
						<path d="M9 12h6" />
						<path d="M12 9v6" />
					</svg>{' '}
				</button>
			</form>
		</article>
	)
}

export default CardTrack
