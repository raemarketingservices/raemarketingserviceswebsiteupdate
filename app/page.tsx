import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import Hero from '@/components/sections/Hero'
import ValueProposition from '@/components/sections/ValueProposition'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import WhyChoose from '@/components/sections/WhyChoose'
import Process from '@/components/sections/Process'
import Portfolio from '@/components/sections/Portfolio'
import Results from '@/components/sections/Results'
import CTASection from '@/components/sections/CTASection'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ValueProposition />
        <About />
        <Services />
        <WhyChoose />
        <Process />
        <Portfolio />
        <Results />
        <CTASection />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
