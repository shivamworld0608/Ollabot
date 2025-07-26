import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LandingPage from "./Pages/LandingPage";
import UserChatPage from "./Pages/UserChatpage";
import AdminUploadPage from "./Pages/AdminUploadpage";


const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/ask-query" element={<UserChatPage />} />
        <Route path="/upload-pdfs" element={<AdminUploadPage />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
