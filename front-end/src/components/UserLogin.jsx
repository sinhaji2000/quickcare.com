import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserLogin from "../hooks/useUserLogin";

const UserLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/user/profile");
  }, [navigate]);

  const { formData, message, loading, handleChange, handleSubmit } =
    useUserLogin();

  return (
    <div className="flex justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 sm:p-8 text-black">
        <h2 className="text-[#121416] text-2xl sm:text-3xl font-bold text-center mb-4">
          Log in to QuickCare
        </h2>

        {message && (
          <p
            className={`text-center mb-4 ${
              message.toLowerCase().includes("successful")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <label className="flex flex-col">
            <span className="text-[#121416] font-medium mb-2">Email</span>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="rounded-xl bg-[#f1f2f4] p-4 h-14 text-base placeholder:text-[#6a7681] focus:outline-none"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label className="flex flex-col">
            <span className="text-[#121416] font-medium mb-2">Password</span>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="rounded-xl bg-[#f1f2f4] p-4 h-14 text-base placeholder:text-[#6a7681] focus:outline-none"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          <p
            className="text-right text-sm text-[#6a7681] underline cursor-pointer"
            onClick={() => navigate("/user/forgot-password")}
          >
            Forgot username or password?
          </p>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#0b80ee] text-white font-bold rounded-full h-10 px-4 text-sm"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

          <p
            className="text-center text-sm text-[#6a7681] underline cursor-pointer"
            onClick={() => navigate("/user/signup")}
          >
            Don&apos;t have an account? Sign up
          </p>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
