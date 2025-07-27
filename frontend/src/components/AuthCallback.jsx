import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../Redux/authSlice"; // Adjust path if needed

const AuthCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingState, setLoadingState] = useState(0);

  const loadingMessages = [
    "Connecting your account...",
    "Preparing your messaging dashboard...",
    "Setting up your WhatsApp integration...",
    "Almost ready to connect with your audience..."
  ];

  const { authUser, userType } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (authUser && userType) {
      switch (userType) {
        case "User":
          navigate("/user/ask-query");
          break;
        case "Admin":
          navigate("/admin/upload-pdfs");
          break;
        default:
          navigate("/");
      }
    }
  }, [authUser, userType, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingState((prev) => (prev + 1) % loadingMessages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-teal-100">
      <div className="text-center p-8 max-w-md">
        <div className="mb-6">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-blue-300 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full"></div>
              <div className="absolute -bottom-3 -right-3 w-3 h-3 bg-blue-500 rounded-full"></div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-blue-800 mb-2">Welcome!</h2>
          <p className="text-lg text-blue-700">{loadingMessages[loadingState]}</p>
        </div>
        <div className="flex justify-center space-x-2 mt-4">
          {[0, 1, 2].map((dot) => (
            <div
              key={dot}
              className={`w-3 h-3 rounded-full ${
                dot === loadingState % 3 ? "bg-blue-600" : "bg-blue-300"
              } animate-bounce`}
              style={{ animationDelay: `${dot * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthCallback;
