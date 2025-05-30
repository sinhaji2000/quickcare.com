import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useUserProfile = () => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]); // ✅ NEW
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/user/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3001/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data.user);
        setAppointments(response.data.appointments || []); // ✅ Fixed spelling
      } catch (err) {
        console.error(err);
        setError("Failed to fetch profile");
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/user/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/user/login");
  };

  return { user, appointments, error, loading, handleSignOut };
};

export default useUserProfile;
