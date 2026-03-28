'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

// ─── Data ────────────────────────────────────────────────────────────────────

const STORY_BLOCKS = [
  {
    eyebrow: 'The Beginning',
    heading: 'Born From the Water',
    body: "AZUL began with a simple question: why does sustainable fashion have to compromise on beauty? Our founder, a lifelong surfer and designer, spent years watching plastic wash ashore on the beaches he loved. He wanted to build something different — a brand that said, with every product, that the ocean is worth protecting.",
  },
  {
    eyebrow: 'The Color',
    heading: 'Why Only Blue?',
    body: "The decision to make everything in a single color — royal blue #0000CC — was radical. It forced us to compete on quality, materials, and story alone. It removed the distraction of infinite choice and replaced it with something deeper: a permanent visual reminder of what we're here to protect.",
  },
  {
    eyebrow: 'The Mission',
    heading: 'More Than a Brand',
    body: "Five percent of every sale funds ocean cleanup operations through our partner NGOs. We've helped remove over two million pieces of plastic from coastlines across fourteen countries. When you wear AZUL, you're wearing that work. You're part of it.",
  },
  {
    eyebrow: 'The Future',
    heading: 'Building for the Next Tide',
    body: "By 2027, we aim to be fully circular — every product designed to be returned, broken down, and remade. We're working with material scientists, marine biologists, and artists to design the next generation of ocean-aware goods. The blueprint is already in progress.",
  },
]

const STATS = [
  { value: '2M+', label: 'Plastic pieces removed' },
  { value: '14', label: 'Countries' },
  { value: '100%', label: 'Organic materials' },
  { value: '2021', label: 'Founded' },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StoryPage() {
  return (
    <div className="min-h-screen">

      {/* Split hero — sticky left, scrollable right */}
      <div className="grid md:grid-cols-2">

        {/* Left: sticky brand panel */}
        <div className="bg-royal min-h-[50vh] md:sticky md:top-0 md:h-screen flex items-center justify-center p-12 overflow-hidden">
          {/* Subtle dot bg */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            aria-hidden="true"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <motion.div
            className="relative text-center"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="text-white/35 text-[10px] tracking-widest uppercase mb-6 font-semibold">
              Est. 2021
            </p>

            <h1
              className="font-serif text-white tracking-widest uppercase leading-none"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
              aria-label="AZUL"
            >
              AZUL
            </h1>

            {/* Divider */}
            <div className="w-px h-16 bg-white/20 mx-auto my-8" aria-hidden="true" />

            <p className="text-white/50 text-sm tracking-[0.15em] italic">
              wear the ocean.<br />protect it too.
            </p>

            {/* Brand mark placeholder */}
            <div
              className="mt-12 w-40 h-40 mx-auto rounded-full border border-white/15 bg-white/5 flex items-center justify-center"
              aria-hidden="true"
            >
              <span className="text-white/20 text-[10px] tracking-widest font-mono">
                [ brand mark ]
              </span>
              {/* TODO: Replace with actual logo SVG or founder portrait */}
            </div>

            {/* Stats strip */}
            <div className="mt-12 grid grid-cols-2 gap-4">
              {STATS.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="font-serif text-2xl text-white">{value}</p>
                  <p className="text-white/35 text-[9px] tracking-widest uppercase mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: scrollable story text */}
        <div className="bg-off-white py-32 md:py-24 px-8 md:px-16">
          <div className="max-w-lg mx-auto">

            {/* Lead paragraph */}
            <motion.p
              className="text-gray-400 text-xs tracking-widest uppercase mb-16 font-semibold"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
            >
              Our Story
            </motion.p>

            {STORY_BLOCKS.map((block, i) => (
              <motion.div
                key={block.heading}
                className="mb-16"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 40 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                <p className="text-royal text-[10px] tracking-widest uppercase mb-2 font-semibold">
                  {block.eyebrow}
                </p>
                <h2 className="font-serif text-2xl md:text-3xl text-deep-blue mb-5 tracking-wide leading-snug">
                  {block.heading}
                </h2>
                <p className="text-gray-500 leading-relaxed text-[15px]">{block.body}</p>

                {i < STORY_BLOCKS.length - 1 && (
                  <div className="w-10 h-px bg-royal/25 mt-14" aria-hidden="true" />
                )}
              </motion.div>
            ))}

            {/* CTA */}
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="pt-4"
            >
              <Link
                href="/sustainability"
                className="btn-royal inline-block border border-royal text-royal text-xs tracking-widest uppercase rounded px-8 py-3.5"
              >
                <span className="btn-text">See Our Impact →</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
