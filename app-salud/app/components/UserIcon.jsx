"use client";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa"; 
import { useEffect, useState } from "react"; 
import { jwtDecode } from "jwt-decode";

const UserIcon = () => {
  const [userId, setUserId] = useState(null); //guarda el userId

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

    if (!token) return; // Si no hay token, no hacemos nada

    const decodedToken = jwtDecode(token);
    setUserId(decodedToken.id); // Almacena el userId en el estado
  }, []); // Solo se ejecuta una vez después de que el componente se haya montado en el cliente

  if (!userId) return null; // Si no tenemos userId, no mostramos el icono

  return (
    <Link href={`/users/${userId}`} className="user-icon">
      <FaUserCircle size={30} title="Ver perfil" />
    </Link>
  );
};

export default UserIcon;


