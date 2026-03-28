'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import AnimatedCounter from '@/components/AnimatedCounter'

// ─── Data ────────────────────────────────────────────────────────────────────

const TIMELINE = [
  {
    year: '2021',
    title: 'Zero Plastic Pledge',
    description:
      'Day one: we committed to zero single-use plastic across our entire supply chain — packaging, shipping, and production.',
    icon: '📦',
    isFuture: false,
  },
  {
    year: '2022',
    title: 'Carbon Neutral Certified',
    description:
      'Achieved full carbon neutrality for all shipping operations, verified by Climate Neutral. We offset 110% of emissions.',
    icon: '🌍',
    isFuture: false,
  },
  {
    year: '2023',
    title: 'Fair Trade Partnership',
    description:
      'All manufacturing partners achieved Fair Trade certification. Every maker earns a living wage.',
    icon: '🤝',
    isFuture: false,
  },
  {
    year: '2024',
    title: 'Ocean Cleanup Milestone',
    description:
      'Crossed 2 million pieces of plastic removed from coastlines through our NGO partnerships across 14 countries.',
    icon: '🌊',
    isFuture: false,
  },
  {
    year: '2025',
    title: 'Regenerative Cotton Launch',
    description:
      'Launched first line using 100% regenerative organic cotton — farming that actively rebuilds soil health.',
    icon: '🌱',
    isFuture: false,
  },
  {
    year: '2027',
    title: 'Fully Circular (Target)',
    description:
      'Our north star: every product designed for return, breakdown, and remanufacture. Zero landfill.',
    icon: '♻️',
    isFuture: true,
  },
]

const COMMITMENTS = [
  {
    title: 'Organic Materials',
    headline: '100% GOTS-certified organic cotton and recycled ocean plastics in every product.',
    detail:
      'We trace every material to its source. No conventional pesticides, no synthetic fertilizers, no compromise — ever.',
  },
  {
    title: 'Sustainable Packaging',
    headline: 'Compostable mailers, recycled tissue, soy-based inks.',
    detail:
      'Our packaging literally grows flowers when you bury it — every box contains a wildflower seed insert. Zero single-use plastic, full stop.',
  },
  {
    title: 'Carbon Neutral Shipping',
    headline: '110% offset on all emissions. Verified.',
    detail:
      "We partner with Gold Standard-verified projects: reforestation in Madagascar, kelp farming off the California coast, and wind energy in India.",
  },
  {
    title: 'Fair Trade Labor',
    headline: 'Living wages. Safe conditions. Always.',
    detail:
      'We publish our full factory audit reports publicly — no hidden supply chain. Radical transparency is a non-negotiable at AZUL.',
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
      initial={{ opacity: 0, y: 32 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-off-white">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div className="bg-royal pt-32 pb-28 px-6 text-center relative overflow-hidden">
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
        >
          Our Impact
        </motion.p>
        <motion.h1
          className="relative font-serif text-5xl md:text-7xl text-white tracking-wide leading-none mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          Sustainability
        </motion.h1>
        <motion.p
          className="relative text-white/55 max-w-md mx-auto text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          This isn&apos;t a marketing page. It&apos;s our report card.
        </motion.p>
      </div>

      {/* ── Animated counters ─────────────────────────────────────────────── */}
      <div className="bg-deep-blue py-20 px-6" aria-label="Key statistics">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
          <AnimatedCounter value={2000000} suffix="+" label="Plastic pieces removed" />
          <AnimatedCounter value={100} suffix="%" label="Carbon neutral shipping" />
          <AnimatedCounter value={0} label="Plastic bags shipped" />
          <AnimatedCounter value={14} label="Countries with cleanup ops" />
        </div>
      </div>

      {/* ── Timeline ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6" aria-label="Sustainability timeline">
        <div className="max-w-4xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-royal text-[10px] tracking-widest uppercase mb-3 font-semibold">
              Journey
            </p>
            <h2 className="font-serif text-4xl text-deep-blue tracking-wide">Our Timeline</h2>
          </FadeUp>

          {/* Timeline list */}
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-royal/15 md:-translate-x-1/2"
              aria-hidden="true"
            />

            <ol>
              {TIMELINE.map((item, i) => (
                <motion.li
                  key={item.year}
                  className={`relative flex gap-8 mb-10 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -32 : 32 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-6 md:left-1/2 top-5 w-3.5 h-3.5 rounded-full -translate-x-1/2 z-10 border-2 transition-colors ${
                      item.isFuture
                        ? 'border-royal/40 bg-off-white'
                        : 'border-royal bg-royal'
                    }`}
                    aria-hidden="true"
                  />

                  {/* Spacer on opposite side (desktop) */}
                  <div className="hidden md:block md:w-5/12" />

                  {/* Card */}
                  <div
                    className={`ml-14 md:ml-0 md:w-5/12 ${
                      i % 2 !== 0 ? 'md:mr-auto' : ''
                    }`}
                  >
                    <div
                      className={`bg-white rounded-xl p-6 shadow-sm ${
                        item.isFuture ? 'border-2 border-dashed border-royal/25' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2.5 mb-3">
                        <span className="text-xl" aria-hidden="true">
                          {item.icon}
                        </span>
                        <span
                          className={`text-[10px] tracking-widest font-mono font-semibold ${
                            item.isFuture ? 'text-royal/40' : 'text-royal'
                          }`}
                        >
                          {item.year}
                          {item.isFuture ? ' — target' : ''}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg text-deep-blue mb-2">{item.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Commitment cards ──────────────────────────────────────────────── */}
      <section className="bg-white py-24 px-6" aria-label="Detailed commitments">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-royal text-[10px] tracking-widest uppercase mb-3 font-semibold">
              Commitments
            </p>
            <h2 className="font-serif text-4xl text-deep-blue tracking-wide">The Details</h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {COMMITMENTS.map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.1}>
                <div className="bg-off-white rounded-xl p-8 h-full">
                  <h3 className="font-serif text-2xl text-deep-blue mb-2 tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-royal text-sm font-medium mb-3">{item.headline}</p>
                  <p className="text-gray-500 leading-relaxed text-[15px]">{item.detail}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA bar ───────────────────────────────────────────────────────── */}
      <section className="bg-royal py-20 px-6 text-center">
        <FadeUp>
          <p className="text-white/60 text-xs tracking-widest uppercase mb-5">Ready to act?</p>
          <h2 className="font-serif text-3xl md:text-4xl text-white tracking-wide mb-8">
            Every purchase funds the mission.
          </h2>
          <Link
            href="/shop"
            className="btn-white inline-block border border-white text-white text-xs tracking-widest uppercase rounded px-10 py-3.5"
          >
            <span className="btn-text">Shop the Collection</span>
          </Link>
        </FadeUp>
      </section>
    </div>
  )
}
