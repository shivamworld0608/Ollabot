import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import UserChatPage from "./Pages/UserChatpage";
import AdminUploadPage from "./Pages/AdminUploadpage";


const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/ask-query" element={<UserChatPage />} />
        <Route path="/upload-pdfs" element={<AdminUploadPage />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
