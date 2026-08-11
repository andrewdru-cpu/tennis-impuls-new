import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { ClubIntro } from "@/components/sections/club-intro";
import { PromoVideo } from "@/components/sections/promo-video";
import { Services } from "@/components/sections/services";
import { Booking } from "@/components/sections/booking";
import { Pricing } from "@/components/sections/pricing";
import { Team } from "@/components/sections/team";
import { News } from "@/components/sections/news";
import { Contacts } from "@/components/sections/contacts";
import { Footer } from "@/components/sections/footer";
import { getNewsArticles, getPricingPlans } from "@/lib/sanity.content";

export default async function Home() {
  const [pricingPlans, newsArticles] = await Promise.all([
    getPricingPlans(),
    getNewsArticles(),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ClubIntro />
        <PromoVideo />
        <Services />
        <Booking />
        <Pricing plans={pricingPlans} />
        <Team />
        <News articles={newsArticles} />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
