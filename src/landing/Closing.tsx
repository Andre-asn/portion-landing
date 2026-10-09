import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'phosphor-react'
import { blogPosts } from '../blogPosts'

const formatDate = (iso: string) =>
	new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

const Closing = () => {
	const latest = blogPosts[0]
	return (
		<section aria-labelledby="closing-heading" className="section-accent relative overflow-hidden bg-tangerine">
			<div className="max-w-[1200px] mx-auto px-5 md:px-8 py-24 md:py-32 grid md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] gap-12 items-center">
				<div>
					<h2 id="closing-heading" className="font-sans font-bold text-on-tangerine text-[40px] md:text-[56px] leading-[1.02] tracking-[-0.035em] max-w-[13ch]">
						Not in the app stores yet.
					</h2>
					<svg className="doodle mt-2 w-[180px] h-[18px]" viewBox="0 0 180 18" aria-hidden="true">
						<path d="M4 12 C 30 4 46 16 72 9 C 98 2 120 15 146 8 C 158 5 168 7 176 10" />
					</svg>
					<p className="mt-5 max-w-[44ch] text-[19px] leading-[1.5] text-on-tangerine/80">
						Portion is being built in the open by a student developer. The dev blog has every update, from first sketch to receipt scanning.
					</p>

					<Link to="/blog" className="latest-post stub-shadow group mt-10 block max-w-[520px]">
						<span className="step-slip block">
							<span className="block font-sans font-bold text-[22px] leading-[1.2] tracking-[-0.02em] text-graphite">{latest.title}</span>
							<span className="mt-1.5 block text-[16px] text-slate">{latest.subtitle}</span>
							<span className="mt-3 block font-mono text-[13px] text-slate">Posted {formatDate(latest.date)}</span>
							<span className="mt-5 inline-flex items-center gap-2 font-sans font-semibold text-[15px] text-ink">
								Read the dev blog
								<ArrowRight size={16} weight="bold" aria-hidden="true" className="btn-arrow" />
							</span>
						</span>
					</Link>

					<p className="mt-8 inline-flex items-center gap-2 font-sans font-semibold text-[15px] text-on-tangerine">
						<Clock size={18} weight="bold" aria-hidden="true" className="text-on-tangerine" />
						Coming soon.
					</p>
				</div>
				<img
					src="/hero_image_1.png"
					alt="Line drawing of one hand paying on a phone while another tears off its part of a receipt"
					width={1080}
					height={1080}
					loading="lazy"
					className="w-full max-w-[460px] mx-auto mix-blend-multiply -mt-24 md:mt-0"
				/>
			</div>
		</section>
	)
}

export default Closing
