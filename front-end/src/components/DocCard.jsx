import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DocCard = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:3001/")
        .then((res) => {
          setDoctors(res.data.doc || []);
        })
        .catch((err) => {
          console.error("Error fetching doctors:", err);
        });
    }, []);
  
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-600 mb-4 text-center">Welcome to QuickCare</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Available Doctors</h2>
  
          {doctors.length === 0 ? (
            <p className="text-center text-gray-600">No doctors found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {doctors.map((doc, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow border border-gray-200"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{doc.name}</h3>
                  <p className="text-gray-700"><span className="font-medium">Specialization:</span> {doc.speclization}</p>
                  <p className="text-gray-700"><span className="font-medium">Experience:</span> {doc.experience} years</p>
                  <p className="text-gray-700"><span className="font-medium">Age:</span> {doc.age}</p>
                  <p className="text-gray-700">
                    <span className="font-medium">Address:</span> {`${doc.address.house_No}, ${doc.address.locality}, ${doc.address.city} - ${doc.address.pinCode}`}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
}

export default DocCard;