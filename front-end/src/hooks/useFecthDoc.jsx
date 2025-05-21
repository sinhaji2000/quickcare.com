import { useEffect, useState } from "react";
import axios from "axios";
const useFecthDoc = (id) => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/user/get-doc-details/${id}`
        );
        setDoctor(res.data.data);
      } catch (err) {
        console.error("Error fetching doctor details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [id]);

  return { doctor, loading };
};

export default useFecthDoc;
