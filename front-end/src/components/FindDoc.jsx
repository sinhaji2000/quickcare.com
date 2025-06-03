import { useState } from "react";
import axios from "axios";
import { Pagination } from "@heroui/react";
import DocCard from "./DocCard";

const FindDoc = () => {
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    address: "",
  });

  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 2; // show 3 doctors per page

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchDoctors = async (pageToFetch = 1) => {
    try {
      setError("");
      const { name, specialization, address } = formData;
      const queryParams = new URLSearchParams();

      if (name) queryParams.append("name", name);
      if (specialization) queryParams.append("specialization", specialization);
      if (address) queryParams.append("address", address);

      queryParams.append("page", pageToFetch);
      queryParams.append("limit", limit);

      const res = await axios.get(
        `http://localhost:3001/user/search-doctors?${queryParams.toString()}`
      );

      setDoctors(res.data.data);
      setTotalPages(Math.ceil(res.data.total / limit));
      setPage(pageToFetch);
    } catch (err) {
      console.error(err);
      setDoctors([]);
      setError(
        err?.response?.data?.message || "Something went wrong while fetching"
      );
    }
  };

  const handleSearch = () => {
    fetchDoctors(1); // Reset to page 1 when user searches
  };

  const handlePageChange = (newPage) => {
    fetchDoctors(newPage);
  };

  return (
    <div className="px-4 sm:px-12 flex justify-center py-5 bg-white text-black">
      <div className="w-full max-w-[960px]">
        <h2 className="text-[#111518] text-[28px] font-bold px-4 pb-3 pt-5">
          Find a doctor
        </h2>

        <div className="flex flex-wrap max-w-[480px] items-end gap-4 px-4 py-3">
          <label className="flex flex-col w-full">
            <input
              name="specialization"
              placeholder="Specialty, condition, or procedure"
              className="form-input w-full border rounded-xl h-14 p-4"
              value={formData.specialization}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="flex flex-wrap max-w-[480px] items-end gap-4 px-4 py-3">
          <label className="flex flex-col w-full">
            <input
              name="address"
              placeholder="City, state, or zip code"
              className="form-input w-full border rounded-xl h-14 p-4"
              value={formData.address}
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col w-full">
            <input
              name="name"
              placeholder="Doctor name"
              className="form-input w-full border rounded-xl h-14 p-4"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="flex px-4 py-3 justify-start">
          <button
            onClick={handleSearch}
            className="bg-[#0b80ee] text-white font-bold rounded-full h-10 px-6"
          >
            Search
          </button>
        </div>

        <div className="px-4">
          {error && <p className="text-red-500">{error}</p>}
          {doctors.length > 0 && <DocCard doctors={doctors} />}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <Pagination
              showControls
              initialPage={1}
              page={page}
              total={totalPages}
              onChange={handlePageChange}
              className="text-black"
              color="success"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FindDoc;
