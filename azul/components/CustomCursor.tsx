'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)

  // Main cursor — snappy
  const dotX = useMotionValue(0)
  const dotY = useMotionValue(0)

  // Trail cursor — springy, lags behind
  const trailX = useSpring(dotX, { stiffness: 90, damping: 18 })
  const trailY = useSpring(dotY, { stiffness: 90, damping: 18 })

  useEffect(() => {
    // Skip on touch devices or when user prefers reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (prefersReduced || isTouch) return

    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    const onMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      setHovering(!!el.closest('a, button, [role="button"], input, textarea, select, label'))
    }

    const onDown = () => setClicking(true)
    const onUp = () => setClicking(false)

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
    }
  }, [dotX, dotY, visible])

  if (!visible) return null

  return (
    <>
      {/* Trail ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-royal/50"
        style={{ x: trailX, y: trailY }}
        animate={{
          width: hovering ? 40 : 28,
          height: hovering ? 40 : 28,
          marginLeft: hovering ? -20 : -14,
          marginTop: hovering ? -20 : -14,
          opacity: clicking ? 0.4 : 0.7,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Main dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-royal"
        style={{ x: dotX, y: dotY }}
        animate={{
          width: clicking ? 3 : hovering ? 5 : 6,
          height: clicking ? 3 : hovering ? 5 : 6,
          marginLeft: clicking ? -1.5 : hovering ? -2.5 : -3,
          marginTop: clicking ? -1.5 : hovering ? -2.5 : -3,
          scale: clicking ? 0.7 : 1,
        }}
        transition={{ duration: 0.1 }}
      />
    </>
  )
}
