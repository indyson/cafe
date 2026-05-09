import { useEffect, useRef } from 'react'
import * as anime from 'animejs'

export const WelcomePage = () => {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const scrollIndicatorRef = useRef(null)
  const scrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY
      
      // Parallax effect for title
      if (titleRef.current && scrollY.current < 800) {
        anime.set(titleRef.current, {
          translateY: scrollY.current * 0.5,
          opacity: Math.max(0, 1 - scrollY.current / 600),
        })
      }

      // Parallax effect for subtitle
      if (subtitleRef.current && scrollY.current < 800) {
        anime.set(subtitleRef.current, {
          translateY: scrollY.current * 0.3,
          opacity: Math.max(0, 1 - scrollY.current / 500),
        })
      }

      // Hide scroll indicator when scrolling
      if (scrollIndicatorRef.current) {
        anime.set(scrollIndicatorRef.current, {
          opacity: Math.max(0, 1 - scrollY.current / 300),
        })
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="welcome-page">
      <div className="welcome-content">
        <div ref={titleRef} className="welcome-title">
          <h1>Latte Theory</h1>
        </div>
        <div ref={subtitleRef} className="welcome-subtitle">
          <p>Where science meets serenity</p>
          <p className="welcome-tagline">Minimal brews, measured calmly</p>
        </div>
      </div>
      
      <div ref={scrollIndicatorRef} className="scroll-indicator">
        <span>Scroll to explore</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  )
}
