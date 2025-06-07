import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
  Avatar,
} from "@heroui/react";
import { Menu } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setLogedinUser } from "../../utils/logedinUser"; // Update path if needed

export default function HeroNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.logedinUser);
  const token = localStorage.getItem("token");

  const isLoggedIn = !!loggedUser;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(setLogedinUser(null));
    navigate("/user/login");
  };

  const avatarURL = loggedUser?.user?.profilePic
    ? `http://localhost:3001/${loggedUser.user.profilePic}`
    : null;

  return (
    <header className="relative z-[999] border-b border-[#f0f2f5] bg-white">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 text-[#111518]">
          <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M39.475 21.6262..."
              fill="currentColor"
            ></path>
          </svg>
          <h2 className="text-lg font-bold tracking-[-0.015em]">
            QuickCare.com
          </h2>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#111518] ml-auto pr-6">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/find-doc"
            className="rounded-full bg-[#0b80ee] px-4 py-2 text-white text-sm font-bold"
          >
            Get Started
          </Link>

          {!isLoggedIn ? (
            <Link
              to="/user/login"
              className="rounded-full bg-[#f0f2f5] px-4 py-2 text-sm font-bold text-[#111518]"
            >
              Login
            </Link>
          ) : (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                {token ? (
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform h-10 w-10"
                    color="secondary"
                    name={loggedUser?.name || "User"}
                    size="sm"
                    src={avatarURL}
                  />
                ) : (
                  <Link
                    to="/user/login"
                    className="rounded-full bg-[#0b80ee] px-4 py-2 text-white text-sm font-bold"
                  >
                    Login
                  </Link>
                )}
              </DropdownTrigger>

              {token && (
                <DropdownMenu
                  variant="flat"
                  className="text-black border-2 border-[#dbe1e6] bg-black/5 shadow-lg bg-[#0b80ee]"
                >
                  <DropdownItem>
                    <Link to="/user/profile">Profile</Link>
                  </DropdownItem>
                  <DropdownItem color="danger" onClick={handleLogout}>
                    Sign Out
                  </DropdownItem>
                </DropdownMenu>
              )}
            </Dropdown>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="w-6 h-6 text-[#111518]" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden flex flex-col gap-3 px-4 pb-4 text-black">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
          <Link
            to="/find-doc"
            className="rounded bg-[#0b80ee] px-4 py-2 text-white text-sm font-bold"
          >
            Get Started
          </Link>
          {!isLoggedIn ? (
            <Link
              to="/user/login"
              className="rounded bg-[#f0f2f5] px-4 py-2 text-sm font-bold text-[#111518]"
            >
              Login
            </Link>
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
