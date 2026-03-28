'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface ProductCardProps {
  name: string
  category: string
  price?: string
}

/**
 * Product card with:
 * - 3D tilt on mouse move (max ±5°)
 * - Lift + scale on hover
 * - Shimmer sweep on hover
 * - #0000CC background, white text
 *
 * TODO: Replace placeholder div with <Image src={...} /> when product photos are ready
 */
export default function ProductCard({ name, category, price = '$—' }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [shimmerPos, setShimmerPos] = useState(-100)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5   // –0.5 → +0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    // rotateX responds to vertical mouse (flip sign for natural feel)
    setTilt({ x: ny * -5, y: nx * 5 })
  }

  const handleMouseEnter = () => {
    setHovered(true)
    setShimmerPos(-100)
    // Trigger shimmer sweep
    requestAnimationFrame(() => setShimmerPos(200))
  }

  const handleMouseLeave = () => {
    setHovered(false)
    setTilt({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        transformStyle: 'preserve-3d',
        transformOrigin: 'center center',
      }}
      animate={{
        y: hovered ? -10 : 0,
        scale: hovered ? 1.02 : 1,
        boxShadow: hovered
          ? '0 24px 60px rgba(0,0,204,0.25)'
          : '0 4px 12px rgba(0,0,0,0.06)',
      }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="bg-royal rounded-xl overflow-hidden"
      tabIndex={0}
      role="article"
      aria-label={`${name} — ${category}`}
    >
      {/* Placeholder product image */}
      <div className="aspect-square bg-royal relative overflow-hidden">
        {/* Subtle inner gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-black/20" />

        {/* "product" label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-white/20 text-xs tracking-widest font-mono select-none"
            aria-hidden="true"
          >
            [ product ]
          </span>
          {/* TODO: <Image src={product.image} alt={name} fill className="object-cover" /> */}
        </div>

        {/* Shimmer sweep */}
        <div
          className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
          style={{
            left: `${shimmerPos}%`,
            transition: hovered ? 'left 0.7s cubic-bezier(0.4,0,0.2,1)' : 'none',
          }}
        />

        {/* Category badge */}
        <span className="absolute top-3 left-3 text-[10px] tracking-widest text-white/50 uppercase font-medium bg-white/10 px-2 py-0.5 rounded-full">
          {category}
        </span>
      </div>

      {/* Card info */}
      <div className="px-4 py-4">
        <h3 className="text-white font-serif text-lg tracking-wide leading-snug">{name}</h3>
        <div className="flex items-center justify-between mt-1.5">
          <p className="text-white/60 text-sm">{price}</p>
          <span className="text-white/40 text-xs tracking-wider">→</span>
        </div>
      </div>
    </motion.div>
  )
}
