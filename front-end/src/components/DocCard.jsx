import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import { Link } from "react-router-dom";

const DocCard = ({ page, doctors: externalDoctors }) => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  const { _id } = useParams();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001?page=${page}&limit=2`
        );
        setDoctors(res.data.data || []);
        console.log("Doctors fetched successfully:", res);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };

    if (!externalDoctors) {
      fetchDoctors();
    }
  }, [page, externalDoctors]);
  const displayedDoctors = externalDoctors || doctors;
  return (
    <div className="p-6 pb-4 text-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
          Top Doctors
        </h2>

        {displayedDoctors.length === 0 ? (
          <p className="text-center text-gray-600">No doctors found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedDoctors.map((doc, index) => (
              <Card
                key={index}
                className="p-4 border border-gray-200 shadow-md"
              >
                <CardHeader className="pb-0 pt-2 px-2 flex-col items-start">
                  <p className="text-sm uppercase font-semibold text-blue-600">
                    {doc.speclization}
                  </p>
                  <h4 className="font-bold text-lg mt-1">{doc.name}</h4>
                  <small className="text-default-500 mt-1">
                    {doc.experience} years experience
                  </small>
                </CardHeader>

                <CardBody className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Image
                    alt="Doctor"
                    className="object-cover rounded-xl w-full sm:w-40 h-40"
                    src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                  />
                  <div className="flex flex-col justify-between">
                    <p>
                      <strong>City:</strong> {doc.address?.city}
                    </p>
                    <div className="mt-4 flex gap-2 flex-nowrap flex-wrap md:flex-nowrap">
                      <Link
                        to={`/doc/${doc._id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                      >
                        View Details
                      </Link>
                      <Link
                        to={`/book-appointment/${doc._id}`}
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
                      >
                        Book Appointment
                      </Link>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocCard;
