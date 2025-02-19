import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ email, password });

      // Store token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("✅ Login Successful!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });

      setTimeout(() => {
        navigate(data.user.role === "admin" ? "/admin" : "/dashboard");
      }, 2000);

    } catch (err) {
      toast.error("❌ " + (err.response?.data?.message || "Login failed"), {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
      {/* Toast Notification */}
      <ToastContainer />

      <div
        className={`relative bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-md w-full border border-white/20 transform transition-all duration-700 ${
          fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Glowing Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-white/10 to-purple-400/10 blur-lg opacity-20 rounded-2xl"></div>

        <h2 className="text-3xl font-extrabold text-center text-white drop-shadow-lg mb-6">
          Welcome Back!
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 bg-white/10 text-white border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-400 transition placeholder-gray-300"
            />
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 bg-white/10 text-white border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-400 transition placeholder-gray-300"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold tracking-wide shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-300 mt-4">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-400 font-semibold hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
