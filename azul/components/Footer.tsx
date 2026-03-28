'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const SHOP_LINKS = ['Apparel', 'Flip Flops', 'Phone Cases', 'Bags', 'Accessories']
const COMPANY_LINKS = [
  { href: '/story', label: 'Our Story' },
  { href: '/sustainability', label: 'Sustainability' },
  { href: '#', label: 'Press' },
  { href: '#', label: 'Careers' },
]
const LEGAL_LINKS = ['Privacy Policy', 'Terms of Service', 'Shipping Policy', 'Returns']

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes('@')) {
      setError('Please enter a valid email.')
      return
    }
    setError('')
    setSubmitted(true)
    // TODO: Wire to email service (Klaviyo, Mailchimp, Resend, etc.)
  }

  return (
    <footer className="bg-deep-blue text-white" aria-label="Site footer">

      {/* Newsletter */}
      <div className="border-b border-white/10 py-20 px-6">
        <div className="max-w-xl mx-auto text-center">
          <motion.h2
            className="font-serif text-3xl md:text-4xl tracking-wide mb-3"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
          >
            Stay in the Current
          </motion.h2>
          <p className="text-white/45 text-sm mb-8">
            New drops, ocean updates, and zero spam. Unsubscribe anytime.
          </p>

          {submitted ? (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block text-sm tracking-wide bg-royal/30 border border-royal/40 rounded-lg py-3 px-8 text-white"
              role="status"
            >
              You&apos;re in the current. ✓
            </motion.p>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <div className="flex-1 max-w-72">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full bg-white/8 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-royal transition-colors"
                    aria-describedby={error ? 'newsletter-error' : undefined}
                    aria-invalid={!!error}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-white border border-white text-white text-xs tracking-widest uppercase rounded-lg px-7 py-3"
                >
                  <span className="btn-text">Subscribe</span>
                </button>
              </div>
              {error && (
                <p id="newsletter-error" className="mt-2 text-red-400 text-xs" role="alert">
                  {error}
                </p>
              )}
            </form>
          )}
        </div>
      </div>

      {/* Main footer links */}
      <div className="py-14 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-serif text-3xl tracking-widest mb-3" aria-label="AZUL">AZUL</p>
            <p className="text-white/35 text-xs leading-relaxed max-w-[180px]">
              Eco-friendly lifestyle brand.<br />
              One color. One planet.
            </p>
            {/* TODO: Add social links (Instagram, TikTok, etc.) */}
          </div>

          {/* Shop */}
          <div>
            <p className="text-[10px] tracking-widest uppercase text-white/35 mb-4 font-semibold">Shop</p>
            <ul className="space-y-2.5">
              {SHOP_LINKS.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/shop?category=${encodeURIComponent(cat)}`}
                    className="text-white/55 text-sm hover:text-white transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-[10px] tracking-widest uppercase text-white/35 mb-4 font-semibold">Company</p>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="text-white/55 text-sm hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-[10px] tracking-widest uppercase text-white/35 mb-4 font-semibold">Legal</p>
            <ul className="space-y-2.5">
              {LEGAL_LINKS.map((item) => (
                <li key={item}>
                  <Link href="#" className="text-white/55 text-sm hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} AZUL. All rights reserved.
          </p>
          <p className="text-white/25 text-xs italic">
            wear the ocean. protect it too.
          </p>
        </div>
      </div>
    </footer>
  )
}
