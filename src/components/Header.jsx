function Header() {
	return (
		<header
			style={{
				display: 'flex',
				alignItems: 'center',
				gap: '0.6rem',
				marginLeft: '16px',
			}}
		>
			<span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={42}
					height={42}
					viewBox="0 0 24 24"
					fill="none"
					stroke="#1db954"
					strokeWidth={2}
					strokeLinecap="round"
					strokeLinejoin="round"
					className="icon icon-tabler icons-tabler-outline icon-tabler-brand-deezer"
				>
					<path
						stroke="none"
						d="M0 0h24v24H0z"
						fill="none"
					/>
					<path d="M3 16.5h2v.5h-2z" />
					<path d="M8 16.5h2.5v.5h-2.5z" />
					<path d="M16 17h-2.5v-.5h2.5z" />
					<path d="M21.5 17h-2.5v-.5h2.5z" />
					<path d="M21.5 13h-2.5v.5h2.5z" />
					<path d="M21.5 9.5h-2.5v.5h2.5z" />
					<path d="M21.5 6h-2.5v.5h2.5z" />
					<path d="M16 13h-2.5v.5h2.5z" />
					<path d="M8 13.5h2.5v-.5h-2.5z" />
					<path d="M8 9.5h2.5v.5h-2.5z" />
				</svg>
			</span>
			<p style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5rem' }}>
				SoundMood
			</p>
		</header>
	)
}
export default Header
