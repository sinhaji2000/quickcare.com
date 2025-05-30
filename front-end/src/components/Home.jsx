// src/components/Home.js


import DocCard from "./DocCard";
const Home = () => {
  
  return (
    <div className="px-40 flex flex-1 justify-center py-5 bg-white">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="@container">
          <div className="@[480px]:p-4">
            <div
              className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBGEt9NG1L_AP-ziqqTT8Qh8jz9sEYcB4XNMLYyvRo3NvnZKeQR44MyXYxLMqpODtIZC27bGyhIQDHaVBLWomOhP49oanAUjGzofvlHDsoYAJr9xjR6Hbu5A67xmUi3GyCKcHdTduhPpzUoP0qVmLxDPw4PkkEfSM7anw_QP4FtpYUy5HAcNxjeB7jFrMQ7ldJ1JEw-vb-ypbpfto7R7BEXon4reS6cRmaSKXAt8q3qrbRCk24xPqgDnxbPAtQjw7LVYA7lVS8R9Wc3")',
              }}
            >
              <div className="flex flex-col gap-2 text-center">
                <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                  Revolutionize Your Healthcare Scheduling
                </h1>
                <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                  Experience seamless appointment booking with our scheduling
                  service. Find the best doctors, check availability, and book
                  appointments instantly.
                </h2>
              </div>
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#0b80ee] text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
                <span className="truncate">Book an Appointment</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10 px-4 py-10 @container">
          <div className="flex flex-col gap-4">
            <h1 className="text-[#111518] tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
              Why Choose HealthConnect?
            </h1>
            <p className="text-[#111518] text-base font-normal leading-normal max-w-[720px]">
              Our platform offers a range of benefits to simplify your
              healthcare journey.
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-0">
            {[
              {
                title: "Smart Scheduling",
                description:
                  "Our algorithms intelligently match you with the best doctors based on your needs and preferences.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-96-88v64a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm59.16,30.45L152,176h16a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136,23.76,23.76,0,0,1,171.16,150.45Z" />
                  </svg>
                ),
              },
              {
                title: "24/7 Availability",
                description:
                  "Book appointments anytime, anywhere, with our round-the-clock scheduling service.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z" />
                  </svg>
                ),
              },
              {
                title: "Personalized Recommendations",
                description:
                  "Receive tailored doctor recommendations based on your medical history and reviews from other patients.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z" />
                  </svg>
                ),
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-1 gap-3 rounded-lg border border-[#dbe1e6] bg-white p-4 flex-col"
              >
                <div className="text-[#111518]">{item.icon}</div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[#111518] text-base font-bold leading-tight">
                    {item.title}
                  </h2>
                  <p className="text-[#60768a] text-sm font-normal leading-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="@container">
          <div className="flex flex-col justify-end gap-6 px-4 py-10 @[480px]:gap-8 @[480px]:px-10 @[480px]:py-20">
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-[#111518] tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
                Ready to Experience the Future of Healthcare Scheduling?
              </h1>
              <p className="text-[#111518] text-base font-normal leading-normal max-w-[720px]">
                Sign up today and take control of your healthcare appointments
                with HealthConnect.
              </p>
            </div>
            <div className="flex flex-1 justify-center">
              <div className="flex justify-center">
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#0b80ee] text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] grow">
                  <span className="truncate">Get Started</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
