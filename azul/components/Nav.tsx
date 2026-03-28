'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/story', label: 'Our Story' },
  { href: '/sustainability', label: 'Sustainability' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
        aria-label="Main header"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Wordmark */}
          <Link
            href="/"
            aria-label="AZUL — home"
            className="font-serif text-2xl tracking-widest font-bold"
          >
            <span
              className={`transition-colors duration-300 ${
                scrolled ? 'text-royal' : 'text-white'
              }`}
            >
              AZUL
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                aria-current={pathname === href ? 'page' : undefined}
                className={`relative text-sm tracking-wide group transition-colors duration-200 ${
                  scrolled
                    ? 'text-deep-blue hover:text-royal'
                    : 'text-white/80 hover:text-white'
                } ${pathname === href ? 'font-semibold' : ''}`}
              >
                {label}
                {/* Underline slide-in */}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300 ${
                    scrolled ? 'bg-royal' : 'bg-white'
                  } ${pathname === href ? 'w-full' : ''}`}
                />
              </Link>
            ))}
          </nav>

          {/* Right: coming soon badge + mobile toggle */}
          <div className="flex items-center gap-4">
            <span
              className={`hidden md:inline-flex text-[10px] font-semibold tracking-widest px-3 py-1.5 rounded-full border transition-colors duration-300 ${
                scrolled
                  ? 'border-royal text-royal'
                  : 'border-white/60 text-white/80'
              }`}
              aria-label="Store opening soon"
            >
              COMING SOON
            </span>

            {/* Hamburger */}
            <button
              className={`md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 ${
                scrolled ? 'text-deep-blue' : 'text-white'
              }`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span
                className={`block h-0.5 bg-current transition-all duration-300 origin-center ${
                  menuOpen ? 'w-6 rotate-45 translate-y-[7px]' : 'w-6'
                }`}
              />
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${
                  menuOpen ? 'opacity-0 w-0' : 'w-5'
                }`}
              />
              <span
                className={`block h-0.5 bg-current transition-all duration-300 origin-center ${
                  menuOpen ? 'w-6 -rotate-45 -translate-y-[7px]' : 'w-6'
                }`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-lg px-6 py-6"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <ul className="space-y-1">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`block py-2.5 text-base tracking-wide transition-colors ${
                      pathname === href ? 'text-royal font-semibold' : 'text-deep-blue hover:text-royal'
                    }`}
                    aria-current={pathname === href ? 'page' : undefined}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <span className="mt-5 inline-flex text-[10px] font-semibold tracking-widest px-3 py-1.5 rounded-full border border-royal text-royal">
              COMING SOON
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
