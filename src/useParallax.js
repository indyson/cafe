import { useEffect, useRef } from 'react'
import * as anime from 'animejs'

export const useParallax = (intensity = 0.5) => {
  const ref = useRef(null)
  const scrollY = useRef(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleScroll = () => {
      scrollY.current = window.scrollY
      const elementTop = element.getBoundingClientRect().top + window.scrollY
      const elementBottom = elementTop + element.offsetHeight
      const windowBottom = window.scrollY + window.innerHeight

      // Only apply parallax if element is in viewport
      if (windowBottom > elementTop && window.scrollY < elementBottom) {
        const distanceFromCenter = windowBottom - elementTop - window.innerHeight / 2
        anime.set(element, {
          translateY: distanceFromCenter * intensity,
        })
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Call once on mount

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [intensity])

  return ref
}
