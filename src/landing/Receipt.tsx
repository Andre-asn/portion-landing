import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Scissors } from 'phosphor-react'
import { people, plain, subtotal, TAX, TIP, total, type Line, type PersonId } from './bill'

const ease = [0.23, 1, 0.32, 1] as const

export const Chip = ({ person, size = 28 }: { person: PersonId; size?: number }) => {
	const p = people[person]
	return (
		<span
			className="inline-grid place-items-center rounded-full font-sans font-semibold shrink-0"
			style={{ width: size, height: size, background: p.chip, color: p.chipText, fontSize: Math.max(11, size * 0.38) }}
			aria-hidden="true"
		>
			{p.initials}
		</span>
	)
}

interface RowProps {
	line: Line
	onTap: (line: Line) => string | null
}

const Row = ({ line, onTap }: RowProps) => {
	const reduce = useReducedMotion()
	const [note, setNote] = useState<string | null>(null)
	const mine = line.claims.includes('you')
	const qty = line.claims.length

	useEffect(() => {
		if (!note) return
		const t = setTimeout(() => setNote(null), 2400)
		return () => clearTimeout(t)
	}, [note])

	return (
		<li>
			<button
				type="button"
				onClick={() => setNote(onTap(line))}
				aria-pressed={mine}
				className="receipt-row group w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left"
				data-mine={mine || undefined}
			>
				<span className="flex-1 min-w-0">
					<span className="block truncate">{line.name}</span>
					{qty > 1 && <span className="block text-[12px] text-slate">{qty} × {plain(line.unit)}</span>}
				</span>
				<span className="tabular-nums">{plain(line.unit * qty)}</span>
				<span className="flex gap-1 min-w-[56px] justify-end">
					{line.claims.map((who, i) => (
						<AnimatePresence key={i} mode="popLayout" initial={false}>
							{who ? (
								<motion.span
									key={who}
									initial={reduce ? false : { opacity: 0, scale: 0.6, filter: 'blur(4px)' }}
									animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
									exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.12 } }}
									transition={{ duration: 0.32, ease }}
									className="rounded-full"
								>
									<Chip person={who} size={26} />
								</motion.span>
							) : (
								<span key="open" className="w-[26px] h-[26px] rounded-full border-2 border-dashed border-rule bg-paper" />
							)}
						</AnimatePresence>
					))}
				</span>
			</button>
			<AnimatePresence initial={false}>
				{note && (
					<motion.p
						role="status"
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.2, ease }}
						className="overflow-hidden px-3 font-sans text-[13px] text-tangerine-text"
					>
						<span className="block pb-1.5">{note}</span>
					</motion.p>
				)}
			</AnimatePresence>
		</li>
	)
}

interface ReceiptProps {
	lines: Line[]
	onTap: RowProps['onTap']
}

const Receipt = ({ lines, onTap }: ReceiptProps) => (
	<div className="receipt relative w-full font-mono text-[15px] text-graphite">
		<div className="text-center pt-1">
			<p className="text-[22px] font-semibold tracking-[0.14em]">FRIDAY LUNCH</p>
			<p className="mt-3 text-[12px] text-slate tracking-[0.08em]">SAMPLE TABLE &nbsp;/&nbsp; 4 GUESTS</p>
			<p className="mt-1 pb-3 text-[12px] text-slate tracking-[0.08em] border-b-2 border-dashed border-rule">SPLIT BY WHAT YOU HAD</p>
		</div>

		<p className="lg:hidden mt-3 px-3 font-sans text-[13px] text-tangerine-text">Try it: tap a line to claim it.</p>
		<ul className="mt-2 flex flex-col">
			{lines.map((line) => (
				<Row key={line.id} line={line} onTap={onTap} />
			))}
		</ul>

		<dl className="mt-3 pt-3 border-t-2 border-dashed border-rule px-3 text-slate">
			<div className="flex justify-between py-0.5"><dt>Subtotal</dt><dd className="tabular-nums">{plain(subtotal(lines))}</dd></div>
			<div className="flex justify-between py-0.5"><dt>Tax</dt><dd className="tabular-nums">{plain(TAX)}</dd></div>
			<div className="flex justify-between py-0.5"><dt>Tip</dt><dd className="tabular-nums">{plain(TIP)}</dd></div>
			<div className="flex justify-between pt-2 text-graphite font-semibold text-[17px]"><dt>TOTAL</dt><dd className="tabular-nums">{plain(total(lines))}</dd></div>
		</dl>

		<p className="mt-5 text-center text-[12px] text-slate tracking-[0.08em]">THANK YOU. SPLIT FAIRLY.</p>
		<div className="perforation mt-6 -mx-4 sm:-mx-6" aria-hidden="true">
			<Scissors size={18} weight="bold" className="text-slate shrink-0" />
		</div>
	</div>
)

export default Receipt
