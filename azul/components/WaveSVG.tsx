'use client'

import { motion } from 'framer-motion'

interface WaveSVGProps {
  /** Fill color for the wave shape */
  fill?: string
  className?: string
}

/**
 * Animated wave SVG used at the bottom of full-bleed sections.
 * The wave morphs slowly between two paths using Framer Motion.
 */
export default function WaveSVG({ fill = '#F5F5F0', className = '' }: WaveSVGProps) {
  return (
    <div className={`absolute bottom-0 left-0 right-0 overflow-hidden leading-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1440 90"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full block"
        style={{ height: '90px' }}
        preserveAspectRatio="none"
      >
        <motion.path
          fill={fill}
          animate={{
            d: [
              'M0,45 C240,90 480,0 720,45 C960,90 1200,0 1440,45 L1440,90 L0,90 Z',
              'M0,25 C240,0 480,70 720,25 C960,0 1200,60 1440,25 L1440,90 L0,90 Z',
              'M0,45 C240,90 480,0 720,45 C960,90 1200,0 1440,45 L1440,90 L0,90 Z',
            ],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </svg>
    </div>
  )
}
