import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* DESKTOP NAV */}
      <div
        className="
  hidden md:flex justify-around 
  font-semibold text-lg 
  rounded-xl 
  shadow-lg 
  backdrop-blur-md 
  bg-white/20 
  border border-white/30
  py-4 
  w-[60vw] 
  mx-auto 
  mt-4
  hover:shadow-xl transition-all duration-300
"
      >
        <Link to="/" className="hover:text-gray-600 ">
          Home
        </Link>
        <Link to="/daily" className="hover:text-gray-600 ">
          Daily Tasks
        </Link>
        <Link to="/history" className="hover:text-gray-600 ">
          History
        </Link>
      </div>

      {/* MOBILE MENU ICON */}
<div className="md:hidden fixed top-4 left-4 z-50">
  <button
    onClick={() => setIsOpen(true)}
    className="
      flex items-center justify-center
      h-8 w-8
      rounded-md
      bg-white/10
      backdrop-blur-md
      border border-white/20
      shadow-lg
      hover:bg-white/20
      transition
     "
  >
    <MdMenu className="w-auto h-6 text-black" />
  </button>
</div>

      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SLIDE-IN MENU */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h2 className="font-bold text-lg">Menu</h2>
          <MdClose
            className="h-6 w-6 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-6 px-6 py-8 font-medium text-lg">
          <Link to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/daily" onClick={() => setIsOpen(false)}>
            Daily Tasks
          </Link>
          <Link to="/history" onClick={() => setIsOpen(false)}>
            History
          </Link>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
