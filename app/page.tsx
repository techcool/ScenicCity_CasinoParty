"use client";

import { useState } from "react";
import { CursorProvider, CustomCursor } from "@/components/cursor";
import { useLenis } from "@/components/useLenis";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import EventTypes from "@/components/EventTypes";
import Testimonials from "@/components/Testimonials";
import WhyUs from "@/components/WhyUs";
import Pricing from "@/components/Pricing";
import Gallery from "@/components/Gallery";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

function Page() {
  const [ready, setReady] = useState(false);
  useLenis(ready);

  return (
    <div className="grain relative min-h-screen bg-[#f6f4ee] text-[#141210]">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-[15%] top-[8%] h-[60vh] w-[60vh] rounded-full bg-[#bfdbfe]/40 blur-[160px]" />
        <div className="absolute right-[-10%] top-[35%] h-[65vh] w-[65vh] rounded-full bg-[#ddd6fe]/40 blur-[170px]" />
        <div className="absolute bottom-[-10%] left-[20%] h-[55vh] w-[55vh] rounded-full bg-[#c7d2fe]/35 blur-[160px]" />
        <div className="absolute right-[15%] top-[68%] h-[45vh] w-[45vh] rounded-full bg-[#e8b93a]/15 blur-[150px]" />
      </div>
      <div className="relative z-10">
        <CustomCursor />
        {!ready && <Preloader onDone={() => setReady(true)} />}
        <Header />
        <main>
          <Hero ready={ready} />
          <About />
          <Stats />
          <EventTypes />
          <Testimonials />
          <WhyUs />
          <Pricing />
          <Gallery />
          <FAQ />
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <CursorProvider>
      <Page />
    </CursorProvider>
  );
}
