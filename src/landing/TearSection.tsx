import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { CheckCircle } from 'phosphor-react'
import { Chip } from './Receipt'
import { money, order, people, plain, total, type Line, type PersonId } from './bill'

const useWide = () => {
	const [wide, setWide] = useState(() => window.matchMedia('(min-width: 768px)').matches)
	useEffect(() => {
		const mq = window.matchMedia('(min-width: 768px)')
		const update = () => setWide(mq.matches)
		mq.addEventListener('change', update)
		return () => mq.removeEventListener('change', update)
	}, [])
	return wide
}

// A paper outline whose edges can be straight (0) or torn into a zigzag (amplitude in px).
// Animating the amplitude is what makes a tear form along a perforation.
const tornEdges = ({ top, right, bottom, left }: { top: number; right: number; bottom: number; left: number }, nx = 16) => {
	const ny = 10
	const pts: string[] = []
	for (let i = 0; i <= 2 * nx; i++) pts.push(`${(i / (2 * nx)) * 100}% ${i % 2 ? top : 0}px`)
	for (let j = 1; j <= 2 * ny; j++) pts.push(`${j % 2 ? `calc(100% - ${right}px)` : '100%'} ${(j / (2 * ny)) * 100}%`)
	for (let i = 2 * nx - 1; i >= 0; i--) pts.push(`${(i / (2 * nx)) * 100}% ${i % 2 ? `calc(100% - ${bottom}px)` : '100%'}`)
	for (let j = 2 * ny - 1; j >= 1; j--) pts.push(`${j % 2 ? left : 0}px ${(j / (2 * ny)) * 100}%`)
	return `polygon(${pts.join(',')})`
}

const TOOTH = 7

// Where each stub lands once the strip has torn apart.
const fan = [
	{ x: -70, y: 60, rotate: -5 },
	{ x: -24, y: 34, rotate: 2 },
	{ x: 24, y: 56, rotate: -2 },
	{ x: 70, y: 30, rotate: 4 },
	{ x: 104, y: 64, rotate: -3 },
]

interface StubProps {
	index: number
	count: number
	progress: MotionValue<number>
	animated: boolean
	children: React.ReactNode
	open?: boolean
}

const Stub = ({ index, count, progress, animated, children, open }: StubProps) => {
	const f = fan[index]
	const first = index === 0
	const last = index === count - 1
	const x = useTransform(progress, [0, 1], [0, f.x])
	const y = useTransform(progress, [0, 1], [0, f.y])
	const rotate = useTransform(progress, [0, 1], [0, f.rotate])
	const clipPath = useTransform(progress, (p) =>
		tornEdges({ top: p * TOOTH, right: last ? 0 : p * 6, bottom: TOOTH, left: first ? 0 : p * 6 })
	)
	const seam = useTransform(progress, [0, 0.2], [1, 0])
	const style = animated
		? { x, y, rotate }
		: { rotate: f.rotate * 0.5 }
	return (
		<motion.div className="stub-shadow relative" style={style}>
			<motion.div
				className={`stub ${open ? 'stub-open' : ''}`}
				style={{ clipPath: animated ? clipPath : tornEdges({ top: TOOTH, right: index % 2 === 0 && !last ? 6 : 0, bottom: TOOTH, left: index % 2 === 1 ? 6 : 0 }) }}
			>
				{children}
			</motion.div>
			{!first && animated && (
				<motion.span aria-hidden="true" className="absolute left-0 top-0 bottom-3 border-l-2 border-dotted border-slate/40" style={{ opacity: seam }} />
			)}
		</motion.div>
	)
}

const itemsFor = (lines: Line[], person: PersonId | null) =>
	lines.flatMap((line) => {
		const n = line.claims.filter((c) => c === person).length
		if (!n) return []
		return [{ name: line.name, qty: n, amount: line.unit * n }]
	})

interface TearSectionProps {
	lines: Line[]
	shares: Record<PersonId | 'unclaimed', number>
}

const TearSection = ({ lines, shares }: TearSectionProps) => {
	const ref = useRef<HTMLElement>(null)
	const reduce = useReducedMotion()
	const wide = useWide()
	const animated = wide && !reduce
	const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
	const progress = useTransform(scrollYProgress, [0.12, 0.62], [0, 1], { clamp: true })
	const tailTeeth = 16 * (order.length + (shares.unclaimed > 0 ? 1 : 0))
	const tailClip = useTransform(progress, (p) => tornEdges({ top: TOOTH, right: 0, bottom: p * TOOTH, left: 0 }, tailTeeth))
	const tailSeam = useTransform(progress, [0, 0.2], [1, 0])
	const unclaimed = itemsFor(lines, null)
	const count = order.length + (shares.unclaimed > 0 ? 1 : 0)

	return (
		<section ref={ref} aria-labelledby="tear-heading" className={`bg-tangerine-soft ${animated ? 'h-[230vh]' : ''}`}>
			<div className={`${animated ? 'sticky top-0 min-h-[100dvh] py-16' : 'py-24'} flex flex-col justify-center`}>
				<div className="max-w-[1200px] mx-auto w-full px-5 md:px-8">
					<div className="relative">
						<h2 id="tear-heading" className="font-sans font-bold text-ink text-[40px] md:text-[56px] leading-[1.02] tracking-[-0.035em] max-w-[14ch]">
							Then it tears into shares.
						</h2>
						<p className="mt-5 max-w-[46ch] text-[19px] leading-[1.5] text-slate">
							Tax and tip are split by what each person ordered, so every share is right to the cent. No rounding fights.
						</p>
					</div>

					<div className="mt-12 md:mt-14 md:w-max md:mx-auto">
						<div className="stub-shadow">
							<motion.div
								className={`tail relative bg-paper ${animated ? '' : 'step-slip'} font-mono px-5 md:px-6 pt-6 pb-4 flex flex-wrap gap-x-6 gap-y-1 justify-between text-[13px] text-slate tracking-[0.06em]`}
								style={animated ? { clipPath: tailClip } : undefined}
							>
								<span>
									<span className="whitespace-nowrap">SAMPLE TABLE / FRIDAY LUNCH</span>{' '}
									<span className="whitespace-nowrap">/ SPLIT {order.length} WAYS</span>
								</span>
								<span className="text-graphite font-semibold whitespace-nowrap">TOTAL {plain(total(lines))}</span>
								{animated && (
									<motion.span aria-hidden="true" className="absolute left-0 right-0 bottom-0 border-b-2 border-dotted border-slate/40" style={{ opacity: tailSeam }} />
								)}
							</motion.div>
						</div>

						<div className={`grid grid-cols-2 gap-4 mt-4 md:mt-0 md:flex md:gap-0`}>
							{order.map((id, i) => {
								const items = itemsFor(lines, id)
								return (
									<Stub key={id} index={i} count={count} progress={progress} animated={animated}>
										<div className="flex items-center gap-2.5 font-sans font-semibold text-[16px]">
											<Chip person={id} size={30} />
											{people[id].name}
											{id === 'priya' && <CheckCircle size={20} weight="fill" className="text-[#15803d] ml-auto" aria-label="Settled up" />}
										</div>
										<ul className="mt-4 space-y-1 text-[13px] text-slate min-h-[44px]">
											{items.length ? items.map((it) => (
												<li key={it.name} className="flex justify-between gap-2">
													<span>{it.qty > 1 ? `${it.qty}× ` : ''}{it.name}</span>
													<span className="hidden md:inline tabular-nums">{plain(it.amount)}</span>
												</li>
											)) : <li>Nothing claimed yet</li>}
										</ul>
										<p className="mt-4 pt-3 border-t-2 border-dashed border-rule flex items-baseline justify-between">
											<span className="text-[12px] text-slate font-sans whitespace-nowrap">{id === 'priya' ? 'Settled' : 'Owes'}</span>
											<span className="text-[20px] md:text-[24px] font-semibold text-graphite tabular-nums">{money(shares[id])}</span>
										</p>
									</Stub>
								)
							})}
							{shares.unclaimed > 0 && (
								<Stub index={4} count={count} progress={progress} animated={animated} open>
									<p className="font-sans font-semibold text-[16px]">Still on the table</p>
									<ul className="mt-4 space-y-1 text-[13px] text-slate">
										{unclaimed.map((it) => (
											<li key={it.name} className="flex justify-between gap-2">
												<span>{it.name}</span>
												<span className="hidden md:inline tabular-nums">{plain(it.amount)}</span>
											</li>
										))}
									</ul>
									<p className="mt-4 pt-3 border-t-2 border-dashed border-rule text-right text-[20px] md:text-[24px] font-semibold tabular-nums">{money(shares.unclaimed)}</p>
								</Stub>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default TearSection
