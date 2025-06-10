import React, { useState } from "react";

const sidebarItems = [
  { label: "Dashboard", icon: /* ...svg... */ (
    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
      <path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"></path>
    </svg>
  ) },
  { label: "Appointments", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
      <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-96-88v64a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm59.16,30.45L152,176h16a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136,23.76,23.76,0,0,1,171.16,150.45Z"></path>
    </svg>
  ) },
  { label: "Patients", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
      <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></path>
    </svg>
  ) },
  { label: "Chat", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
      <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"></path>
    </svg>
  ) },
];

const SideBar = () => {
  const [active, setActive] = useState("Dashboard");

  return (
    <div className="layout-content-container flex flex-col w-80">
      <div className="flex h-full min-h-[700px] flex-col justify-between bg-white p-4">
        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBiHlPvKtL3iT9nFoE_v0KZNGKMQXREtTTBcpPYI29TPiQFLgKY_u4zTYbygSGvVqNvihXLXFyZim_KdXnKe0jvyQea87modLHeo8HtBImAxOquQJHjB8cX2cCBW13tygEZZl8ztedFHUn5D6Zq4XZy08DkOnOWoMxnui-OzS7hukgArgn_ooK3L-1_1i-GU1NAJ3FpK--zs4SHfrzyripF4p1nxJmgMYjE_OmR7ag4-JW8-Mj0N5DIgiNd20DB5s13G9DzCeBSRL19")',
              }}
            ></div>
            <h1 className="text-[#111518] text-base font-medium leading-normal">
              Dr. Amelia
            </h1>
          </div>
          <div className="flex flex-col gap-2">
            {sidebarItems.map((item) => (
              <div
                key={item.label}
                onClick={() => setActive(item.label)}
                className={`flex items-center gap-3 px-3 py-2  cursor-pointer  border-b-[3px] ${
                  active === item.label ?   "border-b-[#111518] text-[#111518]" : "border-b-transparent text-[#60768a]"
                }`}
              >
                <div className="text-[#111518]">{item.icon}</div>
                <p className="text-[#111518] text-sm font-medium leading-normal">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3 px-3 py-2 cursor-pointer">
            <div className="text-[#111518]">
              {/* Logout Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
              </svg>
            </div>
            <p className="text-[#111518] text-sm font-medium leading-normal">
              Logout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;