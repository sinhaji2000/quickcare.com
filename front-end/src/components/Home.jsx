import DocCard from "./DocCard";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Pagination } from "@heroui/react";
import { useState } from "react";
const Home = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="px-4 sm:px-8 lg:px-20 flex justify-center py-5 bg-white">
      <div className="w-full max-w-[1280px]">
        {/* Hero Section */}
        <div
          className="min-h-[480px] bg-cover bg-center bg-no-repeat flex flex-col gap-6 sm:gap-8 items-center justify-center p-4 rounded-xl text-center"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBGEt9NG1L_AP-ziqqTT8Qh8jz9sEYcB4XNMLYyvRo3NvnZKeQR44MyXYxLMqpODtIZC27bGyhIQDHaVBLWomOhP49oanAUjGzofvlHDsoYAJr9xjR6Hbu5A67xmUi3GyCKcHdTduhPpzUoP0qVmLxDPw4PkkEfSM7anw_QP4FtpYUy5HAcNxjeB7jFrMQ7ldJ1JEw-vb-ypbpfto7R7BEXon4reS6cRmaSKXAt8q3qrbRCk24xPqgDnxbPAtQjw7LVYA7lVS8R9Wc3")',
          }}
        >
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-black leading-tight max-w-3xl">
            Revolutionize Your Healthcare Scheduling
          </h1>
          <p className="text-white text-sm sm:text-base max-w-xl">
            Experience seamless appointment booking with our scheduling service.
            Find the best doctors, check availability, and book appointments
            instantly.
          </p>
          <Link to="/find-doc">
            <button className="mt-4 bg-[#0b80ee] text-white text-sm sm:text-base font-bold rounded-full h-12 px-6">
              Book an Appointment
            </button>
          </Link>
        </div>
        {/* Why Choose Section */}
        <div className="py-10 px-4 sm:px-0">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[#111518]">
            Why Choose HealthConnect?
          </h2>
          <p className="text-base text-[#111518] max-w-2xl mb-8">
            Our platform offers a range of benefits to simplify your healthcare
            journey.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Smart Scheduling",
                description:
                  "Our algorithms intelligently match you with the best doctors based on your needs and preferences.",
              },
              {
                title: "24/7 Availability",
                description:
                  "Book appointments anytime, anywhere, with our round-the-clock scheduling service.",
              },
              {
                title: "Personalized Recommendations",
                description:
                  "Receive tailored doctor recommendations based on your medical history and reviews from other patients.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="border border-gray-200 p-5 rounded-lg bg-white flex flex-col gap-2"
              >
                <div className="text-[#111518] text-xl font-bold">
                  {item.title}
                </div>
                <p className="text-[#60768a] text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <DocCard page={currentPage} />

        <div className="flex justify-center pb-16">
          <Pagination
            showControls
            color="success"
            initialPage={1}
            page={currentPage}
            total={5} // you can fetch and use total from API if dynamic
            onChange={(newPage) => setCurrentPage(newPage)}
            className="text-black"
          />
        </div>
        {/* Call-to-Action Section */}
        <div className="text-center py-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#111518] mb-2">
            Ready to Experience the Future of Healthcare Scheduling?
          </h2>
          <p className="text-[#111518] text-base max-w-2xl mx-auto mb-6">
            Sign up today and take control of your healthcare appointments with
            HealthConnect.
          </p>
          <button
            className="bg-[#0b80ee] text-white text-sm sm:text-base font-bold rounded-full h-12 px-6"
            onClick={() => navigate("/find-doc")}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
