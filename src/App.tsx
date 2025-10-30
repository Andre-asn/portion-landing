import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { X, List } from 'phosphor-react'

const Navigation = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	return (
	  <div className="sticky top-0 bg-[#489fb5] z-50">
	    <div className="flex items-center justify-between max-w-[1200px] mx-auto h-16 px-8">
	      <span className="logo-p" style={{ fontSize: '24px' }}>P</span>
	      
	        <Link to="/blog" className="hidden md:inline-block text-[#ede7e3] text-[15px] leading-[1em] tracking-[-0.01em]">
                Blog
            </Link>

	      <button 
	        className="md:hidden text-[#ede7e3]"
	        onClick={() => setIsMenuOpen(!isMenuOpen)}
	      >
	        {isMenuOpen ? <X size={24} /> : <List size={24} />}
	      </button>
	    </div>

	    {isMenuOpen && (
	      <div className="md:hidden border-t border-white/20 px-8 py-4 bg-[#489fb5]">
	        <Link to="/blog" className="text-[#ede7e3] block" onClick={() => setIsMenuOpen(false)}>
	          Blog
	        </Link>
	      </div>
	    )}
	  </div>
	)
}

const Hero = () => {
	const [hoveredButton, setHoveredButton] = useState<string | null>(null)
	const [titleDone, setTitleDone] = useState(false)
	const [subtitleDone, setSubtitleDone] = useState(false)
	const [showHeroImage, setShowHeroImage] = useState(false)
	
	const screenshots = [
	  '/screenshot-1.png',
	  '/screenshot-2.png', 
	  '/screenshot-3.png'
	]

	return (
	  <section className="min-h-screen flex items-center relative overflow-hidden" style={{ backgroundColor: 'rgba(130, 192, 204, 0.25)' }}>
	    <div className="max-w-[1200px] mx-auto px-5 w-full grid lg:grid-cols-2 gap-16 items-center">
	      
	      <div className="text-center">
	        {(() => {
	          const [visible, setVisible] = ((): [boolean, (v: boolean) => void] => {
	            const [v, sv] = useState(false)
	            return [v, sv]
	          })()
	          const titleRef = useRef<HTMLHeadingElement>(null)

	          useEffect(() => {
	            const el = titleRef.current
	            if (!el) return
	            const obs = new IntersectionObserver(
	              ([entry]) => {
	                if (entry.isIntersecting) {
	                  setVisible(true)
	                  obs.disconnect()
	                }
	              },
	              { threshold: 0.2 }
	            )
	            obs.observe(el)
	            return () => obs.disconnect()
	          }, [])

	          useEffect(() => {
	            if (!visible) return
	            const totalMs = 600 + 0.1 * 6 * 1000 + 100
	            const t = setTimeout(() => setTitleDone(true), totalMs)
	            return () => clearTimeout(t)
	          }, [visible])

	          const chars = 'PORTION'.split('')
	          return (
	            <div className="relative inline-block">
	              {/* Top-left SVG (mirrored) */}
	              <div className="hidden lg:block absolute pointer-events-none" style={{ top: '-100px', left: '-100px' }}>
	                <svg xmlns="http://www.w3.org/2000/svg" width="140" height="143" fill="none" style={{ transform: 'scaleX(-1) rotate(30deg)' }}>
	                  <path d="M 2.682 47.102 C 6.188 55.533 13.384 74.817 14.123 84.51 M 93.775 2.678 C 85.775 26.263 68.253 76.519 62.171 88.862 M 112.568 111.508 C 127.119 95.424 159.092 61.82 170.565 56.074 M 137.669 150.355 C 149.514 147.171 178.122 140.202 197.788 137.796 M 135.299 189.381 C 141.147 190.144 155.439 193.681 165.824 201.728" fill="none" strokeWidth="5" stroke="#16697a" strokeLinecap="round" strokeMiterlimit="10" />
	                </svg>
	              </div>
	              {/* Top-right SVG */}
	              <div className="hidden lg:block absolute pointer-events-none" style={{ top: '-100px', right: '-100px' }}>
	                <svg xmlns="http://www.w3.org/2000/svg" width="140" height="143" fill="none" style={{ transform: 'rotate(30deg)' }}>
	                  <path d="M 2.682 47.102 C 6.188 55.533 13.384 74.817 14.123 84.51 M 93.775 2.678 C 85.775 26.263 68.253 76.519 62.171 88.862 M 112.568 111.508 C 127.119 95.424 159.092 61.82 170.565 56.074 M 137.669 150.355 C 149.514 147.171 178.122 140.202 197.788 137.796 M 135.299 189.381 C 141.147 190.144 155.439 193.681 165.824 201.728" fill="none" strokeWidth="5" stroke="#16697a" strokeLinecap="round" strokeMiterlimit="10" />
	                </svg>
	              </div>
	              <h1
	                ref={titleRef}
	                className="text-5xl lg:text-7xl font-bold uppercase mb-6 font-portion"
                    style={{ color: '#16697a', letterSpacing: '-0.02em' }}
	              >
	                {chars.map((ch, i) => (
	                  <span
	                    key={i}
	                    style={{
	                      display: 'inline-block',
	                      transform: visible ? 'translateX(0)' : 'translateX(40px)',
	                      opacity: visible ? 1 : 0,
	                      transition: 'transform 600ms ease, opacity 600ms ease',
	                      transitionDelay: `${i * 0.1}s`
	                    }}
	                  >
	                    {ch}
	                  </span>
	                ))}
	              </h1>
	            </div>
	          )
	        })()}
	        {(() => {
	          const [visible, setVisible] = ((): [boolean, (v: boolean) => void] => {
	            const [v, sv] = useState(false)
	            return [v, sv]
	          })()
	          const subRef = useRef<HTMLHeadingElement>(null)

	          useEffect(() => {
	            const el = subRef.current
	            if (!el) return
	            const obs = new IntersectionObserver(
	              ([entry]) => {
	                if (entry.isIntersecting) {
	                  setVisible(true)
	                  obs.disconnect()
	                }
	              },
	              { threshold: 0.2 }
	            )
	            obs.observe(el)
	            return () => obs.disconnect()
	          }, [])

	          useEffect(() => {
	            if (!visible) return
	            const totalMs = (0.8 + 0.12 * 3) * 1000 + 600 + 100
	            const t = setTimeout(() => setSubtitleDone(true), totalMs)
	            return () => clearTimeout(t)
	          }, [visible])

	          const words = 'Settle up in seconds.'.split(' ')
	          const baseDelay = 0.8
	          return (
	            <h2
	                ref={subRef}
	                className="text-2xl lg:text-3xl font-bold mb-8"
                    style={{ color: '#489FB5', perspective: '800px' }}
	            >
	              {words.map((w, i) => (
	                <span key={i} style={{ display: 'inline-block', marginRight: i < words.length - 1 ? '0.2em' : 0 }}>
	                  <span
	                    style={{
	                      display: 'inline-block',
	                      transform: visible ? 'rotateX(0deg)' : 'rotateX(90deg)',
	                      transformOrigin: '50% 50%',
	                      opacity: visible ? 1 : 0,
	                      transition: 'transform 600ms ease, opacity 600ms ease',
	                      transitionDelay: `${baseDelay + i * 0.12}s`,
	                      willChange: 'transform, opacity'
	                    }}
	                  >
	                    {w}
	                  </span>
	                </span>
	              ))}
	            </h2>
	          )
	        })()}

	        {(() => {
	          useEffect(() => {
	            if (titleDone && subtitleDone) setShowHeroImage(true)
	          }, [titleDone, subtitleDone])
	          return null
	        })()}
	          <div className="flex flex-col sm:flex-row gap-3 justify-center">
	          <button
	            className="rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 cursor-pointer"
	            style={{
	              backgroundColor: '#FFA62B',
	              color: 'white'
	            }}
	          >
	            Coming Soon
	          </button>
	          <div className="inline-block pr-4">
	          	<Link
	            to="/blog"
	            className="rounded-full px-6 py-3 text-sm font-semibold cursor-pointer inline-flex items-center relative overflow-hidden"
	            style={{
	              backgroundColor: '#EDE7E3',
	              color: '#16697a',
	              paddingRight: hoveredButton === 'dev-blog' ? '2.5rem' : '1.5rem',
	              transition: 'padding-right 0.4s ease'
	            }}
	            onMouseEnter={() => setHoveredButton('dev-blog')}
	            onMouseLeave={() => setHoveredButton(null)}
	          >
	            Dev Blog
	            <span 
	              style={{ 
	                color: '#FFA62B',
	                opacity: hoveredButton === 'dev-blog' ? 1 : 0,
	                transform: hoveredButton === 'dev-blog' ? 'translateX(0)' : 'translateX(-10px)',
	                transition: 'opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s',
	                position: 'absolute',
	                right: '0.5rem'
	              }}
	            >
	              →
	            </span>
	          </Link>
	          </div>
	        </div>
	      </div>

	      <img
	        src="/hero_image_1.png"
	        alt="Hero"
	        className="absolute hidden lg:block"
	        style={{
	          left: '37%',
	          bottom: 0,
	          width: 'min(42vw, 600px)',
	          opacity: showHeroImage ? 1 : 0,
	          transform: showHeroImage ? 'translate(-50%, 24px)' : 'translate(-50%, 48px)',
	          transition: 'opacity 600ms ease, transform 600ms ease',
	          pointerEvents: 'none'
	        }}
	      />

	      <div className="relative h-[700px] md:h-[500px] lg:h-[700px]">
	        {/* Desktop: marquee ticker */}
	        <div
	            className="relative w-full h-full overflow-hidden rounded-3xl ticker-mask"
            style={{
            WebkitMaskImage:
                'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,0) 100%)',
            maskImage:
                'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,0) 100%)',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskSize: '100% 100%',
            maskSize: '100% 100%',
            }}
        >
            {/* wrapper detects hover for pause */}
            <div className="ticker-wrapper absolute inset-0">
            <div
                className="ticker-track flex gap-8 h-full"
                style={{
                willChange: 'transform',
                }}
            >
                {[...screenshots, ...screenshots].map((img, idx) => (
                <div
                    key={idx}
                    className="flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center mx-4"
                    style={{
                    width: '315px',
                    height: '100%',
                    }}
                >
                    <img
                    src={img}
                    alt={`App screenshot ${idx}`}
                    className="max-h-full max-w-full object-contain"
                    />
                </div>
                ))}
            </div>
            </div>
        </div>
        </div>
    </div>
	    
            <style>{`
        /* Track animation: move -50% so the duplicated set continues seamlessly */
        .ticker-track {
        animation: ticker 28s linear infinite;
        /* ensure the browser knows total width: (tileWidth + gap) * count */
        width: calc((315px + 50px) * ${screenshots.length * 2});
        }

        /* pause when hovering the wrapper (this works reliably) */
        .ticker-wrapper:hover .ticker-track {
        animation-play-state: paused;
        }

        @keyframes ticker {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-50%);
        }
        }

        /* Make sure the animation is smooth on many devices */
        .ticker-track {
        transform-origin: 0 0;
        backface-visibility: hidden;
        -webkit-font-smoothing: antialiased;
        -webkit-backface-visibility: hidden;
        }
    `}</style>
	  </section>
	)
}
const ContentSection = () => {
	const [isHovered1, setIsHovered1] = useState(false)
	const [isHovered2, setIsHovered2] = useState(false)
	const [isHovered3, setIsHovered3] = useState(false)
	
	return (
	  <section className="py-14 md:py-20 relative" style={{ background: 'linear-gradient(to bottom, #EDE7E3 0%, rgba(237, 246, 249, 0.5) 100%)' }}>
	    {/* Side infinite-scrolling receipts (start after hero, end before footer) */}
	    <div className="hidden lg:block pointer-events-none absolute inset-y-0 left-0 w-[240px]">
	      <div className="h-full overflow-hidden">
	        <div className="receipt-scroll h-[200%]" style={{ backgroundImage: 'url(/receipt.png)', backgroundRepeat: 'repeat-y', backgroundSize: '100% auto', backgroundPosition: 'center top', opacity: 1 }} />
	      </div>
	    </div>
	    <div className="hidden lg:block pointer-events-none absolute inset-y-0 right-0 w-[240px]">
	      <div className="h-full overflow-hidden">
	        <div className="receipt-scroll h-[200%]" style={{ backgroundImage: 'url(/receipt.png)', backgroundRepeat: 'repeat-y', backgroundSize: '100% auto', backgroundPosition: 'center top', opacity: 1 }} />
	      </div>
	    </div>

	    <div className="max-w-[1200px] mx-auto px-5 md:px-8">
	      <div className="flex flex-col md:flex-row md:h-[600px] relative">

	        
	        <div 
	          className="rounded-[20px] w-full p-6 md:p-10 md:pl-32 transition-colors duration-300 flex flex-col justify-center cursor-default relative"
	          style={{ 
	            background: isHovered1 ? '#FFA62B' : 'linear-gradient(to bottom, #EDE7E3 0%, rgba(237, 246, 249, 0.5) 100%)' 
	          }}
	          onMouseEnter={() => setIsHovered1(true)}
	          onMouseLeave={() => setIsHovered1(false)}
	        >
	          <div className="hidden md:block absolute top-4 left-4 pointer-events-none" style={{ top: '100px', left: '100px', opacity: isHovered1 ? 1 : 0, transition: 'opacity 300ms ease' }}>
	            <svg xmlns="http://www.w3.org/2000/svg" width="121" height="77" fill="none" style={{ transform: 'rotate(-15deg)' }}>
	              <path d="M 116.242 9.284 C 117.456 10.618 117.76 11.814 117.788 13.476 C 117.884 19.126 112.48 23.786 109.19 27.525 C 104.717 32.608 101.723 38.841 97.262 43.911 C 92.22 49.639 87.454 55.621 82.402 61.361 C 80.548 63.468 78.439 65.298 76.59 67.399 C 75.81 68.285 74.397 69.734 73.113 69.902 C 68.86 70.46 65.149 73.042 60.84 73.652 C 59.074 73.902 54.561 75.059 53.92 72.484 C 53.575 71.102 54.074 69.534 53.748 68.148 C 53.6 67.518 53.67 65.46 53.863 64.901 C 54.537 62.957 54.232 60.488 54.731 58.377 C 55.291 56.007 56.682 54.798 57.973 52.837 C 60.073 49.647 62.314 46.505 64.51 43.3 C 66.422 40.51 68.264 37.777 70.504 35.232 C 72.99 32.406 74.901 29.102 77.378 26.288 C 81.508 21.596 85.977 17.415 90.428 13.032 C 92.722 10.775 95.506 9.089 97.61 6.698 C 99.62 4.414 101.568 2.582 105.178 3.511 C 107.305 4.058 109.028 4.778 111.104 5.525 C 112.774 6.126 114.409 8.089 115.769 9.287" fill="transparent" strokeWidth="5" stroke="#16697a" strokeLinecap="round" strokeMiterlimit="10" strokeDasharray="" />
	              <path d="M 110.89 21.9 C 105.358 17.738 97.652 15.982 94.978 9.392 M 77.414 66.463 C 74.884 64.585 71.356 63.535 68.559 62.049 C 66.295 60.845 63.769 58.94 61.846 57.247 C 60.619 56.168 59.066 53.736 58.48 52.292 M 54.319 67.556 C 54.872 67.556 55.269 67.998 55.805 68.165 C 57.156 68.587 58.14 69.125 59.362 69.797 C 59.685 69.975 61.706 71.217 61.092 71.612 C 59.622 72.558 57.394 72.44 55.744 72.806 C 54.028 73.188 55.094 70.831 55.415 70.187" fill="transparent" strokeWidth="5" stroke="#16697a" strokeLinecap="round" strokeMiterlimit="10" strokeDasharray="" />
	              <path d="M 3 69.03 C 5.545 67.421 8.02 65.205 10.866 64.159 C 13.555 63.171 16.709 62.713 19.553 63.189 C 23.013 63.771 25.245 65.881 27.466 68.425 C 28.263 69.338 29.112 70.192 29.969 71.049 C 30.66 71.741 31.405 72.721 32.317 73.142 C 33.08 73.494 33.89 72.606 34.464 72.227 C 36.435 70.921 38.511 69.881 40.829 69.36 C 43.407 68.782 45.921 68.685 48.164 70.296 C 49.499 71.255 50.799 72.332 52.228 73.149 C 53.113 73.655 54.89 72.711 55.686 72.179" fill="transparent" strokeWidth="5" stroke="#4F4F4F" strokeLinecap="round" strokeMiterlimit="10" strokeDasharray="" />
	            </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="150" height="150" style={{ transform: 'translate(200px, 200px) rotate(15deg)', transformOrigin: '50% 50%' }}>
                    {/*<!-- Camera body -->*/}
                    <rect x="64" y="128" width="384" height="256" rx="40" ry="40"
                            fill="none" stroke="#16697a" stroke-width="14" stroke-linejoin="round"/>

                    {/*<!-- Top bump -->*/}
                    <path style={{ transform: 'scaleY(-1)', transformOrigin: '25% 25%' }} d="M192 128 h128 c8 0 16 8 16 16 v16 h-160 v-16 c0 -8 8 -16 16 -16z"
                            fill="none" stroke="#16697a" stroke-width="14" stroke-linejoin="round"/>

                    {/*<!-- Lens -->*/}
                    <circle cx="256" cy="256" r="72" fill="none" stroke="#4F4F4F" stroke-width="14"/>

                    {/*<!-- Small circle (viewfinder) -->*/}
                    <circle cx="144" cy="192" r="10" fill="#4F4F4F"/>
                    </svg>
	          </div>
	          <h3 className="mb-4" style={{ 
	            fontFamily: 'Inter',
	            fontWeight: 700,
	            color: '#006D77',
	            fontSize: '32px',
	            letterSpacing: '-0.03em',
	            lineHeight: '1em',
	            textAlign: 'left'
	          }}>
	            Snap & split.
	          </h3>
	          <p style={{ 
	            fontFamily: 'Inter',
	            fontWeight: 500,
	            color: '#4F4F4F',
	            fontSize: '22px',
	            letterSpacing: '-0.01em',
	            lineHeight: '1.2em',
	            textAlign: 'left'
	          }}>
	            Take a photo of your<br />
	            receipt - no manual entry<br />
	            needed. Quick and easy.
	          </p>
	        </div>

	        
	        {/* Mobile image (flow) */}
	        <div className="block md:hidden w-full h-64 mt-4 bg-white overflow-hidden rounded-[20px]">
	        	<img src="/img_1.jpg" alt="App screenshot" className="w-full h-full object-cover" />
	        </div>
	        {/* Desktop image (absolute with hover width) */}
	        <div className="hidden md:block absolute right-0 top-0 h-full bg-white overflow-hidden rounded-[20px] z-10 transition-all duration-500"
	          style={{ width: isHovered1 ? '45%' : '50%' }}>
	          <img src="/img_1.jpg" alt="App screenshot" className="w-full h-full object-cover" />
	        </div>

	      </div>

	      
	      <div className="flex flex-col md:flex-row md:h-[600px] mt-0 relative">

	        
	        <div 
	          className="rounded-[20px] w-full p-6 md:p-10 transition-colors duration-300 flex flex-col justify-center cursor-default relative"
	          style={{ 
	            background: isHovered2 ? '#FFA62B' : 'linear-gradient(to bottom, #EDE7E3 0%, rgba(237, 246, 249, 0.5) 100%)' 
	          }}
	          onMouseEnter={() => setIsHovered2(true)}
	          onMouseLeave={() => setIsHovered2(false)}
	        >
	          {/* Hover-only SVG, mirrored position to row 1 (top-right) */}
	          <div className="hidden md:block absolute pointer-events-none" style={{ top: '100px', right: '100px', opacity: isHovered2 ? 1 : 0, transition: 'opacity 300ms ease' }}>
	            <svg xmlns="http://www.w3.org/2000/svg" width="126" height="138" fill="none" style={{ transform: 'rotate(15deg)' }}>
	              <path d="M 41.415 66.638 C 41.415 67.654 41.122 69.39 42.621 69.39 C 43.635 69.39 45.145 68.037 45.203 66.982 C 45.265 65.875 45.041 64.574 43.654 64.574 C 42.904 64.574 41.057 64.256 40.726 64.918 M 76.202 63.541 C 76.202 65.768 75.913 67.317 78.767 66.561 C 80.82 66.019 83.436 64.364 83.436 61.993 C 83.436 59.224 81.101 59.413 78.958 59.413 C 76.889 59.413 77.58 61.96 77.58 63.541 M 24.537 86.593 C 30.682 92.172 36.278 98.044 44.209 101.158 C 49.42 103.205 55.301 102.764 60.779 102.764 C 67.156 102.764 72.485 100.923 77.963 97.68 C 88.004 91.734 98.735 83.23 104.522 72.87 C 106.994 68.444 107.62 64.203 108.579 59.413" fill="transparent" strokeWidth="5" stroke="#16697a" strokeLinecap="round" strokeMiterlimit="10" strokeDasharray="" />
	              <path d="M 47.084 36.922 C 35.57 36.922 28.438 39.099 19.85 47.626 C 9.976 57.432 4.786 69.445 3.23 83.019 C 1.745 95.976 2.049 107.71 11.267 117.63 C 25.85 133.321 50.781 136.794 71.119 134.896 C 88.897 133.236 107.063 122.271 115.52 106.105 C 125.151 87.696 125.797 62.476 118.563 43.251 C 114.57 32.64 107.572 23.551 99.055 16.14 C 89.728 8.025 78.284 5.146 66.241 3.639 C 49.826 1.585 32.285 2.176 17.588 10.202" fill="transparent" strokeWidth="5" stroke="#16697a" strokeLinecap="round" strokeMiterlimit="10" strokeDasharray="" />
	            </svg>
	          </div>
	          {/* Additional small accent for row 2 (mirrored) */}
	          <div className="hidden md:block absolute pointer-events-none" style={{ top: '40px', right: '220px', opacity: isHovered2 ? 1 : 0, transition: 'opacity 300ms ease' }}>
	            <svg xmlns="http://www.w3.org/2000/svg" width="34.999" height="65" fill="none" overflow="visible" style={{ transform: 'scaleX(-1)' }}>
	              <path d="M 23.415 53.557 C 21.554 53.557 21.231 52.241 19.91 51.127 C 15.848 47.7 12.387 42.961 9.585 38.487 C 5.75 32.365 2.13 25.618 0.503 18.557 C -0.157 15.687 -0.138 11.043 0.39 8.16 C 1.162 3.95 3.91 8.579 5.1 9.507 C 9.837 13.2 13.035 21.376 14.635 26.932 C 15.232 29.008 16.632 30.416 16.632 27.157 C 16.632 21.515 17.946 17.476 20.551 12.498 C 21.928 9.866 29.854 -4.991 33.439 1.728 C 35.439 5.479 34.946 9.74 34.946 14.181 C 34.946 23.526 30.937 32.306 28.126 41.142 C 26.376 46.64 24.538 52.384 22.058 57.596 C 21.372 59.037 20.455 64.449 19.345 65" fill="transparent" strokeWidth="5" stroke="#16697a" strokeLinecap="round" strokeMiterlimit="10" strokeDasharray="" />
	            </svg>
	          </div>
	          <div className="md:ml-auto md:pr-32">
	            <h3 className="mb-4" style={{ 
	              fontFamily: 'Inter',
	              fontWeight: 700,
	              color: '#006D77',
	              fontSize: '32px',
	              letterSpacing: '-0.03em',
	              lineHeight: '1em',
	              textAlign: 'left'
	            }}>
	              Real-time<br />
	              collaboration.
	            </h3>
	            <p style={{ 
	              fontFamily: 'Inter',
	              fontWeight: 500,
	              color: '#4F4F4F',
	              fontSize: '22px',
	              letterSpacing: '-0.01em',
	              lineHeight: '1.2em',
	              textAlign: 'left'
	            }}>
	              Invite friends and claim items<br />
	              together - all in one place.
	            </p>
	          </div>
	        </div>

	        
	        {/* Mobile image (flow) */}
	        <div className="block md:hidden w-full h-64 mt-4 bg-white overflow-hidden rounded-[20px]">
	        	<img src="/img_2.png" alt="App screenshot" className="w-full h-full object-cover" />
	        </div>
	        {/* Desktop image (absolute with hover width) */}
	        <div className="hidden md:block absolute left-0 top-0 h-full bg-white overflow-hidden rounded-[20px] z-10 transition-all duration-500"
	          style={{ width: isHovered2 ? '45%' : '50%' }}>
	          <img src="/img_2.png" alt="App screenshot" className="w-full h-full object-cover" />
	        </div>

	      </div>

	      
	      <div className="flex flex-col md:flex-row md:h-[600px] mt-0 relative">

	        
	        <div 
	          className="rounded-[20px] w-full p-6 md:p-10 md:pl-32 transition-colors duration-300 flex flex-col justify-center cursor-default relative"
	          style={{ 
	            background: isHovered3 ? '#FFA62B' : 'linear-gradient(to bottom, #EDE7E3 0%, rgba(237, 246, 249, 0.5) 100%)' 
	          }}
	          onMouseEnter={() => setIsHovered3(true)}
	          onMouseLeave={() => setIsHovered3(false)}
	        >
	          {/* Hover-only SVG for row 3, mirrored position like row 1 (top-left) */}
	          <div className="hidden md:block absolute pointer-events-none" style={{ top: '100px', left: '300px', opacity: isHovered3 ? 1 : 0, transition: 'opacity 300ms ease' }}>
	            <svg xmlns="http://www.w3.org/2000/svg" width="141" height="149" fill="none">
	              <path d="M 26.981 61.83 L 26.981 74.677 M 44.538 50.696 L 53.103 50.696 M 26.124 33.995 C 27.044 33.88 26.553 28.914 26.553 28 M 3 49.412 L 15.847 49.412 M 18.416 39.562 C 17.65 39.562 15.799 37.754 15.419 36.992 M 39.828 39.562 C 42.301 39.562 42.631 37.946 44.538 36.992 M 39.828 59.69 C 39.954 60.701 43.944 63.889 44.966 64.4 M 15.418 61.402 C 12.318 61.402 11.383 64.062 8.995 65.256" fill="transparent" strokeWidth="5" stroke="#16697a" strokeLinecap="round" strokeMiterlimit="10" strokeDasharray="" />
	              <path d="M 56.298 4.906 C 54.463 4.677 54.879 3.61 53.014 4.853 C 52.862 4.955 53.95 4.924 54.179 4.694 C 55.049 3.826 53.976 3.269 53.439 3" fill="transparent" strokeWidth="5" stroke="#16697a" strokeLinecap="round" strokeMiterlimit="10" strokeDasharray="" />
	              <path d="M 137.883 116.201 C 136.573 114.891 132.496 111.729 130.469 113.553 C 128.841 115.019 131.876 117.73 133.117 115.247" fill="transparent" strokeWidth="5" stroke="#16697a" strokeLinecap="round" strokeMiterlimit="10" strokeDasharray="" />
	              <g transform="translate(62 86)"><path d="M 0.764 29.002 C 1.394 29.002 2.048 29.054 2.674 28.988 C 3.821 28.867 4.544 27.587 5.404 26.965 C 7.914 25.148 9.082 22.544 10.568 19.961 C 12.561 16.5 12.733 12.759 12.733 8.884 L 12.733 4.809 C 12.733 3.699 12.223 2.694 12.223 1.626 C 12.223 0.888 11.969 -1.052 11.969 0.735 L 11.969 11.925 C 11.969 13.81 12.667 15.622 12.733 17.486 C 12.832 20.247 14.349 23.742 16.298 25.691 C 17.118 26.512 17.616 27.518 18.463 28.365 C 19.27 29.172 20.239 29.769 21.25 30.218 C 23.249 31.107 25.843 30.784 28.012 30.784" fill="transparent" strokeWidth="5" stroke="#16697a" strokeLinecap="round" strokeMiterlimit="10" strokeDasharray="" /><path d="M 0 29.766 C 1.07 29.766 1.87 29.702 2.801 30.218 C 3.61 30.668 4.294 31.85 4.838 32.624 C 7.088 35.82 8.835 38.744 9.691 42.598 C 10.598 46.679 10.951 50.832 10.951 55.033 L 10.951 59.815 C 10.951 61.108 11.087 59.616 11.191 59.15 C 11.637 57.141 11.491 55.033 12.111 52.996 C 12.814 50.683 13.211 48.098 14.261 45.922 C 15.775 42.785 16.601 39.458 18.59 36.585 C 19.977 34.581 21.049 33.11 23.556 32.553 C 24.459 32.352 25.405 31.803 26.343 31.803 L 28.267 31.803" fill="transparent" strokeWidth="5" stroke="#16697a" strokeLinecap="round" strokeMiterlimit="10" strokeDasharray="" /></g>
	              <g transform="translate(108 27.327)"><path d="M 0 21.025 C 3.968 21.025 6.133 26.782 6.947 30.037 C 7.593 32.621 7.328 35.382 7.784 38.006 C 7.913 38.746 8.023 39.701 8.023 40.441 C 8.023 40.835 8.219 42.131 8.219 41.082 C 8.219 38.345 8.843 35.779 9.871 33.255 C 10.92 30.681 12.557 28.454 14.089 26.156 C 15.899 23.441 18.466 22.982 21.525 22.982" fill="transparent" strokeWidth="5" stroke="#16697a" strokeLinecap="round" strokeMiterlimit="10" strokeDasharray="" /><path d="M 1.565 20.242 C 3.131 20.242 5.004 20.717 6.164 19.557 C 7.001 18.72 7.394 17.444 7.827 16.372 C 8.557 14.566 9.211 12.947 9.686 11.045 C 10.141 9.226 10.204 7.311 10.469 5.457 C 10.689 3.913 10.958 2.385 10.958 0.826 L 10.958 0 C 10.958 1.324 11.355 2.694 11.545 4 C 12.222 8.658 12.735 14.396 15.361 18.48 C 15.945 19.39 20.232 22.531 21.5 22.673" fill="transparent" strokeWidth="5" stroke="#16697a" strokeLinecap="round" strokeMiterlimit="10" strokeDasharray="" /></g>
	            </svg>
	          </div>
	          <h3 className="mb-3 md:mb-4" style={{ 
	            fontFamily: 'Inter',
	            fontWeight: 700,
	            color: '#006D77',
	            fontSize: '28px',
	            letterSpacing: '-0.03em',
	            lineHeight: '1em',
	            textAlign: 'left'
	          }}>
	            Save Time.
	          </h3>
	          <p style={{ 
	            fontFamily: 'Inter',
	            fontWeight: 500,
	            color: '#4F4F4F',
	            fontSize: '18px',
	            letterSpacing: '-0.01em',
	            lineHeight: '1.2em',
	            textAlign: 'left'
	          }}>
	            Taxes, tips, and totals are<br />
	            calculated for you, so you<br />
	            never waste a minute.
	          </p>
	        </div>

	        
	        {/* Mobile image (flow) */}
	        <div className="block md:hidden w-full h-64 mt-4 bg-white overflow-hidden rounded-[20px]">
	        	<img src="/img_3.jpg" alt="App screenshot" className="w-full h-full object-cover" />
	        </div>
	        {/* Desktop image (absolute with hover width) */}
	        <div className="hidden md:block absolute right-0 top-0 h-full bg-white overflow-hidden rounded-[20px] z-10 transition-all duration-500"
	          style={{ width: isHovered3 ? '45%' : '50%' }}>
	          <img src="/img_3.jpg" alt="App screenshot" className="w-full h-full object-cover" />
	        </div>

	      </div>
	    </div>

	    <style>{`
	      @keyframes receiptScroll {
	        0% { transform: translateY(0); }
	        100% { transform: translateY(-50%); }
	      }
	      .receipt-scroll { animation: receiptScroll 24s linear infinite; }
	    `}</style>
	  </section>
	)
}
const Footer = () => {
	return (
	  <div className="h-[300px] relative" style={{ backgroundColor: 'rgba(130, 192, 204, 0.25)' }}>
	    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[960px] w-full px-8">
	      <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 border-t border-gray-300/30 pt-24">

	        
	        <span className="logo-p opacity-15" style={{ fontSize: '24px' }}>P</span>

	        
	        <div className="flex-1 h-[100px] hidden md:block" />

	        
	        <div className="flex flex-col gap-2">
	          <div className="text-[15px] leading-[1em] text-black"> </div>
	          <div className="text-[15px] leading-[1em] text-gray-500"> </div>
	          <div className="text-[15px] leading-[1em] text-gray-500"> </div>
	          <div className="text-[15px] leading-[1em] text-gray-500"> </div>
	        </div>

	        
	        <div className="flex flex-col gap-2">
	          <div className="text-[15px] leading-[1em] text-black"> </div>
	          <div className="text-[15px] leading-[1em] text-gray-500"> </div>
	          <div className="text-[15px] leading-[1em] text-gray-500"> </div>
	          <div className="text-[15px] leading-[1em] text-gray-500">
	            © 2025 Portion. All rights reserved.
	          </div>
	        </div>
	      </div>
	    </div>
	  </div>
	)
}
function App() {
	return (
	  <div className="min-h-screen bg-white">
	    <Navigation />
	    <Hero />
	    <ContentSection />
	    <TechStackSection />
	    <Footer />
	  </div>
	)
}

export default App;

// Tech logos carousel section (between content and footer)
const TechStackSection = () => {
	const logos = [
		{ element: <img src="https://cdn.simpleicons.org/supabase" alt="Supabase" className="max-h-[40px] w-auto" />, label: 'Supabase' },
		{ element: <img src="https://cdn.simpleicons.org/flutter" alt="Flutter" className="max-h-[40px] w-auto" />, label: 'Flutter' },
		{ element: <img src="https://cdn.simpleicons.org/googlecloud" alt="Google Cloud" className="max-h-[40px] w-auto" />, label: 'Google Cloud' },
		{ element: <img src="https://cdn.simpleicons.org/postgresql" alt="Postgres" className="max-h-[40px] w-auto" />, label: 'Postgres' },
		{ element: (
			<svg width="365" height="258" viewBox="0 0 365 258" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: '40px', width: 'auto' }}>
				<g id="Mistral AI Logo">
					<path d="M104.107 0H52.0525V51.57H104.107V0Z" fill="#FFD800"/>
					<path d="M312.351 0H260.296V51.57H312.351V0Z" fill="#FFD800"/>
					<path d="M156.161 51.5701H52.0525V103.14H156.161V51.5701Z" fill="#FFAF00"/>
					<path d="M312.353 51.5701H208.244V103.14H312.353V51.5701Z" fill="#FFAF00"/>
					<path d="M312.356 103.14H52.0525V154.71H312.356V103.14Z" fill="#FF8205"/>
					<path d="M104.107 154.71H52.0525V206.28H104.107V154.71Z" fill="#FA500F"/>
					<path d="M208.228 154.711H156.174V206.281H208.228V154.711Z" fill="#FA500F"/>
					<path d="M312.351 154.711H260.296V206.281H312.351V154.711Z" fill="#FA500F"/>
					<path d="M156.195 206.312H0V257.882H156.195V206.312Z" fill="#E10500"/>
					<path d="M364.439 206.312H208.244V257.882H364.439V206.312Z" fill="#E10500"/>
				</g>
			</svg>
		), label: 'Mistral OCR' },
		{ element: <img src="https://cdn.simpleicons.org/express" alt="Express" className="max-h-[40px] w-auto" />, label: 'Express' },
		{ element: <img src="https://cdn.simpleicons.org/typescript" alt="TypeScript" className="max-h-[40px] w-auto" />, label: 'TypeScript' }
	]

	const [visible, setVisible] = useState(false)
	const [armsVisible, setArmsVisible] = useState(false)
	const titleRef = useRef<HTMLDivElement>(null)
	const armsRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const el = titleRef.current
		if (!el) return
		const obs = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setVisible(true)
				obs.disconnect()
			}
		}, { threshold: 0.2 })
		obs.observe(el)
		return () => obs.disconnect()
	}, [])

	useEffect(() => {
		const el = armsRef.current
		if (!el) return
		const obs = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setArmsVisible(true)
				obs.disconnect()
			}
		}, { threshold: 0.2 })
		obs.observe(el)
		return () => obs.disconnect()
	}, [])

	return (
		<section className="py-14 relative overflow-hidden" style={{ backgroundColor: '#fff' }}>
			<div className="max-w-[1200px] mx-auto px-8">
				<div ref={titleRef} className="text-center mb-6">
					<div className="text-[#16697a] font-semibold tracking-[-0.01em]" style={{ fontFamily: 'Inter', fontSize: '18px', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(8px)', transition: 'opacity 500ms ease, transform 500ms ease' }}>
						Our Tech Stack
					</div>
				</div>
				<div ref={armsRef} className="relative h-[90px] rounded-2xl overflow-hidden">
					{/* edge mask for soft fade */}
					<div className="absolute inset-0 pointer-events-none" style={{
						background: 'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 12%, rgba(255,255,255,0) 88%, rgba(255,255,255,1) 100%)', zIndex: 10
					}} />
					<div className="logos-wrapper absolute inset-0">
						<div className="logos-track flex gap-16 items-center h-full" style={{ willChange: 'transform', width: 'max-content', whiteSpace: 'nowrap' }}>
							{[...logos, ...logos, ...logos].map((l, idx) => (
								<div key={idx} className="flex-shrink-0 flex items-center justify-center gap-3" style={{ width: '240px', height: '100%' }}>
									{l.element}
									<span className="text-sm font-medium select-none" style={{ color: '#16697a', fontFamily: 'Inter', cursor: 'default', userSelect: 'none' }}>{l.label}</span>
								</div>
							))}
						</div>
					</div>
				</div>
				{/* Slide-in wrappers so rotation on images stays intact; animate only when in view */}
				<div className={`absolute pointer-events-none select-none hidden sm:block ${armsVisible ? 'arm-slide-left' : ''}`} style={{ top: '50%', left: '0%', zIndex: 11, opacity: armsVisible ? 1 : 0, transform: armsVisible ? 'translate(-220px, -50%)' : 'translate(-16px, -50%)', ['--armX' as any]: '-220px' }}>
					<img src="/finger_pointing.png" alt="Pointer left" style={{ height: '820px', transform: 'translateY(-9%) rotate(-70deg) scaleY(-1)' }} />
				</div>
				<div className={`absolute pointer-events-none select-none hidden sm:block ${armsVisible ? 'arm-slide-right' : ''}`} style={{ top: '50%', right: '0%', zIndex: 11, opacity: armsVisible ? 1 : 0, transform: armsVisible ? 'translate(220px, -50%)' : 'translate(16px, -50%)', ['--armX' as any]: '220px' }}>
					<img src="/finger_pointing.png" alt="Pointer right" style={{ height: '820px', transform: 'translateY(-9%) rotate(-110deg)' }} />
				</div>
			</div>
			<style>{`
				@keyframes logosTicker {
					0% { transform: translate3d(0,0,0); }
					100% { transform: translate3d(-33.333%,0,0); }
				}
				.logos-track { animation: logosTicker 26s linear infinite; }
				.logos-wrapper:hover .logos-track { animation-play-state: paused; }
			`}</style>
		</section>
	)
}