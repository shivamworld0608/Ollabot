import React from "react";
import { Menu } from "antd";

const Navbar = () => (
  <div className="fixed top-0 left-0 w-full z-50 shadow bg-white">
    <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
      <div className="text-xl font-bold">🧠 OllaBot</div>
      <Menu mode="horizontal" items={[
        { label: 'Home', key: 'home' },
        { label: 'Flow', key: 'flow' },
        { label: 'Features', key: 'features' },
        { label: 'Contact', key: 'contact' },
      ]} />
    </div>
  </div>
);

export default Navbar;
