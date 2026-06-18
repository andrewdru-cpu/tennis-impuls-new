import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Booking } from "@/components/sections/booking";
import { Pricing } from "@/components/sections/pricing";
import { Team } from "@/components/sections/team";
import { About } from "@/components/sections/about";
import { News } from "@/components/sections/news";
import { Gallery } from "@/components/sections/gallery";
import { Contacts } from "@/components/sections/contacts";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Booking />
        <Pricing />
        <Team />
        <About />
        <News />
        <Gallery />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
