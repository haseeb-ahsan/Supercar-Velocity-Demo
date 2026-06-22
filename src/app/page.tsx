import Hero from "@/components/Hero";
import FeaturedInventory from "@/components/FeaturedInventory";
import WhyChooseUs from "@/components/WhyChooseUs";
import BrandMarquee from "@/components/BrandMarquee";
import FinanceCTA from "@/components/FinanceCTA";
import ContactBanner from "@/components/ContactBanner";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedInventory />
      <WhyChooseUs />
      <BrandMarquee />
      <FinanceCTA />
      <ContactBanner />
    </main>
  );
}
