'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface EcoCardProps {
  icon: string
  title: string
  description: string
}

/**
 * Eco commitment card.
 * On hover: SVG border draws itself (stroke-dashoffset animation).
 * Uses Framer Motion for scroll reveal (applied via parent whileInView wrapper).
 */
export default function EcoCard({ icon, title, description }: EcoCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative p-8 bg-white rounded-xl overflow-hidden group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      role="article"
      aria-label={title}
    >
      {/* SVG border that draws on hover — viewBox uses % units, vectorEffect handles scaling */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.rect
          x="0.75"
          y="0.75"
          width="98.5"
          height="98.5"
          rx="6"
          fill="none"
          stroke="#0000CC"
          strokeWidth="1.5"
          strokeDasharray="400"
          vectorEffect="non-scaling-stroke"
          animate={{ strokeDashoffset: hovered ? 0 : 400 }}
          initial={{ strokeDashoffset: 400 }}
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
        />
      </svg>

      {/* Icon bubble */}
      <div
        className="w-12 h-12 rounded-full bg-royal/10 flex items-center justify-center mb-5 text-2xl"
        aria-hidden="true"
      >
        {icon}
      </div>

      {/* Text */}
      <h3 className="font-serif text-xl text-deep-blue tracking-wide mb-3">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>

      {/* Subtle corner accent that appears on hover */}
      <motion.div
        className="absolute top-0 right-0 w-8 h-8 overflow-hidden"
        aria-hidden="true"
      >
        <motion.div
          className="absolute top-0 right-0 w-full h-full bg-royal/8 origin-top-right"
          animate={{ scale: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ borderBottomLeftRadius: '100%' }}
        />
      </motion.div>
    </div>
  )
}
