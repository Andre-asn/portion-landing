import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Clock } from 'phosphor-react'
import Receipt from './Receipt'
import { money, people, type Line, type PersonId } from './bill'

const ease = [0.23, 1, 0.32, 1] as const

// A thermal printer feeds paper in short jerks, not one smooth glide.
const FEEDS = 14
const printerFeed = (t: number) => {
	const step = Math.floor(t * FEEDS)
	const k = Math.min(1, (t * FEEDS - step) / 0.4)
	return (step + (1 - (1 - k) ** 3)) / FEEDS
}

export interface ClaimEvent {
	id: number
	person: PersonId
	item: string
	undo?: boolean
}

interface HeroProps {
	lines: Line[]
	events: ClaimEvent[]
	announcement: string
	yourShare: number
	onTap: (line: Line) => string | null
}

const headline = ['Everyone', 'pays', 'for', 'what', 'they', 'had.']

const Hero = ({ lines, events, announcement, yourShare, onTap }: HeroProps) => {
	const reduce = useReducedMotion()
	const [printing, setPrinting] = useState(!reduce)
	const latest = events[0]
	const status = latest
		? `${people[latest.person].name} ${latest.undo ? 'put back' : 'claimed'} ${latest.item}`
		: printing ? 'Printing Friday lunch' : 'Waiting for claims'

	return (
		<section aria-labelledby="hero-heading" className="relative">
			<div className="max-w-[1200px] mx-auto px-5 md:px-8 pt-10 md:pt-20 grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16 lg:items-end">
				<h1 id="hero-heading" className="font-sans font-bold text-graphite text-[52px] sm:text-[76px] lg:text-[104px] leading-[0.94] tracking-[-0.045em]">
					{headline.map((word, i) => (
						<motion.span
							key={word}
							className={`inline-block ${word === 'had.' ? 'relative' : ''}`}
							initial={reduce ? false : { opacity: 0, y: 24, filter: 'blur(8px)' }}
							animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
							transition={{ duration: 0.6, delay: 0.06 * i, ease }}
						>
							{word}
							{word === 'had.' && (
								<svg className="doodle absolute left-0 -bottom-2 sm:-bottom-3 w-[92%] h-[14px] sm:h-[18px]" viewBox="0 0 200 18" preserveAspectRatio="none" aria-hidden="true">
									<motion.path d="M4 12 C 40 4 70 15 104 8 C 136 2 164 14 196 7" initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.6, ease }} />
								</svg>
							)}
							{i < headline.length - 1 && ' '}
						</motion.span>
					))}
				</h1>

				<motion.div
					initial={reduce ? false : { opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.35, ease }}
					className="lg:pb-3"
				>
					<p className="text-[18px] md:text-[19px] leading-[1.5] text-slate max-w-[38ch]">
						Snap the receipt and everyone taps their own lines. Tax and tip split themselves, right to the cent.
					</p>
					<div className="mt-7 flex flex-col sm:flex-row gap-2.5">
						<span className="status-pill">
							<Clock size={18} weight="bold" aria-hidden="true" />
							Coming soon
						</span>
						<Link to="/blog" className="btn-secondary">
							Read the dev blog
							<ArrowRight size={16} weight="bold" aria-hidden="true" className="btn-arrow" />
						</Link>
					</div>
				</motion.div>
			</div>

			<div className="relative max-w-[1200px] mx-auto px-5 md:px-8 mt-14 md:mt-20 pb-16">
				<div className="relative mx-auto w-full max-w-[540px]">
					{/* Printer body. The paper slides out from under its lip. */}
					<div className="printer relative z-10 rounded-[22px] px-3 sm:px-4 py-3 flex items-center gap-3">
						<span className={`printer-led ${printing ? 'is-printing' : ''}`} aria-hidden="true" />
						<span className="hidden sm:block flex-1 min-w-0 truncate font-mono text-[13px] text-[#c9c9d2]" aria-hidden="true">{status}</span>
						<span className="printer-display ml-auto shrink-0 flex items-baseline gap-2 font-mono">
							<span className="text-[11px] tracking-[0.08em] text-[#a3a3ad]">YOUR SHARE</span>
							<motion.span
								key={yourShare}
								initial={reduce ? false : { opacity: 0.4, y: -3 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.22, ease }}
								className="text-[18px] font-semibold text-tangerine tabular-nums"
							>
								{money(yourShare)}
							</motion.span>
						</span>
					</div>
					<div className="printer-slot relative z-10 mx-5 h-3 rounded-b-[10px]" aria-hidden="true" />

					<div className="hidden lg:block absolute -left-[230px] top-[150px] w-[190px] text-right" aria-hidden="true">
						<p className="font-sans font-semibold text-[16px] leading-[1.35] text-graphite">Try it.<br />Tap a line to claim it.</p>
						<svg className="doodle ml-auto mt-2" width="96" height="48" viewBox="0 0 96 48">
							<path d="M6 8 C 30 36 58 40 88 30 M88 30 l-12 -8 M88 30 l-10 11" />
						</svg>
					</div>

					<motion.div
						className="relative -mt-3 mx-3 sm:mx-6"
						initial={reduce ? false : { clipPath: 'inset(0% -12% 100% -12%)', y: -28 }}
						animate={{ clipPath: 'inset(0% -12% -8% -12%)', y: 0 }}
						transition={{ duration: 2.6, delay: 0.45, ease: printerFeed }}
						onAnimationComplete={() => setPrinting(false)}
					>
						<div className="paper-shadow">
							<div className="paper px-4 sm:px-6 pt-8 pb-6">
								<Receipt lines={lines} onTap={onTap} />
							</div>
						</div>
					</motion.div>
				</div>
				<p className="sr-only" aria-live="polite">{announcement}</p>
			</div>
		</section>
	)
}

export default Hero
