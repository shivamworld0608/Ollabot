import React from "react";

const Navbar = () => {
  const loginWithGoogle = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 shadow bg-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold">🧠 OllaBot</div>
        <button
          onClick={loginWithGoogle}
          className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-700 transition"
        >
          Get In
        </button>
      </div>
    </div>
  );
};

export default Navbar;
