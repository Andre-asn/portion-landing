import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'
import Hero, { type ClaimEvent } from './landing/Hero'
import TearSection from './landing/TearSection'
import HowItWorks from './landing/HowItWorks'
import Closing from './landing/Closing'
import { claimScript, people, shares, startingLines, type Line, type PersonId } from './landing/bill'

const applyClaim = (lines: Line[], lineId: string, unit: number, person: PersonId | null) =>
	lines.map((line) =>
		line.id === lineId
			? { ...line, claims: line.claims.map((c, i) => (i === unit ? person : c)) }
			: line
	)

const finalLines = claimScript.reduce(
	(lines, [lineId, unit, person]) => applyClaim(lines, lineId, unit, person),
	startingLines
)

const useBill = () => {
	const reduce = useReducedMotion()
	const [lines, setLines] = useState<Line[]>(() => (reduce ? finalLines : startingLines))
	const [events, setEvents] = useState<ClaimEvent[]>([])
	const [announcement, setAnnouncement] = useState('')

	const log = (person: PersonId, item: string, undo = false) =>
		setEvents((prev) => [{ id: Date.now() + Math.random(), person, item, undo }, ...prev].slice(0, 3))

	// Friends claim their lines one after another when the page opens.
	useEffect(() => {
		if (reduce) return
		const timers = claimScript.map(([lineId, unit, person], i) =>
			setTimeout(() => {
				setLines((prev) => {
					const line = prev.find((l) => l.id === lineId)
					if (!line || line.claims[unit] !== null) return prev
					return applyClaim(prev, lineId, unit, person)
				})
				const line = startingLines.find((l) => l.id === lineId)
				if (line) log(person, line.name)
			}, 900 + i * 420)
		)
		return () => timers.forEach(clearTimeout)
	}, [reduce])

	const onTap = (line: Line): string | null => {
		const current = lines.find((l) => l.id === line.id) ?? line
		const mine = current.claims.indexOf('you')
		if (mine !== -1) {
			setLines((prev) => applyClaim(prev, line.id, mine, null))
			log('you', line.name, true)
			setAnnouncement(`You put back ${line.name}.`)
			return null
		}
		const open = current.claims.indexOf(null)
		if (open !== -1) {
			setLines((prev) => applyClaim(prev, line.id, open, 'you'))
			log('you', line.name)
			setAnnouncement(`You claimed ${line.name}.`)
			return null
		}
		const owners = [...new Set(current.claims)].map((c) => people[c as PersonId].name)
		return owners.length > 1
			? `${owners.join(' and ')} already claimed both.`
			: `${owners[0]} claimed this first.`
	}

	return { lines, events, announcement, onTap }
}

const Navigation = () => (
	<header className="sticky top-0 z-30 bg-table/95 backdrop-blur-sm">
		<nav aria-label="Main" className="flex items-center justify-between max-w-[1200px] mx-auto h-16 px-5 md:px-8">
			<Link to="/" aria-label="Portion home" className="flex items-center gap-2.5">
				<span className="logo-p text-[28px]" aria-hidden="true">P</span>
				<span className="font-wordmark text-graphite text-[22px] leading-none tracking-[0.02em] pt-0.5" aria-hidden="true">PORTION</span>
			</Link>
			<Link to="/blog" className="nav-link">Dev Blog</Link>
		</nav>
	</header>
)

const Footer = () => (
	<footer className="bg-graphite text-white">
		<div className="max-w-[1200px] mx-auto px-5 md:px-8 py-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
			<div className="flex items-center gap-3">
				<span className="logo-p text-[24px]" aria-hidden="true">P</span>
				<span className="text-[14px] text-[#b4b4bd]">© {new Date().getFullYear()} Portion</span>
			</div>
			<Link to="/blog" className="nav-link nav-link-light">Dev Blog</Link>
		</div>
	</footer>
)

function App() {
	const bill = useBill()
	const split = useMemo(() => shares(bill.lines), [bill.lines])

	return (
		<div className="landing min-h-[100dvh] bg-table text-graphite font-sans">
			<a href="#main" className="skip-link">Skip to content</a>
			<Navigation />
			<main id="main">
				<Hero lines={bill.lines} events={bill.events} announcement={bill.announcement} yourShare={split.you} onTap={bill.onTap} />
				<TearSection lines={bill.lines} shares={split} />
				<HowItWorks />
				<Closing />
			</main>
			<Footer />
		</div>
	)
}

export default App
