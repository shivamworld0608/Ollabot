import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Navbar from "../components/LandingPage/Navbar";
import HeroSection from "../components/LandingPage/Herosection";
import FlowSection from "../components/LandingPage/Flowsection";
import FeaturesSection from "../components/LandingPage/Featuresection";
import Footer from "../components/LandingPage/Footer";
import "aos/dist/aos.css";
import AOS from "aos";


const LandingPage = () => {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

useEffect(() => {
  AOS.init({ duration: 1000 });
}, []);

  return (
    <div className="bg-white text-gray-800">
      <Navbar />
      <HeroSection />
      <FlowSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
