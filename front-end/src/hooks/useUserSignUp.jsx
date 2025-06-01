import { useState , useEffect } from "react";
import  axios from "axios";

import { useNavigate } from "react-router-dom";

const useUserSignup = () =>{
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/user/signup",
        formData
      );
      setMessage("Signup successful! You can now login.");
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        age: "",
      });
      console.log(response.data.message);
      if (response.data.message) {
        navigate("/user/login");
      }
    } catch (error) {
      setMessage("Signup failed. Please try again.");
      console.error(error);
    }
  };

  return {
    formData,
    message,
    handleChange,
    handleSubmit,
  };
}

export default useUserSignup;