import React, { useEffect } from "react";
import { Card } from "antd";
import { CodeOutlined, CloudUploadOutlined, ThunderboltOutlined, SearchOutlined } from "@ant-design/icons";
import Lottie from "lottie-react";
import brainAnim from "../../lottie/brain.json";
import AOS from "aos";
import "aos/dist/aos.css";

const features = [
  { title: "Semantic Search", desc: "Top-k similarity match from vector database.", icon: <SearchOutlined className="text-3xl text-indigo-600" /> },
  { title: "Mistral + Ollama", desc: "Use Mistral LLM running locally via Ollama.", icon: <ThunderboltOutlined className="text-3xl text-yellow-500" /> },
  { title: "PDF File Upload", desc: "Supports any kind of document you want to chat with.", icon: <CloudUploadOutlined className="text-3xl text-green-600" /> },
  { title: "MERN Stack", desc: "Built using MongoDB, Express, React, and Node.js.", icon: <CodeOutlined className="text-3xl text-purple-600" /> },
];

const FeaturesSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        {/* Left Side Animation */}
        <div data-aos="fade-right">
          <Lottie animationData={brainAnim} loop={true} />
        </div>

        {/* Right Side Cards */}
        <div data-aos="fade-left">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">Features 💡</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((f, idx) => (
              <Card
                key={idx}
                className="shadow-xl rounded-lg transition-transform hover:scale-105 hover:shadow-indigo-300 duration-300"
                bodyStyle={{ padding: "20px" }}
              >
                <div className="flex items-center gap-4 mb-2">
                  {f.icon}
                  <h3 className="text-xl font-semibold text-gray-700">{f.title}</h3>
                </div>
                <p className="text-gray-600">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
