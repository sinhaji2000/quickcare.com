import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
  Avatar,
} from "@heroui/react";
import { Menu } from "lucide-react";

export default function HeroNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/user/login");
  };

  return (
    <header className="relative z-[999] border-b border-[#f0f2f5] bg-white">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
        {/* Brand */}
        <div
          className="flex items-center gap-3 text-[#111518] cursor-pointer"
          onClick={() => navigate("/")}
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
              fill="currentColor"
            ></path>
          </svg>
          <h2 className="text-lg font-bold tracking-[-0.015em]">
            QuickCare.com
          </h2>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#111518] ml-auto pr-6">
          <span className="cursor-pointer" onClick={() => navigate("/")}>
            Home
          </span>
          <span
            className="cursor-pointer"
            onClick={() => navigate("/services")}
          >
            Services
          </span>
          <span className="cursor-pointer" onClick={() => navigate("/contact")}>
            Contact
          </span>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => navigate("/find-doc")}
            className="rounded-full bg-[#0b80ee] px-4 py-2 text-white text-sm font-bold"
          >
            Get Started
          </button>

          {!isLoggedIn ? (
            <button
              onClick={() => navigate("/user/login")}
              className="rounded-full bg-[#f0f2f5] px-4 py-2 text-sm font-bold text-[#111518]"
            >
              Login
            </button>
          ) : (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform h-10 w-10"
                  color="secondary"
                  name="User"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=user"
                />
              </DropdownTrigger>
              <DropdownMenu variant="flat" className="text-black">
                <DropdownItem onClick={() => navigate("/user/profile")}>
                  Profile
                </DropdownItem>
                <DropdownItem color="danger" onClick={handleLogout}>
                  Sign Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden ">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="w-6 h-6 text-[#111518]" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden flex flex-col gap-3 px-4 pb-4 text-black">
          <span className="cursor-pointer " onClick={() => navigate("/")}>
            Home
          </span>
          <span
            className="cursor-pointer"
            onClick={() => navigate("/services")}
          >
            Services
          </span>
          <span className="cursor-pointer" onClick={() => navigate("/contact")}>
            Contact
          </span>
          <button
            onClick={() => navigate("/find-doc")}
            className="rounded bg-[#0b80ee] px-4 py-2 text-white text-sm font-bold"
          >
            Get Started
          </button>
          {!isLoggedIn ? (
            <button
              onClick={() => navigate("/user/login")}
              className="rounded bg-[#f0f2f5] px-4 py-2 text-sm font-bold text-[#111518]"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="rounded bg-red-500 px-4 py-2 text-white text-sm font-bold"
            >
              Sign Out
            </button>
          )}
        </div>
      )}
    </header>
  );
}
