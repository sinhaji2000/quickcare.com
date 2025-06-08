import React, { useState } from "react";
import { useSelector } from "react-redux";
import useUserProfile from "../hooks/useUserProfile";

const UserProfile = () => {
  // const [activeTab, setActiveTab] = useState("Profile");
  const { user, appointments, error, loading, handleSignOut } =
    useUserProfile();

  const profileImageURL = user?.profilePic
    ? `4/${user.profilePic}`
    : "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?semt=ais_hybrid&w=740";

  if (loading)
    return (
      <p className="text-gray-600 text-center mt-10">Loading profile...</p>
    );
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="px-4 md:px-40 flex flex-1 justify-center py-5 bg-gray-100 min-h-screen">
      <div className="layout-content-container flex flex-col max-w-[960px] w-full">
        {/* Header */}
        <div className="flex p-4">
          <div className="flex w-full flex-col gap-4 md:flex-row md:justify-between md:items-center">
            <div className="flex gap-4 items-center">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
                style={{ backgroundImage: `url(${profileImageURL})` }}
              />
              <div>
                <p className="text-[#111518] text-[22px] font-bold tracking-tight">
                  {user?.name}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        {/* <div className="pb-3">
          <div className="flex border-b border-[#dbe1e6] px-4 gap-8">
            {["Profile", "Appointments", "Insurance"].map((tab) => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer pb-3 pt-4 border-b-[3px] ${
                  activeTab === tab
                    ? "border-b-[#111518] text-[#111518]"
                    : "border-b-transparent text-[#60768a]"
                }`}
              >
                <p className="text-sm font-bold tracking-[0.015em]">{tab}</p>
              </div>
            ))}
          </div>
        </div> */}

        {/* Tab Content */}
        {/* {activeTab === "Profile" && ( */}
        <>
          <h2 className="text-[#111518] text-[22px] font-bold px-4 pb-3 pt-5">
            Personal Information
          </h2>
          <div className="px-4 py-3 space-y-4 max-w-[480px]">
            {[
              { label: "Full Name", value: user?.name },
              { label: "Email", value: user?.email },
              { label: "Phone Number", value: user?.phone },
              { label: "Age", value: user?.age },
              { label: "Gender", value: user?.gender || "Not Provided" },
              { label: "Address", value: user?.address || "Not Provided" },
            ].map((field, idx) => (
              <div key={idx}>
                <p className="text-[#111518] text-base font-medium pb-2">
                  {field.label}
                </p>
                <input
                  className="form-input w-full rounded-xl text-[#111518] border border-[#dbe1e6] bg-white h-14 p-4 placeholder:text-[#60768a]"
                  value={field.value}
                  readOnly
                />
              </div>
            ))}
          </div>
        </>
        {/* )} */}

        {/* {activeTab === "Appointments" && (
          <>
            <h2 className="text-[#111518] text-[22px] font-bold px-4 pb-3 pt-5">
              Appointment History
            </h2>
            <div className="px-4 py-3">
              <div className="overflow-hidden rounded-xl border border-[#dbe1e6] bg-white">
                <table className="w-full">
                  <thead>
                    <tr className="bg-white">
                      {["Date", "Time", "Doctor", "Specialty", "Status"].map(
                        (head, i) => (
                          <th
                            key={i}
                            className="px-4 py-3 text-left text-[#111518] text-sm font-medium"
                          >
                            {head}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {appointments?.length ? (
                      appointments.map((appt, idx) => (
                        <tr key={idx} className="border-t border-[#dbe1e6]">
                          <td className="px-4 py-2 text-sm text-[#60768a]">
                            {new Date(appt.date).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-2 text-sm text-[#60768a]">
                            {appt.timeSlot}
                          </td>
                          <td className="px-4 py-2 text-sm text-[#60768a]">
                            {appt.docId?.name || "N/A"}
                          </td>
                          <td className="px-4 py-2 text-sm text-[#60768a]">
                            {appt.docId?.speclization || "N/A"}
                          </td>
                          <td className="px-4 py-2">
                            <span className="block text-center rounded-full h-8 px-4 bg-[#f0f2f5] text-sm text-[#111518] font-medium">
                              {appt.reminderSent
                                ? "Reminder Sent"
                                : "Scheduled"}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center py-4 text-[#60768a] text-sm"
                        >
                          No appointments found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === "Insurance" && (
          <div className="px-4 py-5 text-[#60768a] text-sm italic">
            Insurance section coming soon.
          </div>
        )} */}

        {/* Logout */}
        <div className="px-4 mt-6">
          <button
            onClick={handleSignOut}
            className="w-full bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
