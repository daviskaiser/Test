'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from '@/components/ProductCard'

// ─── Data ────────────────────────────────────────────────────────────────────

const ALL_PRODUCTS = [
  // Apparel
  { name: 'Classic Wave Tee', category: 'Apparel', price: '$48' },
  { name: 'Shore Hoodie', category: 'Apparel', price: '$98' },
  { name: 'Tide Tank', category: 'Apparel', price: '$38' },
  { name: 'Horizon Shorts', category: 'Apparel', price: '$58' },
  { name: 'Drift Long-Sleeve', category: 'Apparel', price: '$62' },
  // Flip Flops
  { name: 'Shore Flip Flops', category: 'Flip Flops', price: '$64' },
  { name: 'Reef Slides', category: 'Flip Flops', price: '$54' },
  { name: 'Deep Current Sandal', category: 'Flip Flops', price: '$72' },
  // Phone Cases
  { name: 'Ocean Case Pro', category: 'Phone Cases', price: '$32' },
  { name: 'Wave Wallet Case', category: 'Phone Cases', price: '$28' },
  { name: 'Slim Shore Case', category: 'Phone Cases', price: '$24' },
  // Bags
  { name: 'Tide Tote', category: 'Bags', price: '$78' },
  { name: 'Current Backpack', category: 'Bags', price: '$128' },
  { name: 'Drift Duffle', category: 'Bags', price: '$148' },
  { name: 'Coastal Pouch', category: 'Bags', price: '$46' },
  // Accessories
  { name: 'Current Cap', category: 'Accessories', price: '$42' },
  { name: 'Blue Band', category: 'Accessories', price: '$18' },
  { name: 'Ocean Socks (3-pack)', category: 'Accessories', price: '$22' },
  { name: 'Azul Keychain', category: 'Accessories', price: '$14' },
  { name: 'Shore Belt', category: 'Accessories', price: '$36' },
]

const CATEGORIES = ['All', 'Apparel', 'Flip Flops', 'Phone Cases', 'Bags', 'Accessories']

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = useMemo(
    () =>
      activeCategory === 'All'
        ? ALL_PRODUCTS
        : ALL_PRODUCTS.filter((p) => p.category === activeCategory),
    [activeCategory]
  )

  return (
    <div className="min-h-screen bg-off-white">

      {/* Page header */}
      <div className="bg-royal pt-32 pb-24 px-6 text-center relative overflow-hidden">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          aria-hidden="true"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <motion.p
          className="relative text-white/40 text-[10px] tracking-widest uppercase mb-3 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Everything
        </motion.p>
        <motion.h1
          className="relative font-serif text-5xl md:text-7xl text-white tracking-widest leading-none"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          The Shop
        </motion.h1>
        <motion.p
          className="relative text-white/45 mt-5 text-sm tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          {ALL_PRODUCTS.length} products &mdash; one color.
        </motion.p>
      </div>

      {/* Sticky filter bar */}
      <div
        className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 px-6 py-4"
        role="navigation"
        aria-label="Filter products by category"
      >
        <div className="max-w-7xl mx-auto flex items-center gap-2 flex-wrap">
          <span className="text-[10px] tracking-widest text-gray-400 uppercase mr-2 shrink-0">
            Filter:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={`px-4 py-1.5 rounded-full text-xs tracking-wide transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-royal text-white shadow-sm shadow-royal/30'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}

          {/* Result count */}
          <span className="ml-auto text-xs text-gray-400 tabular-nums">
            {filtered.length} item{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Product grid */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <AnimatePresence mode="popLayout">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            layout
          >
            {filtered.map((product, i) => (
              <motion.div
                key={product.name}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.04, ease: 'easeOut' }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-gray-400 text-sm tracking-wide">
            No products in this category yet.
          </div>
        )}
      </div>
    </div>
  )
}
