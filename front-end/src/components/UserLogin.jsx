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
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1 bg-white rounded shadow-md p-6 text-black">
        <h2 className="text-[#121416] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
          Log in to QuickCare
        </h2>

        {message && (
          <p
            className={`mb-4 px-4 text-center ${
              message.toLowerCase().includes("successful")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 px-4">
          <label className="flex flex-col">
            <span className="text-[#121416] text-base font-medium leading-normal pb-2">
              Email
            </span>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border-none bg-[#f1f2f4] focus:border-none h-14 placeholder:text-[#6a7681] p-4 text-base font-normal leading-normal"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label className="flex flex-col">
            <span className="text-[#121416] text-base font-medium leading-normal pb-2">
              Password
            </span>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border-none bg-[#f1f2f4] focus:border-none h-14 placeholder:text-[#6a7681] p-4 text-base font-normal leading-normal"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          <p
            className="text-[#6a7681] text-sm font-normal leading-normal pb-3 pt-1 px-4 underline cursor-pointer text-right"
            onClick={() => navigate("/user/forgot-password")}
          >
            Forgot username or password?
          </p>

          <button
            type="submit"
            disabled={loading}
            className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#0b80ee] text-white text-sm font-bold leading-normal tracking-[0.015em]"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

          <p
            className="text-[#6a7681] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline cursor-pointer"
            onClick={() => navigate("/user/signup")}
          >
            Don't have an account? Sign up
          </p>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
