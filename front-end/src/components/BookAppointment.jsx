import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useBookAppo from "../hooks/useBookAppo";

const BookAppointment = () => {
  const { id: docId } = useParams();
  const [date, setDate] = useState("");
  const { handleBooking, loading, message } = useBookAppo();

  const onSubmit = (e) => {
    handleBooking(e, docId, date);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Book Appointment
        </h2>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg px-4 py-2 text-gray-900"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300 hover:bg-blue-500 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Booking..." : "Book Now"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm font-medium text-red-500">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
