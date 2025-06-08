import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useBookAppo = ({ docId }) => {
  const [loading, setLoading] = useState(false);
  console.log("Doc ID in hook:", docId);
  const [message, setMessage] = useState("");
  const [doctor, setDoctor] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      const doctor = await axios.get(
        `http://localhost:3001/user/get-doc-details/${docId}`
      );
      setDoctor(doctor.data.data);
    };

    fetchDoctorDetails();
  }, [docId]);

  const handleBooking = async (e, docId, date) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const res = await axios.post(
        "http://localhost:3001/user/book-appointment",
        { docId, date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(res.data?.message || "Appointment booked successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return { handleBooking, loading, message, doctor };
};

export default useBookAppo;
