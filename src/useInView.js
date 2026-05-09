import { useEffect, useRef } from 'react'

export const useInView = (options = {}) => {
  const ref = useRef(null)
  const defaultOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -50px 0px',
    ...options,
  }

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Check if element is already in view on mount
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
          observer.unobserve(entry.target)
        }
      })
    }, defaultOptions)

    observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  return ref
}
