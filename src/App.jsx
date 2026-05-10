import { useEffect, useRef, useState } from 'react'
import './App.css'
import { useInView } from './useInView'
import { useCursorDroplet } from './useCursorDroplet'
import { useParallax } from './useParallax'
import { WelcomePage } from './WelcomePage'

const baseUrl = import.meta.env.BASE_URL

const menuItems = [
  {
    name: 'The Formula',
    description: 'Espresso, steamed oat milk, local honey.',
  },
  {
    name: 'Cold Logic',
    description: '18-hour slow drip over crystal ice.',
  },
  {
    name: 'Theory Foam',
    description: 'Double ristretto with silk-textured milk.',
  },
  {
    name: 'Midnight Clarity',
    description: 'Single-origin Kenyan pour-over with floral notes.',
  },
  {
    name: 'Equilibrium Blend',
    description: 'House blend with caramel body and clean finish.',
  },
]

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=1200',
    alt: 'Coffee beans on a table',
  },
  {
    src: `${baseUrl}breakslow-E6RTpqvOasU-unsplash.jpg`,
    alt: 'Minimal cafe interior',
  },
  {
    src: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=1200',
    alt: 'Freshly brewed drip coffee',
  },
]

function App() {
  const dropletRef = useCursorDroplet()
  const heroRef = useInView()
  const heroParallaxRef = useParallax(0.3)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [heroVisualStyle, setHeroVisualStyle] = useState({})
  const [menuHeadingStyle, setMenuHeadingStyle] = useState({})
  const heroH1Ref = useRef(null)
  const aboutRef = useInView()
  const aboutParallaxRef = useParallax(0.25)
  const menuRef = useInView()
  const menuHeadingRef = useRef(null)
  const galleryRef = useInView()
  const footerRef = useInView()
  const footerParallaxRef = useParallax(0.35)

  useEffect(() => {
    const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

    const handleScroll = () => {
      const isMobileViewport = window.innerWidth <= 640

      if (heroH1Ref.current) {
        const rect = heroH1Ref.current.getBoundingClientRect()
        if (isMobileViewport) {
          const start = window.innerHeight * 0.25
          const progress = clamp(1 - rect.top / start, 0, 1)
          setHeroVisualStyle({
            opacity: progress,
            transform: `translateY(${(1 - progress) * 64}px)`,
          })
        } else {
          setHeroVisualStyle({})
        }
      }

      if (menuHeadingRef.current) {
        const rect = menuHeadingRef.current.getBoundingClientRect()
        if (isMobileViewport) {
          const fadeStart = window.innerHeight * 0.32
          const fadeEnd = -menuHeadingRef.current.offsetHeight * 0.45
          const progress = clamp((fadeStart - rect.top) / (fadeStart - fadeEnd), 0, 1)
          setMenuHeadingStyle({
            opacity: 1 - progress,
            transform: `translateY(${-progress * 20}px)`,
          })
        } else {
          setMenuHeadingStyle({})
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <div className="page-shell">
      <div ref={dropletRef} className="cursor-droplet"></div>
      
      <WelcomePage />
      
      <nav className={`topbar ${mobileNavOpen ? 'nav-open' : ''}`}>
        <div className="brand">
          <img
            src={`${baseUrl}jocelyn-morales-JJeb7OHQ7a8-unsplash.jpg`}
            alt="Latte Theory logo"
            className="brand-mark"
          />
          <div>
            <p className="eyebrow">Latte Theory</p>
            <p className="brand-subtitle">Minimal brews, measured calmly</p>
          </div>
        </div>
        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileNavOpen}
          aria-controls="primary-navigation"
          onClick={() => setMobileNavOpen((isOpen) => !isOpen)}
        >
          <span />
          <span />
          <span />
        </button>
        <div id="primary-navigation" className={`nav-links ${mobileNavOpen ? 'is-open' : ''}`}>
          <a href="#about" onClick={() => setMobileNavOpen(false)}>Philosophy</a>
          <a href="#menu" onClick={() => setMobileNavOpen(false)}>Menu</a>
          <a href="#visit" onClick={() => setMobileNavOpen(false)}>Visit</a>
        </div>
      </nav>

      <main>
        <section className="hero-section" ref={heroRef}>
          <div className="hero-copy" ref={heroParallaxRef}>
            <p className="eyebrow">Coffee, calibrated</p>
            <h1 ref={heroH1Ref}>Where chemistry meets the morning cup.</h1>
            <p className="hero-text">
              Latte Theory treats every pour as a hypothesis and every sip as proof.
              Sustainably sourced beans, precise extraction, and a calm, minimal space
              keep the experience focused instead of crowded.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#menu">
                Explore the brew list
              </a>
              <a className="secondary-button" href="#visit">
                Plan a visit
              </a>
            </div>
          </div>

          <div className="hero-visual" style={heroVisualStyle}>
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1600"
              alt="Coffee being prepared in a warm cafe"
              className="hero-image"
            />
            <div className="hero-card">
              <p className="hero-card-label">Today’s focus</p>
              <p className="hero-card-title">Balanced extraction</p>
              <p className="hero-card-text">Soft acidity, creamy finish, clean aroma.</p>
            </div>
          </div>
        </section>

        <section id="about" className="about-section" ref={aboutRef}>
          <div className="about-copy" ref={aboutParallaxRef}>
            <p className="eyebrow">The methodology</p>
            <h2>Precision without the clutter.</h2>
            <p>
              We keep the room open, the palette restrained, and the layout breathable so
              the drinks and photography can breathe. The result is a page that feels
              intentional on desktop and remains easy to scan on smaller screens.
            </p>
          </div>

          <div className="about-panel">
            <div>
              <span className="metric">18h</span>
              <p>slow drip process for cold brew clarity</p>
            </div>
            <div>
              <span className="metric">03</span>
              <p>featured signatures with distinct profiles</p>
            </div>
            <div>
              <span className="metric">100%</span>
              <p>space planned around breathing room and flow</p>
            </div>
          </div>
        </section>

        <section id="menu" className="menu-section" ref={menuRef}>
          <div ref={menuHeadingRef} className="section-heading" style={menuHeadingStyle}>
            <p className="eyebrow">Featured experiments</p>
            <h2>Small menu, clear options.</h2>
          </div>

          <div className="menu-grid">
            {menuItems.map((item, index) => (
              <article
                key={item.name}
                className="menu-card"
                style={{ ['--i']: index }}
              >
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="gallery-section" aria-label="Cafe imagery" ref={galleryRef}>
          {galleryImages.map((image, index) => (
            <figure key={image.alt} className="gallery-item" style={{ ['--i']: index }}>
              <img src={image.src} alt={image.alt} loading="lazy" />
            </figure>
          ))}
        </section>
      </main>

      <footer id="visit" className="footer-section" ref={footerRef}>
        <div ref={footerParallaxRef}>
          <p className="eyebrow eyebrow-light">Visit the lab</p>
          <h2>123 Theoretical Lane, Brew City</h2>
          <p>Mon to Sun · 07:00 to 19:00</p>
        </div>

        <div className="footer-links">
          <a href="#">Instagram</a>
          <a href="#">Twitter</a>
        </div>
      </footer>
    </div>
  )
}

export default App

