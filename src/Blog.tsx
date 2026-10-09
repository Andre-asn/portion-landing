import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, CaretDown } from 'phosphor-react'
import { blogPosts, type BlogPost } from './blogPosts'


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
