import React, { useState } from "react";
import useUserProfile from "../hooks/useUserProfile";

const UserProfile1 = () => {
  const { user, appointments, error, loading, handleSignOut } =
    useUserProfile();
  const [activeTab, setActiveTab] = useState("Profile");
  const [appointmentType, setAppointmentType] = useState("Upcoming");

  const filteredAppointments = appointments?.filter((appt) => {
    const today = new Date();
    const apptDate = new Date(appt.date);
    if (appointmentType === "Upcoming") return apptDate >= today;
    if (appointmentType === "Past") return apptDate < today;
    return true;
  }) .sort((a, b) => new Date(a.date) - new Date(b.date));
  console.log("Filtered Appointments:", filteredAppointments);
  const avatarURL = user?.profilePic
    ? `http://localhost:3001/${user.profilePic}`
    : null;

  if (loading) return <p>Loading...</p>;

  return (
    <div
      className="relative flex min-h-screen flex-col bg-white overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="flex flex-grow flex-col h-full">
        <div className="flex justify-center gap-1 px-6 py-5 flex-grow">
          {/* Sidebar */}
          <div className="flex flex-col w-80">
            <div className="flex flex-col justify-between min-h-[700px] bg-white p-4">
              <div className="flex flex-col gap-4">
                <div className="flex gap-3 items-center">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                    style={{
                      backgroundImage: `url(${avatarURL})`,
                    }}
                  ></div>
                  <h1 className="text-[#111418] text-base font-medium leading-normal">
                    {user?.name || "User Name"}
                  </h1>
                </div>
                <nav className="flex flex-col gap-2">
                  {[
                    "Profile",
                    "Appointments",
                    "Messages",
                    "Payments",
                    "Setting",
                  ].map((tab) => (
                    <div
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`cursor-pointer pb-3 pt-4 border-b-[3px] ${
                        activeTab === tab
                          ? "border-b-[#111518] text-[#111518]"
                          : "border-b-transparent text-[#60768a]"
                      }`}
                    >
                      <p className="text-sm font-bold tracking-[0.015em]">
                        {tab}
                      </p>
                    </div>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-grow px-4">
            {activeTab === "Profile" && (
              <>
                <h2 className="text-[#111518] text-[22px] font-bold px-4 pb-3 pt-5 text-black">
                  Personal Information
                </h2>
                <div className="px-4 py-3 space-y-4 max-w-[480px]">
                  {[
                    { label: "Full Name", value: user?.name },
                    { label: "Email", value: user?.email },
                    { label: "Phone Number", value: user?.phone },
                    { label: "Age", value: user?.age },
                    { label: "Gender", value: user?.gender || "Not Provided" },
                    {
                      label: "Address",
                      value: user?.address || "Not Provided",
                    },
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
            )}

            {activeTab === "Appointments" && (
              <div className="flex flex-col max-w-[960px] flex-grow">
                <div className="flex justify-between gap-3 p-4">
                  <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight min-w-72">
                    Appointments
                  </p>
                </div>

                <div className="border-b border-[#dbe0e6] px-4 gap-8 flex">
                  {["Upcoming", "Past"].map((label) => (
                    <a
                      key={label}
                      href="#"
                      onClick={() => setAppointmentType(label)}
                      className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${
                        appointmentType === label
                          ? "border-b-[#111418] text-[#111418]"
                          : "border-b-transparent text-[#60758a]"
                      }`}
                    >
                      <p className="text-sm font-bold leading-normal tracking-[0.015em]">
                        {label}
                      </p>
                    </a>
                  ))}
                </div>

                {filteredAppointments?.length === 0 ? (
                  <p className="px-4 py-6 text-[#60758a] text-base">
                    No {appointmentType.toLowerCase()} appointments found.
                  </p>
                ) : (
                  filteredAppointments.map((appt, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-14"
                          style={{
                            backgroundImage: `url(${
                              appt.doctorImage ||
                              "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?semt=ais_hybrid&w=740"
                            })`,
                          }}
                        ></div>
                        <div className="flex flex-col justify-center">
                          <p className="text-[#111418] text-base font-medium leading-normal line-clamp-1">
                            {appt.docId.name || "Doctor Name"}
                          </p>
                          <p className="text-[#60758a] text-sm font-normal leading-normal line-clamp-2">
                            {appt.timeSlot || "Time not available"}
                          </p>
                          <p className="text-[#60758a] text-sm font-normal leading-normal line-clamp-2">
                            {new Date(appt.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-medium leading-normal w-fit">
                        <span className="truncate">Join</span>
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === "Messages" && (
              <div className="p-4 text-black">Coming soon...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile1;
