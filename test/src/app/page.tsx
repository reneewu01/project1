import { Hero } from '@/components/hero'
import { Features } from '@/components/features'
import { PopularDestinations } from '@/components/popular-destinations'
import { HowItWorks } from '@/components/how-it-works'
import { Testimonials } from '@/components/testimonials'
import { CTASection } from '@/components/cta-section'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <PopularDestinations />
      <HowItWorks />
      <Testimonials />
      <CTASection />
    </div>
  )
} 