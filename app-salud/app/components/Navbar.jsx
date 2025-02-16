"use client"; 

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import UserIcon from "./UserIcon";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token); // Si el token existe, el usuario está logueado
  }, []); // se ejecuta una vez cuando el componente se monta

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          <Image
            src="/images/sanamente.png"
            alt="Logo Sanamente"
            width={100}
            height={50}
            className="logo"
            priority
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" href="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/test">
                Tests
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Recursos
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" href="/recursos/estres">Estrés</Link></li>
                <li><Link className="dropdown-item" href="/recursos/ansiedad">Ansiedad</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/mindfulness">Mindfulness</Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>

          {/* Mostrar el icono de perfil y logout si el usuario está logueado */}
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <UserIcon />
              </li>
              <li className="nav-item">
                <Link href="/" onClick={handleLogout} className="btn btn-outline-danger">
                  Salir
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link href="/users/login">Login</Link>
            </li>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
