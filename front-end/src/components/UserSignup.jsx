import useUserSignUp from "../hooks/useUserSignUp";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UserSignup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/user/profile");
  }, [navigate]);

  const { formData, message, handleChange, handleSubmit } = useUserSignUp();

  return (
    <div className="flex justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 sm:p-8 text-black">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-[#121416]">
          Create your account
        </h2>

        {message && (
          <p className="text-red-500 text-center text-sm mb-4">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            {
              name: "name",
              label: "Full Name",
              placeholder: "Enter your name",
            },
            {
              name: "email",
              label: "Email address",
              placeholder: "Enter your email address",
              type: "email",
            },
            {
              name: "phone",
              label: "Phone number",
              placeholder: "Enter your phone number",
              type: "tel",
            },
            {
              name: "age",
              label: "Age",
              placeholder: "Enter your age",
              type: "number",
            },
            {
              name: "password",
              label: "Password",
              placeholder: "Create a password",
              type: "password",
            },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-[#121416] font-medium mb-2">
                {field.label}
              </label>
              <input
                name={field.name}
                type={field.type || "text"}
                placeholder={field.placeholder}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className="w-full h-12 px-4 bg-[#f1f2f4] text-[#121416] rounded-xl placeholder:text-[#6a7681] focus:outline-none"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full h-12 bg-[#0b80ee] text-white font-bold rounded-full text-base"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-[#6a7681] mt-6">
          By signing up, you agree to our{" "}
          <span className="underline cursor-pointer">Terms of Service</span> and{" "}
          <span className="underline cursor-pointer">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
