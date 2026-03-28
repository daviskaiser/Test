'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedCounterProps {
  /** Final numeric value */
  value: number
  /** Optional prefix (e.g. "$") */
  prefix?: string
  /** Optional suffix (e.g. "%", "+") */
  suffix?: string
  /** Label shown below the number */
  label: string
  /** Animation duration in ms (default 2200) */
  duration?: number
}

/**
 * Counts up from 0 to `value` when scrolled into view.
 * Respects prefers-reduced-motion — shows final value immediately if set.
 */
export default function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  label,
  duration = 2200,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setCount(value)
      return
    }

    let frame: number
    const start = performance.now()

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * value))

      if (progress < 1) {
        frame = requestAnimationFrame(step)
      }
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [isInView, value, duration])

  return (
    <div ref={ref} className="text-center">
      <p className="font-serif text-5xl md:text-6xl text-white mb-2 tabular-nums" aria-live="polite">
        {prefix}{count.toLocaleString()}{suffix}
      </p>
      <p className="text-white/55 text-xs tracking-widest uppercase">{label}</p>
    </div>
  )
}
