import { useState , useEffect } from "react";
import  axios from "axios";

import { useNavigate } from "react-router-dom";

const useUserSignup = () =>{
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    phone: "",
    age: "",
    profilePic: null,
    password: "",
  });
  // console.log(formData);

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/user/signup",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("Signup successful! You can now login.");
      setFormData({
        name: "",
        email: "",
        gender: "",
        password: "",
        phone: "",
        profilePic: null,
        age: "",
      });

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