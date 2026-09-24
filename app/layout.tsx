import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RAE Marketing Services | Soluciones Digitales Integrales',
  description: 'Estrategia, creatividad y tecnología trabajando juntas. Creamos soluciones digitales completas que ayudan a tu negocio a crecer.',
  keywords: 'marketing digital, diseño web, redes sociales, automatización, branding',
  authors: [{ name: 'RAE Marketing Services' }],
  openGraph: {
    title: 'RAE Marketing Services',
    description: 'Soluciones digitales para negocios que quieren más.',
    type: 'website',
    locale: 'es_ES',
  },
  alternates: {
    canonical: 'https://raemarketingservices.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#2D4AFF" />
      </head>
      <body className="bg-white text-rae-gray-dark antialiased">
        {children}
      </body>
    </html>
  )
}
