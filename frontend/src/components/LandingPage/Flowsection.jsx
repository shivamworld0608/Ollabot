import React, { useEffect } from "react";
import Lottie from "lottie-react";
import flowAnim from "../../lottie/flow.json";
import AOS from "aos";
import "aos/dist/aos.css";

const steps = [
  {
    id: "s1",
    title: "Admin: Upload PDF",
    emoji: "📄",
    desc: "Admin uploads PDF via secure dashboard, initiating the RAG pipeline.",
    category: "admin",
  },
  {
    id: "s2",
    title: "Split into Chunks",
    emoji: "🪓",
    desc: "PDF is split into 100–300 word chunks for efficient processing.",
    category: "admin",
  },
  {
    id: "s3",
    title: "Generate Embeddings",
    emoji: "🧠",
    desc: "Chunks are converted to vectors using Mistral LLM for semantic understanding.",
    category: "admin",
  },
  {
    id: "s4",
    title: "Store in ChromaDB",
    emoji: "📦",
    desc: "Chunks, vectors, and metadata (source, page no.) are stored in ChromaDB.",
    category: "admin",
  },
  {
    id: "s5",
    title: "User: Ask Query",
    emoji: "🙋",
    desc: "User submits a question through an intuitive UI.",
    category: "user",
  },
  {
    id: "s6",
    title: "Vector Search & Re-ranking",
    emoji: "🔍",
    desc: "Query is converted to a vector, ChromaDB retrieves top chunks, re-ranked using MiniLM and cosine similarity.",
    category: "user",
  },
  {
    id: "s7",
    title: "LLM Answer",
    emoji: "🧾",
    desc: "Mistral LLM generates a precise, context-grounded response from matched chunks.",
    category: "user",
  },
  {
    id: "s8",
    title: "User Feedback",
    emoji: "📊",
    desc: "User provides feedback on answer quality, stored for analysis and improvement.",
    category: "user",
  },
];

const FlowSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      id="flow"
      className="py-24 bg-gradient-to-br from-slate-200 via-white to-gray-200"
    >
      <div className="max-w-7xl mx-auto px-6 text-center mb-6">
        <h2 className="text-5xl font-extrabold mb-4" data-aos="fade-up">
          <span className="text-black">Our Workflow </span>
          <span className="text-blue-900">Unveiled 🚀</span>
        </h2>
        <p
          className="text-lg text-gray-600 max-w-2xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Discover the seamless Retrieval-Augmented Generation (RAG) process that powers intelligent, accurate responses.
        </p>
      </div>

      {/* Lottie + Flow Text Block */}
      <div
        className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12 mb-6"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <Lottie animationData={flowAnim} loop className="w-[500px] h-[500px]" />
        </div>

     <div className="w-full md:w-1/2">
  <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 space-y-5 hover:shadow-2xl transition-all duration-300">
    <h3 className="text-3xl font-bold text-blue-900">How It Flows</h3>
    <p className="text-gray-800 font-semibold">
      Our system follows a carefully designed Retrieval-Augmented Generation pipeline. From admins uploading documents to users receiving intelligent responses, every step is optimized for performance and clarity.
    </p>
    <ul className="list-disc ml-5 text-gray-700 space-y-2">
      <li>Efficient document chunking</li>
      <li>Semantic embedding generation</li>
      <li>High-speed vector retrieval and re-ranking</li>
      <li>Context-aware responses from Mistral LLM</li>
    </ul>
  </div>
</div>

      </div>

      {/* Admin/User Columns */}
      <div className="relative max-w-7xl mx-auto px-6 flex justify-center gap-36">
        {/* Admin Column */}
        <div
          className="flex flex-col items-center gap-8"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          {steps
            .filter((s) => s.category === "admin")
            .map((s) => (
              <div
                key={s.id}
                className="w-[220px] bg-white p-5 rounded-xl shadow-md text-center transform hover:scale-105 transition-transform duration-300 border border-blue-100"
              >
                <div className="text-4xl mb-2">{s.emoji}</div>
                <h4 className="font-semibold text-gray-800 text-sm mb-1">{s.title}</h4>
                <p className="text-gray-500 text-xs">{s.desc}</p>
              </div>
            ))}
        </div>

        {/* User Column */}
        <div
          className="flex flex-col items-center gap-8"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          {steps
            .filter((s) => s.category === "user")
            .map((s) => (
              <div
                key={s.id}
                className="w-[220px] bg-white p-5 rounded-xl shadow-md text-center transform hover:scale-105 transition-transform duration-300 border border-indigo-100"
              >
                <div className="text-4xl mb-2">{s.emoji}</div>
                <h4 className="font-semibold text-gray-800 text-sm mb-1">{s.title}</h4>
                <p className="text-gray-500 text-xs">{s.desc}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default FlowSection;
