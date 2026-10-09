import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const steps = [
	{
		title: 'Snap the receipt.',
		body: 'Point your camera at the bill. Portion reads every item, price and quantity, so nobody types a thing.',
		screen: '/screens/scan.png',
		alt: 'Portion camera screen framing a restaurant receipt for scanning',
	},
	{
		title: 'Everyone taps what they had.',
		body: 'Friends join the table from their own phones and claim items at the same time. Shared a plate? Claim just your part.',
		screen: '/screens/pick-lines.png',
		alt: 'Portion Friday lunch table where you have claimed the chicken burrito and Mexican Coke, with your total of $21.89',
	},
	{
		title: 'Tax and tip split themselves.',
		body: 'Each share follows what each person ordered. Close the table and everyone knows exactly what they owe.',
		screen: '/screens/summary.png',
		alt: 'Portion table summary listing what each friend owes',
	},
]

const ease = [0.23, 1, 0.32, 1] as const

const Phone = ({ src, alt }: { src: string; alt: string }) => (
	<div className="phone-frame">
		<img src={src} alt={alt} width={393} height={852} loading="lazy" className="block w-full h-auto rounded-[34px]" />
	</div>
)

const HowItWorks = () => {
	const reduce = useReducedMotion()
	const [active, setActive] = useState(0)
	const refs = useRef<(HTMLLIElement | null)[]>([])

	useEffect(() => {
		const obs = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index))
				})
			},
			{ rootMargin: '-45% 0px -45% 0px' }
		)
		refs.current.forEach((el) => el && obs.observe(el))
		return () => obs.disconnect()
	}, [])

	return (
		<section aria-labelledby="how-heading" className="section-dark bg-graphite">
			<div className="max-w-[1200px] mx-auto px-5 md:px-8 py-24 md:py-32">
				<h2 id="how-heading" className="font-sans font-bold text-white text-[40px] md:text-[56px] leading-[1.02] tracking-[-0.035em] max-w-[16ch]">
					How a table works.
				</h2>

				<div className="mt-14 md:mt-4 grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-x-20">
					<div className="hidden md:block">
						<div className="sticky top-[calc(50dvh-300px)] py-16 flex justify-center">
							<div className="relative w-[290px]">
								<AnimatePresence mode="popLayout" initial={false}>
									<motion.div
										key={active}
										initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, filter: 'blur(6px)' }}
										animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
										exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12, filter: 'blur(6px)' }}
										transition={{ duration: 0.38, ease }}
									>
										<Phone src={steps[active].screen} alt={steps[active].alt} />
									</motion.div>
								</AnimatePresence>
							</div>
						</div>
					</div>

					<ol className="flex flex-col gap-20 md:gap-0">
						{steps.map((step, i) => (
							<li
								key={step.title}
								ref={(el) => { refs.current[i] = el }}
								data-index={i}
								className="md:min-h-[78dvh] flex flex-col md:justify-center"
							>
								<div className="relative">
									<svg className="doodle hidden md:block absolute -left-[86px] top-1/2 -translate-y-1/2" width="72" height="40" viewBox="0 0 72 40" aria-hidden="true">
										<motion.path d="M68 14 C 48 30 26 28 8 20 M8 20 l12 -8 M8 20 l10 11" initial={false} animate={{ pathLength: active === i ? 1 : 0, opacity: active === i ? 1 : 0 }} transition={{ duration: reduce ? 0 : 0.45, ease }} />
									</svg>
									<div className="stub-shadow">
										<div className="step-slip" data-active={active === i || undefined}>
											<h3 className="step-title font-sans font-bold text-[26px] md:text-[30px] leading-[1.1] tracking-[-0.03em]">{step.title}</h3>
											<p className="mt-3 max-w-[40ch] text-[17px] leading-[1.55] text-slate">{step.body}</p>
										</div>
									</div>
								</div>
								<div className="md:hidden mt-8 w-[260px] mx-auto">
									<Phone src={step.screen} alt={step.alt} />
								</div>
							</li>
						))}
					</ol>
				</div>
			</div>
		</section>
	)
}

export default HowItWorks
