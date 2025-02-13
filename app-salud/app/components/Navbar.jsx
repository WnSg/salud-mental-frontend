// import Link from "next/link"
// import "./Navbar.css"
// // import Image from "next/image"

// export default function Navbar() {
//     return (
//         <div >
//             <nav className="navbar">
//                 <ul className="navbar-menu">
//                     <li><Link href='/'><Image src="/images/logo-bildy.png" alt="Logo Bildy" width={100}  height={50}/></Link></li>
//                     <li><Link href="/">Recursos</Link></li>
//                     <li><Link href="/">Test</Link></li>
//                     <li><Link  href="/">Mindfullness</Link></li>
//                     <li><Link href="/">Sign In</Link></li> 
//                     <li><Link href="/" >Sign Out</Link></li>
//                 </ul>
//             </nav>
//         </div>
//     )
  
// }

import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">MindCare</Link>
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
              <Link className="nav-link active" aria-current="page" href="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/test">Tests</Link>
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
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" href="#">Something else here</Link></li>
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
