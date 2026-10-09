import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Clock } from 'phosphor-react'
import { blogPosts, type BlogPost } from './blogPosts'
import { Footer, Navigation } from './landing/Chrome'

const ease = [0.23, 1, 0.32, 1] as const

const at = (iso: string) => new Date(`${iso}T12:00:00`)
const longDate = (iso: string) => at(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
const shortDate = (iso: string) => at(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()
const monthYear = (iso: string) => at(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()
const number = (id: number) => `NO. ${String(id).padStart(2, '0')}`

const Screens = ({ post }: { post: BlogPost }) => {
	const shots = [
		post.image && { src: post.image, alt: post.imageAlt ?? '' },
		post.image2 && { src: post.image2, alt: post.image2Alt ?? '' },
	].filter(Boolean) as { src: string; alt: string }[]
	if (!shots.length) return null
	return (
		<div className="mt-10 flex flex-wrap gap-6">
			{shots.map((shot) => (
				<figure key={shot.src} className="phone-frame w-[min(100%,250px)]">
					<img src={shot.src} alt={shot.alt} width={409} height={924} loading="lazy" className="block w-full h-auto rounded-[34px]" />
				</figure>
			))}
		</div>
	)
}

const Post = ({ post, newest }: { post: BlogPost; newest: boolean }) => (
	<article id={`post-${post.id}`} aria-labelledby={`post-${post.id}-title`} className="post scroll-mt-24">
		<p className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[13px] tracking-[0.06em] text-slate">
			<span>{number(post.id)}</span>
			<span aria-hidden="true">/</span>
			<time dateTime={post.date}>{longDate(post.date).toUpperCase()}</time>
			{newest && <span className="newest-tag">Newest</span>}
		</p>
		<h2 id={`post-${post.id}-title`} className="mt-4 font-sans font-bold text-graphite text-[32px] md:text-[44px] leading-[1.05] tracking-[-0.035em] max-w-[20ch]">
			{post.title}
		</h2>
		<p className="mt-3 text-[19px] md:text-[21px] leading-[1.4] text-slate max-w-[40ch]">{post.subtitle}</p>
		<p className="mt-7 text-[17px] md:text-[18px] leading-[1.7] text-graphite/85 max-w-[65ch]">{post.content}</p>
		<Screens post={post} />
	</article>
)

const BuildLog = ({ active }: { active: number }) => (
	<nav aria-label="Posts" className="paper-shadow">
		<div className="paper px-5 pt-7 pb-6 font-mono text-[13px]">
			<p className="text-center font-semibold text-[15px] tracking-[0.14em]">BUILD LOG</p>
			<p className="mt-1 pb-3 text-center text-[12px] text-slate tracking-[0.08em] border-b-2 border-dashed border-rule">
				{monthYear(blogPosts[blogPosts.length - 1].date)} TO {monthYear(blogPosts[0].date)}
			</p>
			<ol className="mt-2 flex flex-col">
				{blogPosts.map((post) => (
					<li key={post.id}>
						<a href={`#post-${post.id}`} className="log-line" aria-current={active === post.id ? 'true' : undefined}>
							<span className="shrink-0 w-[52px] text-slate tabular-nums">{shortDate(post.date)}</span>
							<span className="min-w-0">{post.title}</span>
						</a>
					</li>
				))}
			</ol>
			<p className="mt-3 pt-3 px-2 border-t-2 border-dashed border-rule flex justify-between font-semibold">
				<span>POSTS</span>
				<span className="tabular-nums">{blogPosts.length}</span>
			</p>
		</div>
	</nav>
)

const useActivePost = () => {
	const [active, setActive] = useState(blogPosts[0].id)
	useEffect(() => {
		const obs = new IntersectionObserver(
			(entries) => entries.forEach((e) => {
				if (e.isIntersecting) setActive(Number(e.target.id.replace('post-', '')))
			}),
			{ rootMargin: '-35% 0px -60% 0px' }
		)
		document.querySelectorAll('.post').forEach((el) => obs.observe(el))
		return () => obs.disconnect()
	}, [])
	return active
}

const Blog = () => {
	const reduce = useReducedMotion()
	const active = useActivePost()
	const words = ['Dev', 'blog.']

	return (
		<div className="landing blog-page min-h-[100dvh] bg-table text-graphite font-sans">
			<a href="#main" className="skip-link">Skip to content</a>
			<Navigation />
			<main id="main">
				<header className="max-w-[1200px] mx-auto px-5 md:px-8 pt-12 md:pt-20 pb-14 md:pb-20 grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16 lg:items-end">
					<h1 className="font-sans font-bold text-graphite text-[60px] sm:text-[84px] lg:text-[112px] leading-[0.94] tracking-[-0.045em]">
						{words.map((word, i) => (
							<motion.span
								key={word}
								className="inline-block relative"
								initial={reduce ? false : { opacity: 0, y: 24, filter: 'blur(8px)' }}
								animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
								transition={{ duration: 0.6, delay: 0.08 * i, ease }}
							>
								{word}
								{i === 0 && ' '}
								{i === 1 && (
									<svg className="doodle absolute left-0 -bottom-4 sm:-bottom-6 w-[88%] h-[14px] sm:h-[18px]" viewBox="0 0 200 18" preserveAspectRatio="none" aria-hidden="true">
										<motion.path d="M4 12 C 40 4 70 15 104 8 C 136 2 164 14 196 7" initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.4, ease }} />
									</svg>
								)}
							</motion.span>
						))}
					</h1>
					<motion.div
						initial={reduce ? false : { opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.25, ease }}
						className="lg:pb-4"
					>
						<p className="text-[18px] md:text-[19px] leading-[1.5] text-slate max-w-[38ch]">
							Portion is being built in the open by a student developer. Every update, from the first sketch to receipt scanning, lands here first.
						</p>
						<p className="mt-5 font-mono text-[13px] tracking-[0.06em] text-slate">
							{blogPosts.length} POSTS &nbsp;/&nbsp; LATEST {longDate(blogPosts[0].date).toUpperCase()}
						</p>
					</motion.div>
				</header>

				<div className="max-w-[1200px] mx-auto px-5 md:px-8 pb-24 md:pb-32 grid gap-16 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-20">
					<aside className="hidden lg:block">
						<div className="sticky top-24">
							<BuildLog active={active} />
						</div>
					</aside>
					<div className="flex flex-col gap-16 md:gap-20">
						{blogPosts.map((post, i) => (
							<div key={post.id} className={i ? 'pt-16 md:pt-20 border-t-2 border-dashed border-rule' : ''}>
								<Post post={post} newest={i === 0} />
							</div>
						))}
					</div>
				</div>

				<section aria-labelledby="blog-closing" className="section-accent bg-tangerine">
					<div className="max-w-[1200px] mx-auto px-5 md:px-8 py-20 md:py-24 flex flex-col md:flex-row gap-8 md:items-end md:justify-between">
						<div>
							<h2 id="blog-closing" className="font-sans font-bold text-on-tangerine text-[36px] md:text-[52px] leading-[1.02] tracking-[-0.035em] max-w-[14ch]">
								More posts as the app gets closer.
							</h2>
							<p className="mt-5 inline-flex items-center gap-2 font-sans font-semibold text-[15px] text-on-tangerine">
								<Clock size={18} weight="bold" aria-hidden="true" />
								Coming soon to the app stores.
							</p>
						</div>
						<Link to="/" className="btn-dark self-start md:self-auto">
							See how Portion works
							<ArrowRight size={16} weight="bold" aria-hidden="true" className="btn-arrow" />
						</Link>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	)
}

export default Blog
