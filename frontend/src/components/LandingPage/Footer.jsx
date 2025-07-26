import React from "react";

const Footer = () => (
  <footer className="bg-gray-900 text-white py-6">
    <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
      <p>&copy; {new Date().getFullYear()} OllaBot | Shivam Pandey</p>
      <div className="space-x-4">
        <a href="#" className="hover:underline">GitHub</a>
        <a href="#" className="hover:underline">LinkedIn</a>
      </div>
    </div>
  </footer>
);

export default Footer;
