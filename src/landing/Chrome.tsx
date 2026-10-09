import { Link, NavLink } from 'react-router-dom'

export const Navigation = () => (
	<header className="sticky top-0 z-30 bg-table/95 backdrop-blur-sm">
		<nav aria-label="Main" className="flex items-center justify-between max-w-[1200px] mx-auto h-16 px-5 md:px-8">
			<Link to="/" aria-label="Portion home" className="flex items-center gap-2.5">
				<span className="logo-p text-[28px]" aria-hidden="true">P</span>
				<span className="font-wordmark text-graphite text-[22px] leading-none tracking-[0.02em] pt-0.5" aria-hidden="true">PORTION</span>
			</Link>
			<NavLink to="/blog" className="nav-link">Dev Blog</NavLink>
		</nav>
	</header>
)

export const Footer = () => (
	<footer className="bg-graphite text-white">
		<div className="max-w-[1200px] mx-auto px-5 md:px-8 py-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
			<div className="flex items-center gap-3">
				<span className="logo-p text-[24px]" aria-hidden="true">P</span>
				<span className="text-[14px] text-[#b4b4bd]">© {new Date().getFullYear()} Portion</span>
			</div>
			<div className="flex gap-6">
				<Link to="/" className="nav-link nav-link-light">Home</Link>
				<Link to="/blog" className="nav-link nav-link-light">Dev Blog</Link>
			</div>
		</div>
	</footer>
)
