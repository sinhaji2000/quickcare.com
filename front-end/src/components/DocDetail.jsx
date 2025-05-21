import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFecthDoc from "../hooks/useFecthDoc";

const DocDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { doctor, loading } = useFecthDoc(id);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!doctor) return <p className="text-center mt-10">Doctor not found</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">{doctor.name}</h2>
        
        <div className="space-y-3 text-gray-700">
          <p><span className="font-semibold">Specialization:</span> {doctor.speclization}</p>
          <p><span className="font-semibold">Experience:</span> {doctor.experience} years</p>
          <p><span className="font-semibold">Age:</span> {doctor.age}</p>
          <p><span className="font-semibold">Email:</span> {doctor.email}</p>
          <p><span className="font-semibold">Phone:</span> {doctor.phone}</p>
          <p>
            <span className="font-semibold">Address:</span>{" "}
            {`${doctor.address.house_No}, ${doctor.address.locality}, ${doctor.address.city} - ${doctor.address.pinCode}`}
          </p>
          <p><span className="font-semibold">Availability:</span> {doctor.availability ? "✅ Available" : "❌ Not Available"}</p>
          <p><span className="font-semibold">Daily Limit:</span> {doctor.dailyLimit}</p>
          <p><span className="font-semibold">Working Hours:</span> {doctor.startHour} - {doctor.endHour}</p>
          <p><span className="font-semibold">Time per User:</span> {doctor.timePerUser} minutes</p>
          <p><span className="font-semibold">Holiday:</span> {doctor.blockedDays.join(", ")}</p>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
          >
            Back
          </button>

          <button
            onClick={() => navigate(`/book-appointment/${id}`)}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocDetail;
