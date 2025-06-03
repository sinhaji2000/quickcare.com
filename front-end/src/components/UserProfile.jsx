import React from 'react';
import useUserProfile from '../hooks/useUserProfile';
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { user, appointments, error, loading, handleSignOut } =
    useUserProfile(); // ✅ fixed
  console.log(appointments);
  if (loading) {
    return (
      <p className="text-gray-600 text-center mt-10">Loading profile...</p>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  return (
    <div className="px-40 flex flex-1 justify-center py-5 bg-gray-100 min-h-screen">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        {/* Profile Header */}
        <div className="flex p-4 @container">
          <div className="flex w-full flex-col gap-4 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
            <div className="flex gap-4">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
                style={{
                  backgroundImage: `url(${"https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?semt=ais_hybrid&w=740"})`,
                }}
              />
              <div className="flex flex-col justify-center">
                <p className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em]">
                  {user.name}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="pb-3">
          <div className="flex border-b border-[#dbe1e6] px-4 gap-8">
            <div className="flex flex-col items-center justify-center border-b-[3px] border-b-[#111518] text-[#111518] pb-[13px] pt-4">
              <p className="text-sm font-bold tracking-[0.015em]">Profile</p>
            </div>
            <div className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#60768a] pb-[13px] pt-4">
              <p className="text-sm font-bold tracking-[0.015em]">
                Appointments
              </p>
            </div>
            <div className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#60768a] pb-[13px] pt-4">
              <p className="text-sm font-bold tracking-[0.015em]">Insurance</p>
            </div>
          </div>
        </div>

        {/* Personal Info */}
        <h2 className="text-[#111518] text-[22px] font-bold tracking-[-0.015em] px-4 pb-3 pt-5">
          Personal Information
        </h2>
        <div className="px-4 py-3 space-y-4 max-w-[480px]">
          {[
            { label: "Full Name", value: user.name },
            { label: "Email", value: user.email },
            { label: "Phone Number", value: user.phone },
            { label: "Age", value: user.age },
            { label: "Gender", value: user.gender },
            { label: "Address", value: user.address },
          ].map((field, idx) => (
            <div key={idx} className="flex flex-col">
              <p className="text-[#111518] text-base font-medium pb-2">
                {field.label}
              </p>
              <input
                className="form-input flex w-full min-w-0 resize-none overflow-hidden rounded-xl text-[#111518] border border-[#dbe1e6] bg-white h-14 placeholder:text-[#60768a] p-[15px] text-base font-normal"
                value={field.value}
                readOnly
              />
            </div>
          ))}
        </div>

        {/* Appointment History */}
        <h2 className="text-[#111518] text-[22px] font-bold tracking-[-0.015em] px-4 pb-3 pt-5">
          Appointment History
        </h2>
        <div className="px-4 py-3">
          <div className="overflow-hidden rounded-xl border border-[#dbe1e6] bg-white">
            <table className="w-full">
              <thead>
                <tr className="bg-white">
                  <th className="px-4 py-3 text-left text-[#111518] text-sm font-medium">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-[#111518] text-sm font-medium">
                    Time
                  </th>
                  <th className="px-4 py-3 text-left text-[#111518] text-sm font-medium">
                    Doctor
                  </th>
                  <th className="px-4 py-3 text-left text-[#111518] text-sm font-medium">
                    Specialty
                  </th>
                  <th className="px-4 py-3 text-left text-[#111518] text-sm font-medium">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt, index) => (
                  <tr key={index} className="border-t border-[#dbe1e6]">
                    <td className="px-4 py-2 text-[#60768a] text-sm">
                      {new Date(appt.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-[#60768a] text-sm">
                      {appt.timeSlot}
                    </td>
                    <td className="px-4 py-2 text-[#60768a] text-sm">
                      {appt.docId.name || "N/A"}{" "}
                      {/* You can populate doctor names later */}
                    </td>
                    <td className="px-4 py-2 text-[#60768a] text-sm">
                      {appt.docId.speclization}{" "}
                    </td>
                    <td className="px-4 py-2">
                      <button className="flex items-center justify-center rounded-full h-8 px-4 bg-[#f0f2f5] text-[#111518] text-sm font-medium w-full">
                        <span className="truncate">
                          {appt.reminderSent ? "Reminder Sent" : "Scheduled"}
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Logout Button */}
        <div className="px-4 mt-6">
          <Link to="/chat/682c473c7c00b62fd3c1fd8d">
            <button
              onClick={handleSignOut}
              className="w-full bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition"
            >
              Logout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
