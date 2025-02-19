"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/sanamente.png"
            alt="Logo Sanamente"
            width={100}
            height={50}
            priority
          />
        </Link>

        {/* Menú principal */}
        <div className="hidden md:flex items-center space-x-6 text-gray-700">
          <Link href="/" className="hover:text-blue-500 transition duration-200">
            Home
          </Link>
          <Link href="/test" className="hover:text-blue-500 transition duration-200">
            Tests
          </Link>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="hover:text-blue-500 transition duration-200 focus:outline-none"
            >
              Recursos
            </button>
            {dropdownOpen && (
              <ul className="absolute left-0 mt-2 bg-white shadow-md rounded-lg w-40 p-2 space-y-2">
                <li>
                  <Link href="/recursos/estres" className="block hover:text-blue-500">
                    Estrés
                  </Link>
                </li>
                <li>
                  <Link href="/recursos/ansiedad" className="block hover:text-blue-500">
                    Ansiedad
                  </Link>
                </li>
              </ul>
            )}
          </div>
          <Link href="/mindfulness" className="hover:text-blue-500 transition duration-200">
            Mindfulness
          </Link>
        </div>

        {/* Barra de búsqueda y botones */}
        <div className="flex items-center space-x-3">
          <input
            type="search"
            placeholder="Buscar..."
            className="border px-3 py-2 rounded-md focus:outline-none w-40 md:w-52 text-gray-700"
          />
          <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition text-sm flex items-center justify-center w-[90px]">
            Buscar
          </button>

          {/* Botón de Login con icono */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-sm w-[90px]"
            >
              <FaUser className="mr-2" /> Salir
            </button>
          ) : (
            <Link
              href="/users/login"
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition text-sm w-[90px]"
            >
              <FaUser className="mr-2" /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
