import axios from "axios";
import { useState } from "react";
const useUserLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3001/user/signin",
        formData
      );
      const { token } = response.data;

      localStorage.setItem("token", token);

      setMessage("Login successful! Redirecting...");
      navigate("/");
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.message || "Login failed");
      } else {
        setMessage("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

    return {
        formData,
        message,
        loading,
        handleChange,
        handleSubmit,
    };
};

export default useUserLogin;
