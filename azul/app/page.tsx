'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import ProductCard from '@/components/ProductCard'
import EcoCard from '@/components/EcoCard'
import WaveSVG from '@/components/WaveSVG'

// ─── Data ────────────────────────────────────────────────────────────────────

const PRODUCTS = [
  { name: 'Classic Wave Tee', category: 'Apparel', price: '$48' },
  { name: 'Shore Flip Flops', category: 'Flip Flops', price: '$64' },
  { name: 'Ocean Case', category: 'Phone Cases', price: '$32' },
  { name: 'Tide Tote', category: 'Bags', price: '$78' },
  { name: 'Horizon Hoodie', category: 'Apparel', price: '$98' },
  { name: 'Current Cap', category: 'Accessories', price: '$42' },
]

const ECO_COMMITMENTS = [
  {
    icon: '🌿',
    title: 'Organic Materials',
    description:
      'Every product is crafted from 100% GOTS-certified organic cotton and recycled ocean plastics.',
  },
  {
    icon: '📦',
    title: 'Zero Plastic Packaging',
    description:
      'All orders ship in compostable, plant-based packaging. Zero single-use plastic — ever.',
  },
  {
    icon: '✈️',
    title: 'Carbon Neutral Shipping',
    description:
      'We offset 110% of all shipping emissions through vetted reforestation and ocean projects.',
  },
  {
    icon: '🤝',
    title: 'Fair Trade Labor',
    description: 'Every maker is paid a living wage and works in safe, humane conditions. Always.',
  },
]

// ─── Reveal wrapper ───────────────────────────────────────────────────────────

function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 36 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  // Parallax: background grid drifts upward slightly as user scrolls
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen bg-royal flex flex-col items-center justify-center overflow-hidden"
        aria-label="Hero"
      >
        {/* Parallax dot-grid background */}
        <motion.div
          className="absolute inset-0 opacity-[0.07]"
          style={{ y: bgY }}
          aria-hidden="true"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
        </motion.div>

        {/* Radial vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(10,26,92,0.5) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* AZUL wordmark with shimmer */}
          <motion.h1
            className="shimmer-text font-serif tracking-widest uppercase leading-none"
            style={{ fontSize: 'clamp(3rem, 10vw, 7rem)' }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
            aria-label="AZUL"
          >
            AZUL
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="mt-6 text-white/75 text-base md:text-xl tracking-[0.18em] font-light italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.9 }}
          >
            wear the ocean. protect it too.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
          >
            <Link
              href="/shop"
              className="btn-white border border-white text-white text-xs tracking-widest uppercase rounded px-9 py-3.5"
              aria-label="Shop the collection"
            >
              <span className="btn-text">Shop the Collection</span>
            </Link>
            <Link
              href="/story"
              className="text-white/55 text-xs tracking-widest uppercase hover:text-white transition-colors py-3.5"
            >
              Our Story →
            </Link>
          </motion.div>
        </div>

        {/* Animated wave at bottom */}
        <WaveSVG fill="#F5F5F0" />
      </section>

      {/* ── THE COLLECTION ───────────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-off-white" id="collection" aria-label="The Collection">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-royal text-[10px] tracking-widest uppercase mb-3 font-semibold">
              Explore
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-deep-blue tracking-wide">
              The Collection
            </h2>
            <p className="mt-4 text-gray-400 max-w-sm mx-auto text-sm">
              Every piece. One color. Infinite possibility.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((product, i) => (
              <FadeUp key={product.name} delay={i * 0.08}>
                <ProductCard {...product} />
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.2} className="text-center mt-14">
            <Link
              href="/shop"
              className="btn-royal inline-block border border-royal text-royal text-xs tracking-widest uppercase rounded px-10 py-3.5"
            >
              <span className="btn-text">View All Products</span>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── OUR PROMISE ──────────────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-white" aria-label="Our Promise">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-royal text-[10px] tracking-widest uppercase mb-3 font-semibold">
              Values
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-deep-blue tracking-wide">
              Our Promise
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ECO_COMMITMENTS.map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.12}>
                <EcoCard {...item} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── ONE COLOR. ONE PLANET. ────────────────────────────────────────── */}
      <section className="relative py-36 px-6 bg-royal overflow-hidden" aria-label="Manifesto">
        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          aria-hidden="true"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          <FadeUp>
            <h2 className="font-serif text-5xl md:text-7xl text-white tracking-wide leading-[1.1] mb-8">
              One Color.<br />One Planet.
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-white/65 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12">
              We chose royal blue — the color of deep oceans, clear skies, and this fragile planet
              we call home. Not for aesthetics alone, but as a constant reminder that everything
              we make must honor the world it comes from. AZUL is a commitment. A way of seeing.
              A single color that contains everything.
            </p>
          </FadeUp>

          <FadeUp delay={0.35}>
            <Link
              href="/sustainability"
              className="btn-white inline-block border border-white text-white text-xs tracking-widest uppercase rounded px-10 py-3.5"
            >
              <span className="btn-text">Our Impact →</span>
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
