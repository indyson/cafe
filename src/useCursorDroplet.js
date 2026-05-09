import { useEffect, useRef } from 'react'
import * as anime from 'animejs'

export const useCursorDroplet = () => {
  const dropletRef = useRef(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const dropletPos = useRef({ x: 0, y: 0 })
  const animationRef = useRef(null)

  useEffect(() => {
    const droplet = dropletRef.current
    if (!droplet) return

    // Track mouse position
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    // Animate droplet to follow cursor smoothly
    const animate = () => {
      if (dropletRef.current) {
        anime.set(dropletRef.current, {
          left: mousePos.current.x - 6,
          top: mousePos.current.y - 6,
        })
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return dropletRef
}
