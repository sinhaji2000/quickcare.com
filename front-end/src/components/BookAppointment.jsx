import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useBookAppo from "../hooks/useBookAppo";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookAppointment = () => {
  const { id: docId } = useParams();
  const [date, setDate] = useState(null);
  const [reason, setReason] = useState("");
  const { handleBooking, loading, message, doctor } = useBookAppo({ docId });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!date || !reason) return;
    const formattedDate = date.toISOString();
    handleBooking(e, docId, formattedDate, reason);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Book an appointment
        </h2>
        <p className="text-sm text-blue-700 mb-6">{doctor?.name}</p>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason for visit
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg px-4 py-2 text-gray-900"
              required
            >
              <option value="">Select a reason</option>
              <option value="Consultation">Consultation</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Prescription">Prescription</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg px-4 py-2 text-gray-900"
              minDate={new Date()}
              placeholderText="Choose a date"
              dateFormat="yyyy-MM-dd"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !date || !reason}
            className={`w-full bg-blue-100 text-gray-900 font-semibold py-2 rounded-full hover:bg-blue-200 transition ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Booking..." : "Book appointment"}
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
