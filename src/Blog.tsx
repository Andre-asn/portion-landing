import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, CaretDown } from 'phosphor-react'

// Blog post data type
interface BlogPost {
	id: number
	title: string
	subtitle: string
	date: string
	content: string
	imageSuggestion?: string
	image?: string
	imageAlt?: string
	image2?: string
	image2Alt?: string
}

// Sample blog posts data (ordered by date, newest first)
const blogPosts: BlogPost[] = [
    {
		id: 6,
		title: "Receipt Parsing Updates",
		subtitle: "Parsing and populating receipt data using Mistral OCR",
		date: "2025-09-14",
		content: "On our way to completing our most exciting feature, intelligent receipt parsing powered by Mistral AI! You can now simply photograph any restaurant receipt and watch as our system automatically extracts every item, quantity, and price. The AI intelligently filters out subtotals and duplicates, leaving only the actual food and drinks you can split. You can select partial quantities (want just 1 of 3 sodas? No problem!), edit any OCR mistakes, and watch your running total update in real-time. This eliminates the tedious manual entry that made bill splitting apps frustrating to use.",
		image: "/blog/Screenshot 2025-09-14 173351.png",
	},
    {
		id: 5,
		title: "Buddies and Table Screens",
		subtitle: "Populated screens with real data",
		date: "2025-08-19",
		content: "I've successfully populated our core social features with real user data! The Buddies screen now displays your actual friend connections with profile pictures, names, and online status. You can search through your buddy list, send friend requests, and manage your social network seamlessly. Meanwhile, our Tables screen shows live, active dining tables with real-time updates on who's joined, what items are available, and which portions have been claimed. This brings the app to life with authentic social interactions - no more placeholder data or mock scenarios. You can now see your real friends' avatars, track actual table progress, and experience the true collaborative nature of Portion. The foundation is set for meaningful social dining experiences!",
		image: "/blog/Screenshot 2025-09-14 172957.png",
        image2: "/blog/Screenshot 2025-09-14 173048.png",
	},
	{
		id: 4,
		title: "Finalizing the UI",
		subtitle: "After multiple iterations, I've finally settled on something I'm happy with",
		date: "2025-08-04",
		content: "While designing the UI, I really took a lot of inspiration from Venmo and CashApp - I really liked their design and it almost fits what I'm trying to achieve. However, after multiple iterations, I realized how cluttered my screens were with information that wasn't necessarily useful, like having a 'money spent' widget on the home screen. I cut out a lot of that, and completely changed how the app looks, and the screens that are accessible. Feels a lot more minimal and intuitive now compared to before. Here are some early screenshots, different from what I have on the landing page at the moment.",
		image: "/blog/Screenshot 2025-09-14 172423.png",
	},
	{
		id: 3,
		title: "The Technical Learning Curve",
		subtitle: "From classroom projects to real-world challenges",
		date: "2025-07-30",
		content: "Building Portion has been a crash course in everything they don't teach you in CS classes. I've had to learn about real-time databases, image processing, payment systems, and mobile development - all while juggling my actual coursework. It's crazy how much time I spend on things that seem simple, like making sure the app works when someone has a slow internet connection. I'm using Flutter for the mobile app and Supabase for the backend, which has been a great learning experience. Every day I'm discovering new concepts and best practices that I wish I'd known about earlier."
	},
	{
		id: 2,
		title: "My Design Process: From Sketch to Screen",
		subtitle: "How I'm learning to think like a designer (with lots of trial and error)",
		date: "2025-07-15",
		content: "I never realized how much work goes into making an app look good until I started this project. My first wireframes looked like they were drawn by a 5-year-old haha. I've been learning about design systems, typography, and a little bit about tools like Figma, though not much. The biggest challenge is definitely making an intuitive UI while being appealing to look at. I've gone through probably 20 different iterations of how users should interact with the app, especially the receipt scanning screen. I'm also learning about how to use colors. The design process is way more iterative than I expected, but it's been really satisfying to see the app slowly become more polished.",
	},
	{
		id: 1,
		title: "Starting My First Real App: Portion",
		subtitle: "A student's journey into building something people actually want to use",
		date: "2025-07-01",
		content: "Hey everyone! I'm a computer science student who got tired of the awkward bill-splitting process at restaurants. You know that moment when the check comes and everyone's trying to figure out who ordered what? Yeah, that's what inspired me to build Portion. This is my first serious attempt at creating a real app that solves a problem I face regularly. I'll be documenting my learning process, the mistakes I make, and hopefully some wins along the way. It's been a wild ride so far, and I'm excited to share what I've learned!"
	},
]

// Individual blog post component
const BlogPostCard = ({ post, isExpanded, onToggle }: { 
	post: BlogPost, 
	isExpanded: boolean, 
	onToggle: () => void 
}) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="bg-white rounded-2xl border border-border/20 shadow-lg overflow-hidden cursor-pointer"
			whileHover={{ 
				scale: 1.02,
				boxShadow: "0 20px 40px rgba(0, 109, 119, 0.1)"
			}}
			onClick={onToggle}
		>
			{/* Post Header */}
			<motion.div 
				className="p-8"
				whileHover={{ backgroundColor: "rgba(0, 109, 119, 0.02)" }}
				transition={{ duration: 0.2 }}
			>
				<div className="flex items-start justify-between mb-4">
					<div className="flex-1">
						<h3 className="text-2xl font-bold text-primary mb-2">{post.title}</h3>
						<p className="text-lg text-text-secondary mb-4">{post.subtitle}</p>
					</div>
					<motion.div
						animate={{ rotate: isExpanded ? 180 : 0 }}
						transition={{ duration: 0.3 }}
						className="ml-4 text-primary"
					>
						<CaretDown size={24} />
					</motion.div>
				</div>
				
				<div className="flex items-center text-sm text-text-secondary">
					<Calendar size={16} className="mr-2" />
					{new Date(post.date).toLocaleDateString('en-US', { 
						year: 'numeric', 
						month: 'long', 
						day: 'numeric' 
					})}
				</div>
			</motion.div>

			{/* Expandable Content */}
			<AnimatePresence>
				{isExpanded && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						className="overflow-hidden"
					>
						<div className="px-8 pb-8 border-t border-border/20">
							<motion.p 
								initial={{ y: -20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.1, duration: 0.3 }}
								className="text-text-secondary leading-relaxed pt-6"
							>
								{post.content}
							</motion.p>
							
							{(post.image || post.image2) && (
								<motion.div
									initial={{ y: -20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ delay: 0.2, duration: 0.3 }}
									className="mt-6"
								>
									{post.image && post.image2 ? (
										// Two images side by side
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<img 
												src={post.image} 
												alt={post.imageAlt || ""}
												className="w-full rounded-xl shadow-lg border border-border/20"
											/>
											<img 
												src={post.image2} 
												alt={post.image2Alt || ""}
												className="w-full rounded-xl shadow-lg border border-border/20"
											/>
										</div>
									) : (
										// Single image centered
										<img 
											src={post.image || post.image2} 
											alt={post.imageAlt || post.image2Alt || ""}
											className="max-w-md mx-auto rounded-xl shadow-lg border border-border/20"
										/>
									)}
								</motion.div>
							)}
							
							{post.imageSuggestion && (
								<motion.div
									initial={{ y: -20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ delay: 0.3, duration: 0.3 }}
									className="mt-6 p-4 bg-accent/10 rounded-xl border border-accent/20"
								>
									<h4 className="text-sm font-semibold text-primary mb-2">📸 Image Suggestion:</h4>
									<p className="text-sm text-text-secondary italic">{post.imageSuggestion}</p>
								</motion.div>
							)}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	)
}

// Header component for blog page
const BlogHeader = () => {
	return (
		<motion.header
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.6, ease: "easeOut" }}
			className="fixed top-0 left-0 right-0 z-50 border-b border-border/20 bg-white/95 backdrop-blur-lg shadow-lg"
		>
			<nav className="max-w-6xl mx-auto px-6 py-4">
				<div className="flex justify-between items-center">
					<motion.a 
						href="/" 
						className="text-2xl font-bold text-primary"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						Portion
					</motion.a>
					
					<motion.a
						href="/"
						className="text-primary hover:text-secondary transition-colors font-medium"
						whileHover={{ y: -2 }}
						transition={{ duration: 0.2 }}
					>
						← Back to Home
					</motion.a>
				</div>
			</nav>
		</motion.header>
	)
}

// Main Blog component
const Blog = () => {
	const [expandedPost, setExpandedPost] = useState<number | null>(null)

	const togglePost = (postId: number) => {
		setExpandedPost(expandedPost === postId ? null : postId)
	}

	return (
		<div className="min-h-screen bg-background">
			<BlogHeader />
			
			{/* Hero Section */}
			<motion.section 
				className="pt-24 pb-16"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
			>
				<div className="max-w-4xl mx-auto px-6">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.8 }}
						className="text-center mb-16"
					>
						<h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
							Development Blog
						</h1>
						<p className="text-xl text-text-secondary max-w-2xl mx-auto">
							Follow our journey as we build Portion. Get insights into our development process, 
							new features, and the challenges we're solving along the way.
						</p>
					</motion.div>

					{/* Blog Posts */}
					<div className="space-y-6">
						{blogPosts.map((post, index) => (
							<motion.div
								key={post.id}
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.1 * index, duration: 0.6 }}
							>
								<BlogPostCard
									post={post}
									isExpanded={expandedPost === post.id}
									onToggle={() => togglePost(post.id)}
								/>
							</motion.div>
						))}
					</div>

					{/* Coming Soon Message */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.5, duration: 0.8 }}
						className="text-center mt-16 p-8 bg-accent/10 rounded-2xl border border-accent/20"
					>
						<h3 className="text-2xl font-semibold text-primary mb-4">
							More Updates Coming Soon
						</h3>
						<p className="text-text-secondary">
							We'll be posting regular updates about our progress, new features, and insights 
							into the development process. Check back often for the latest news!
						</p>
					</motion.div>
				</div>
			</motion.section>
		</div>
	)
}

export default Blog
