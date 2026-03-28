import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import PageTransition from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'AZUL — Wear the Ocean. Protect It Too.',
  description:
    'Eco-friendly lifestyle brand crafted entirely in royal blue. Sustainable apparel, flip flops, phone cases, bags, and accessories. Carbon neutral. Fair trade. Ocean positive.',
  keywords: ['sustainable fashion', 'eco brand', 'royal blue', 'ocean protection', 'organic cotton'],
  openGraph: {
    title: 'AZUL — Wear the Ocean. Protect It Too.',
    description: 'One color. One planet.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-off-white text-deep-blue font-sans antialiased">
        <CustomCursor />
        <Nav />
        <PageTransition>
          {children}
        </PageTransition>
        <Footer />
      </body>
    </html>
  )
}
