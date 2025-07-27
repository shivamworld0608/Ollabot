import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthUser } from "../Redux/authSlice";

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/auth/admin-login`,
        { email, password },
        { withCredentials: true }
      );

      if (res.data.success) {
        console.log(res.data);
        dispatch(
        setAuthUser({
          authUser: true,
          userData: res.data.user,
          userType: res.data.userType,
        })
      );
        navigate('/admin/upload-pdfs');
      } else {
        setError(res.data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setError('Invalid credentials or server error.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-[#0369A0] mb-6">
          Admin Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#0369A0] focus:border-[#0369A0] sm:text-sm"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#0369A0] focus:border-[#0369A0] sm:text-sm"
              placeholder="********"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#0369A0] text-white py-2 px-4 rounded-lg hover:bg-[#025f8a] transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
