import React from "react";
import Lottie from "lottie-react";
import aiAnimation from "../../lottie/ai-chat.json";

const HeroSection = () => (
  <section className="h-screen flex items-center justify-center pt-16 bg-gradient-to-br from-indigo-100 to-white">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center px-4">
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-5xl font-bold leading-tight text-gray-900">
  Clear Your Placement Doubts Instantly 🎓💼
</h1>
<p className="text-lg text-gray-700 mt-4">
  Ask any question related to NIT Jalandhar’s placement policies, eligibility rules, or procedures — get precise answers instantly, powered by Mistral LLM and RAG-based search over official documents.
</p>

      </div>
      <div className="md:w-1/2">
        <Lottie animationData={aiAnimation} loop={true} />
      </div>
    </div>
  </section>
);

export default HeroSection;
