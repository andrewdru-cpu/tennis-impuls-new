import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { ClubIntro } from "@/components/sections/club-intro";
import { Services } from "@/components/sections/services";
import { Booking } from "@/components/sections/booking";
import { Pricing } from "@/components/sections/pricing";
import { Team } from "@/components/sections/team";
import { News } from "@/components/sections/news";
import { Contacts } from "@/components/sections/contacts";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ClubIntro />
        <Services />
        <Booking />
        <Pricing />
        <Team />
        <News />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
