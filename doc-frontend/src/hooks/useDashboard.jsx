import axios from "axios";
import { useDispatch } from "react-redux";
import { setTodayAppointments } from "../../utils/todayAppointments";

import { useEffect, useState } from "react";

const useDashboard = () => {
  const dispatch = useDispatch();
  const [appointments, setAppointments] = useState([]);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODJjMTgzNjA2YjgzMjQzMDE4MWFkNzMiLCJpYXQiOjE3NDk1Njk5NTksImV4cCI6MjA2NTE0NTk1OX0.2FuUwEMV5eu-W35QrW2Jw9wGXPtvJqnqfd6LgI2puTw";
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/doc/appoinments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAppointments(response.data.appoinmentsList);
        dispatch(setTodayAppointments(response.data.appoinmentsList));
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  return appointments
};


export default useDashboard;