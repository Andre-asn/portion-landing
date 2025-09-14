import React, { useState, useEffect, useRef } from 'react'
import { 
  Camera, 
  Users, 
  Calculator, 
  CreditCard, 
  Shield, 
  Clock,
  Rocket,
  X,
  List
} from 'phosphor-react'

// Hook for scroll animations
const useScrollAnimation = <T extends HTMLElement = HTMLDivElement>() => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return [ref, isVisible] as const
}

// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-lg z-50 border-b border-border/20">
      <nav className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-primary">
            Portion
          </a>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-8">
            <li><a href="#features" className="text-primary hover:text-secondary transition-colors font-medium">Features</a></li>
            <li><a href="#how-it-works" className="text-primary hover:text-secondary transition-colors font-medium">How It Works</a></li>
            <li><a href="/blog" className="text-primary hover:text-secondary transition-colors font-medium">Blog</a></li>
          </ul>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border/20 pt-4">
            <ul className="flex flex-col gap-4">
              <li><a href="#features" className="text-primary hover:text-secondary transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>Features</a></li>
              <li><a href="#how-it-works" className="text-primary hover:text-secondary transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>How It Works</a></li>
              <li><a href="/blog" className="text-primary hover:text-secondary transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>Blog</a></li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}

// Hero Illustration Component (for your own SVG)
const HeroIllustration = () => {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <div 
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="w-full h-auto max-w-lg mx-auto">
        {/* Add your SVG file here - you can use an img tag or inline SVG */}
        <img 
          src="/hero-illustration.svg" 
          alt="Portion app illustration" 
          className="w-full h-auto"
        />
        {/* Or if you prefer inline SVG, replace the img tag with your SVG code */}
      </div>
    </div>
  )
}

// Hero Section Component
const Hero = () => {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-background to-accent/30 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-6 animate-fade-in">
              Portion
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary mb-8 font-light animate-fade-in-delay-1">
              Split bills effortlessly, Share moments endlessly
            </p>
            <p className="text-lg text-text-secondary max-w-2xl lg:max-w-none mb-8 leading-relaxed animate-fade-in-delay-2">
              The easiest way to split restaurant bills with friends. Take a photo of your receipt, 
              invite your friends, and let everyone claim their items. No more awkward math or payment confusion.
            </p>

            <div className="mb-12 animate-fade-in-delay-2">
              <a
                href="/blog"
                className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full font-medium hover:bg-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                📝 Check out our new development blog
                <span>→</span>
              </a>
            </div>
            
            <div className="animate-fade-in-delay-3">
              <div className="inline-flex items-center gap-3 bg-accent/80 border-2 border-secondary text-primary px-8 py-4 rounded-full text-lg font-semibold mb-8 animate-pulse-slow">
                <Rocket size={24} />
                Coming Soon
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <button className="flex items-center gap-3 bg-text-secondary/60 text-white px-6 py-3 rounded-xl font-medium transition-all hover:bg-text-secondary hover:-translate-y-1 hover:shadow-lg cursor-not-allowed">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div>
                    <div className="text-xs opacity-80">Download on the</div>
                    <div>App Store</div>
                  </div>
                </button>
                
                <button className="flex items-center gap-3 bg-text-secondary/60 text-white px-6 py-3 rounded-xl font-medium transition-all hover:bg-text-secondary hover:-translate-y-1 hover:shadow-lg cursor-not-allowed">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <div>
                    <div className="text-xs opacity-80">Get it on</div>
                    <div>Google Play</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right side - SVG Illustration */}
          <div className="order-first lg:order-last">
            <HeroIllustration />
          </div>
        </div>
      </div>
    </section>
  )
}

// App Screenshots Carousel Component (Text Removed)
const AppCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [ref, isVisible] = useScrollAnimation()

  // Array of your app screenshots
  const screenshots = [
    {
      src: "/screenshot-1.png",
      alt: "Portion app dashboard showing user profile and recent tables"
    },
    {
      src: "/screenshot-2.png", 
      alt: "Tables view showing active and completed bill splits"
    },
    {
      src: "/screenshot-3.png",
      alt: "Buddies screen with friend requests and contacts"
    }
  ]

  // Auto-cycle through images every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === screenshots.length - 1 ? 0 : prevIndex + 1
      )
    }, 3500)

    return () => clearInterval(interval)
  }, [screenshots.length])

  return (
    <div 
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Phone Frame */}
      <div className="relative bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl max-w-sm mx-auto">
        <div className="bg-black rounded-[2rem] p-1">
          <div className="relative bg-white rounded-[1.5rem] overflow-hidden aspect-[9/19.5]">
            {/* Screenshot Images */}
            {screenshots.map((screenshot, index) => (
              <img
                key={index}
                src={screenshot.src}
                alt={screenshot.alt}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center mt-8 space-x-3">
        {screenshots.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary scale-110' 
                : 'bg-secondary hover:bg-primary/70'
            }`}
            aria-label={`Go to screenshot ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress bar showing auto-cycle progress */}
      <div className="mt-4 w-full bg-secondary/30 rounded-full h-1 overflow-hidden max-w-sm mx-auto">
        <div 
          className="h-full bg-primary transition-all duration-[3500ms] ease-linear"
          style={{
            width: '100%',
            animation: 'progress 3.5s infinite linear'
          }}
        />
      </div>
    </div>
  )
}

// Combined Carousel and How It Works Section
const CarouselAndSteps = () => {
  const [titleRef, titleVisible] = useScrollAnimation()

  const steps = [
    {
      number: 1,
      title: "Create a Table",
      description: "The person who paid creates a new table and takes a photo of the receipt."
    },
    {
      number: 2,
      title: "Invite Friends", 
      description: "Add your friends to the table. They'll get a notification to join and start claiming items."
    },
    {
      number: 3,
      title: "Claim Items",
      description: "Everyone selects the items they ordered. Portion automatically calculates individual totals."
    },
    {
      number: 4,
      title: "Pay Instantly",
      description: "Friends pay their share directly through the app. Fast, easy, and transparent."
    }
  ]

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-background to-accent/30">
      <div className="max-w-7xl mx-auto px-6">
        <h2 
          ref={titleRef}
          className={`text-4xl md:text-5xl font-bold text-center text-primary mb-16 transition-all duration-700 ${
            titleVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          How It Works
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - App Carousel */}
          <div className="order-2 lg:order-1">
            <AppCarousel />
          </div>

          {/* Right side - Steps in 2x2 Grid */}
          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {steps.map((step) => (
                <Step
                  key={step.number}
                  number={step.number}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Feature Card Component
interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <div 
      ref={ref}
      className={`bg-background p-8 rounded-2xl border border-border/20 transition-all duration-700 hover:-translate-y-2 hover:shadow-xl ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-white mb-6 mx-auto">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-primary mb-4 text-center">{title}</h3>
      <p className="text-text-secondary leading-relaxed text-center">{description}</p>
    </div>
  )
}

// Features Section Component
const Features = () => {
  const [titleRef, titleVisible] = useScrollAnimation()

  const features = [
    {
      icon: <Camera size={32} />,
      title: "Snap & Split",
      description: "Simply take a photo of your receipt and let Portion do the heavy lifting. No manual entry required."
    },
    {
      icon: <Users size={32} />,
      title: "Real-time Collaboration",
      description: "Everyone can see the receipt and claim their items in real-time. No more confusion about who ordered what."
    },
    {
      icon: <Calculator size={32} />,
      title: "Automatic Calculations",
      description: "Taxes, tips, and totals are calculated automatically. No more awkward math at the dinner table."
    },
    {
      icon: <CreditCard size={32} />,
      title: "Instant Payments",
      description: "Friends can pay you back instantly through the app. No more chasing people for money."
    },
    {
      icon: <Shield size={32} />,
      title: "Transparent & Fair",
      description: "Everyone sees exactly what they're paying for. Complete transparency eliminates disputes."
    },
    {
      icon: <Clock size={32} />,
      title: "Save Time",
      description: "Turn a 10-minute payment process into a 30-second experience. More time for what matters."
    }
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 
          ref={titleRef}
          className={`text-4xl md:text-5xl font-bold text-center text-primary mb-16 transition-all duration-700 ${
            titleVisible 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-8'
          }`}
        >
          Why Choose Portion?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Step Component
interface StepProps {
  number: number
  title: string
  description: string
}

const Step: React.FC<StepProps> = ({ number, title, description }) => {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <div 
      ref={ref}
      className={`text-center transition-all duration-700 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${number * 150}ms` }}
    >
      <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
        {number}
      </div>
      <h3 className="text-xl font-semibold text-primary mb-4">{title}</h3>
      <p className="text-text-secondary leading-relaxed">{description}</p>
    </div>
  )
}

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center">
          <p>&copy; 2025 Portion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// Main App Component
function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <CarouselAndSteps />
      <Features />
      <Footer />
    </div>
  )
}

export default App