import { useEffect } from 'react'
import styles from './Dialog.module.css'
import { STATUS } from '../constants/spotify-constants'

function Dialog({ handleSubmit, playlist, songUri, status }) {
	useEffect(() => {
		const dialog = document.getElementById('dialog')

		const handleClickOutside = (event) => {
			if (event.target === dialog) {
				dialog.close()
			}
		}

		dialog.addEventListener('click', handleClickOutside)

		return () => {
			dialog.removeEventListener('click', handleClickOutside)
		}
	}, [])

	const handleCancel = (e) => {
		e.preventDefault()
		const dialog = document.getElementById('dialog')
		dialog.close()
	}

	return (
		<dialog
			id="dialog"
			className={styles.dialog}
		>
			{status === STATUS.INIT && (
				<div className={styles.dialogInner}>
					<p className={styles.title}>Create your playlist:</p>
					<form
						onSubmit={handleSubmit}
						className={styles.form}
					>
						<input
							required
							type="text"
							placeholder="Playlist name"
							className={styles.input}
						/>
						<input
							required
							type="text"
							placeholder="Playlist description"
							className={styles.input}
						/>
						<div className={styles.songsContainer}>
							<p className={styles.listTitle}>List of songs:</p>
							<ul className={styles.songsList}>
								{playlist.map((track, index) => (
									<li
										key={index}
										className={styles.liItems}
									>
										<p>
											{track.name} - {track.artist}
										</p>
									</li>
								))}
							</ul>
						</div>
						<input
							type="hidden"
							value={songUri}
						/>
						<div className={styles.buttonsContainer}>
							<button
								type="button"
								onClick={handleCancel}
								className={styles.cancel}
							>
								Cancel
							</button>
							<button
								type="submit"
								className={styles.button}
							>
								Confirm
							</button>
						</div>
					</form>
				</div>
			)}
			{status === STATUS.SUCCESS && (
				<div className={styles.dialogInner}>
					<p className={styles.title}>Tu playlist se ha creado correctamente</p>
					<div className={styles.containerFlex}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width={48}
							height={48}
							viewBox="0 0 24 24"
							fill="none"
							stroke="#1db954"
							strokeWidth={2}
							strokeLinecap="round"
							strokeLinejoin="round"
							className="icon icon-tabler icons-tabler-outline icon-tabler-circle-dashed-check"
						>
							<path
								stroke="none"
								d="M0 0h24v24H0z"
								fill="none"
							/>
							<path d="M8.56 3.69a9 9 0 0 0 -2.92 1.95" />
							<path d="M3.69 8.56a9 9 0 0 0 -.69 3.44" />
							<path d="M3.69 15.44a9 9 0 0 0 1.95 2.92" />
							<path d="M8.56 20.31a9 9 0 0 0 3.44 .69" />
							<path d="M15.44 20.31a9 9 0 0 0 2.92 -1.95" />
							<path d="M20.31 15.44a9 9 0 0 0 .69 -3.44" />
							<path d="M20.31 8.56a9 9 0 0 0 -1.95 -2.92" />
							<path d="M15.44 3.69a9 9 0 0 0 -3.44 -.69" />
							<path d="M9 12l2 2l4 -4" />
						</svg>
					</div>
				</div>
			)}
			{status === STATUS.ERROR && (
				<div className={styles.dialogInner}>
					<p className={styles.title}>Oops, todo mal :(</p>
					<div className={styles.containerFlex}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width={48}
							height={48}
							viewBox="0 0 24 24"
							fill="none"
							stroke="red"
							strokeWidth={2}
							strokeLinecap="round"
							strokeLinejoin="round"
							className="icon icon-tabler icons-tabler-outline icon-tabler-exclamation-circle"
						>
							<path
								stroke="none"
								d="M0 0h24v24H0z"
								fill="none"
							/>
							<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
							<path d="M12 9v4" />
							<path d="M12 16v.01" />
						</svg>
					</div>
				</div>
			)}
		</dialog>
	)
}

export default Dialog
