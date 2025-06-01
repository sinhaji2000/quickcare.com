import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FindDoc = () => {
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    address: "",
  });
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(formData);

  const handleSearch = async () => {
    try {
      setError("");
      const { name, specialization, address } = formData;
      const queryParams = new URLSearchParams();

      if (name) queryParams.append("name", name);
      if (specialization) queryParams.append("specialization", specialization);
      if (address) queryParams.append("address", address);

      const res = await axios.get(
        `http://localhost:3001/user/search-doctors?${queryParams.toString()}`
      );
      setDoctors(res.data.data);
    } catch (err) {
      console.log(err);
      setDoctors([]);
      setError(
        err?.response?.data?.message || "Something went wrong while fetching"
      );
    }
  };

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <h2 className="text-[#111518] tracking-light text-[28px] font-bold leading-tight px-4 text-left pb-3 pt-5">
          Find a doctor
        </h2>

        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <input
              name="specialization"
              placeholder="Search by specialty, condition, or procedure"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#60768a] p-[15px] text-base font-normal leading-normal"
              value={formData.specialization}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <input
              name="address"
              placeholder="City, state, or zip code"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#60768a] p-[15px] text-base font-normal leading-normal"
              value={formData.address}
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col min-w-40 flex-1">
            <input
              name="name"
              placeholder="Doctor name"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#60768a] p-[15px] text-base font-normal leading-normal"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="flex px-4 py-3 justify-start">
          <button
            onClick={handleSearch}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#0b80ee] text-white text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">Search</span>
          </button>
        </div>

        {/* Show results or error */}
        <div className="px-4 py-3">
          {error && <p className="text-red-500">{error}</p>}

          {doctors.length > 0 && (
            <div className="mt-6 space-y-4 text-black">
              {doctors.map((doc) => (
                <div
                  key={doc._id}
                  className="p-4 border border-gray-200 rounded-lg shadow"
                >
                  <h3 className="text-lg font-bold">{doc.name}</h3>
                  <p>Specialization: {doc.speclization}</p>
                  <p>Location: {doc.address.city}</p>
                  {/* Add more fields as needed */}
                  <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700" onClick={() => navigate(`/book-appointment/${doc._id}`)}>
      Book Appointment
    </button>
                </div>
              ))}
            </div>
            
          )}
          
        </div>
      </div>
    </div>
  );
};

export default FindDoc;
