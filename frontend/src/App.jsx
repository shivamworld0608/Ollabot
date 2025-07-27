import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./Redux/authSlice";

import LandingPage from "./Pages/LandingPage";
import UserChatPage from "./Pages/UserChatpage";
import AdminUploadPage from "./Pages/AdminUploadpage";
import AuthCallback from "./components/AuthCallback";
import AdminLogin from "./Pages/AdminLoginPage";


const App = () => {
 const dispatch = useDispatch();
  const { authUser, userType } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  
 const getDashboardPath = () => {
    if (authUser) {
      switch (userType) {
        case "User":
          return "/user/ask-query";
        case "Admin":
          return "/admin/upload-pdfs";
        default:
          return "/";
      }
    }
    return "/";
  };

  return (
    <Router>
      <Routes>
       <Route path="/" element={authUser ? <Navigate to={getDashboardPath()} /> : <LandingPage/>}/>
       <Route path="/auth/admin-login" element={authUser ? <Navigate to={getDashboardPath()} /> : <AdminLogin/>}/>
        <Route path="/auth/success" element={<AuthCallback />} />
         <Route
          path="/user/ask-query"
          element={
            authUser && userType === "User" ? (
              <UserChatPage />
            ) : (
               <Navigate to={getDashboardPath()} />
            )
          }
        />
         <Route
          path="/admin/upload-pdfs"
          element={
            authUser && userType === "Admin" ? (
              <AdminUploadPage />
            ) : (
               <Navigate to={getDashboardPath()} />
            )
          }
        />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
