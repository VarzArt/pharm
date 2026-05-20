import BenefitsSection from '@/app/components/benefitSection'
import CatalogSection from '@/app/components/catalogSection'
import HeroSection from '@/app/components/heroSection'
import WhyChooseSection from '@/app/components/whyChoseSection'

export default function HomePage() {
  return (
    <main className="flex w-full flex-col items-center gap-2 pt-[72px]">
      <HeroSection></HeroSection>
      <BenefitsSection></BenefitsSection>
      <CatalogSection></CatalogSection>
      <WhyChooseSection></WhyChooseSection>
    </main>
  )
}
