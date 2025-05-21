import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DocCard = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  const { _id } = useParams();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:3001/");
        setDoctors(res.data.doc || []);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
          Welcome to QuickCare
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
          Available Doctors
        </h2>

        {doctors.length === 0 ? (
          <p className="text-center text-gray-600">No doctors found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {doctors.map((doc, index) => (
              <div
                key={index}
                className="card card-side bg-base-100 shadow-md border border-gray-200"
              >
                <figure>
                  <img
                    className="w-48 h-full object-cover"
                    src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                    alt="Doctor"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-blue-700">{doc.name}</h2>
                  <p>
                    <strong>Specialization:</strong> {doc.speclization}
                  </p>
                  <p>
                    <strong>Experience:</strong> {doc.experience} years
                  </p>
                  <p>
                    <strong>City:</strong> {doc.address?.city}
                  </p>
                  <div className="card-actions justify-end space-x-2">
                    <button
                      onClick={() => navigate(`/doc/${doc._id}`)}
                      className="btn btn-primary"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => navigate(`/book-appointment/${doc._id}`)}
                      className="btn btn-secondary"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocCard;
