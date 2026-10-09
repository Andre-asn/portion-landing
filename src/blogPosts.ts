// Blog post data type
export interface BlogPost {
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
export const blogPosts: BlogPost[] = [
    {
		id: 6,
		title: "Receipt Parsing Updates",
		subtitle: "Parsing and populating receipt data using Mistral OCR",
		date: "2025-09-14",
		content: "On our way to completing our most exciting feature, intelligent receipt parsing powered by Mistral AI! You can now simply photograph any restaurant receipt and watch as our system automatically extracts every item, quantity, and price. The AI intelligently filters out subtotals and duplicates, leaving only the actual food and drinks you can split. You can select partial quantities (want just 1 of 3 sodas? No problem!), edit any OCR mistakes, and watch your running total update in real-time. This eliminates the tedious manual entry that made bill splitting apps frustrating to use.",
		image: "/blog/Screenshot 2025-09-14 173351.png",
		imageAlt: "Upload Receipt screen with a photo of a receipt above the items read from it, each with a checkbox, quantity selector and price",
	},
    {
		id: 5,
		title: "Buddies and Table Screens",
		subtitle: "Populated screens with real data",
		date: "2025-08-19",
		content: "I've successfully populated our core social features with real user data! The Buddies screen now displays your actual friend connections with profile pictures, names, and online status. You can search through your buddy list, send friend requests, and manage your social network seamlessly. Meanwhile, our Tables screen shows live, active dining tables with real-time updates on who's joined, what items are available, and which portions have been claimed. This brings the app to life with authentic social interactions - no more placeholder data or mock scenarios. You can now see your real friends' avatars, track actual table progress, and experience the true collaborative nature of Portion. The foundation is set for meaningful social dining experiences!",
		image: "/blog/Screenshot 2025-09-14 172957.png",
		imageAlt: "Tables screen with a search bar and a list of dining tables, each showing a total and date",
        image2: "/blog/Screenshot 2025-09-14 173048.png",
		image2Alt: "My Buddies screen with a search bar and one friend listed, name redacted",
	},
	{
		id: 4,
		title: "Finalizing the UI",
		subtitle: "After multiple iterations, I've finally settled on something I'm happy with",
		date: "2025-08-04",
		content: "While designing the UI, I really took a lot of inspiration from Venmo and CashApp - I really liked their design and it almost fits what I'm trying to achieve. However, after multiple iterations, I realized how cluttered my screens were with information that wasn't necessarily useful, like having a 'money spent' widget on the home screen. I cut out a lot of that, and completely changed how the app looks, and the screens that are accessible. Feels a lot more minimal and intuitive now compared to before. Here are some early screenshots, different from what I have on the landing page at the moment.",
		image: "/blog/Screenshot 2025-09-14 172423.png",
		imageAlt: "Early home screen with a greeting, Recent Tables list filtered by All, Active and Completed, and a bottom bar",
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
