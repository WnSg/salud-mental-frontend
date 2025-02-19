"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UserProfilePage = ({ params }) => {
  const [unwrappedParams, setUnwrappedParams] = useState(null);

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setUnwrappedParams(resolvedParams);
    };
    fetchParams();
  }, [params]);

  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!unwrappedParams) return;

    const { id } = unwrappedParams;

    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/users/login");
        return;
      }

      try {
        const response = await fetch(
          `https://capstone-salud-mental-backend.onrender.com/users/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario.");
        }

        const data = await response.json();
        setUserData(data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [unwrappedParams, router]);

  if (loading)
    return <p className="text-center text-lg text-gray-700">Cargando...</p>;
  if (error)
    return <p className="text-center text-red-500 font-semibold">Error: {error}</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Perfil de Usuario</h2>
        <div className="mb-4">
          <p className="text-gray-700">
            <strong>Nombre:</strong> {userData.first_name} {userData.last_name}
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> {userData.email}
          </p>
          <p className="text-gray-700">
            <strong>Edad:</strong> {userData.age}
          </p>
          <p className="text-gray-700">
            <strong>Género:</strong> {userData.gender}
          </p>
          <p className="text-gray-700">
            <strong>Nacionalidad:</strong> {userData.nationality}
          </p>
          <p className="text-gray-700">
            <strong>Registrado el:</strong>{" "}
            {new Date(userData.created_at).toLocaleDateString()}
          </p>
        </div>
        <Link
          href={`/users/udp/${userData.id}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full mt-4 text-center transition-all duration-200"
          >
          Editar Perfil
        </Link>
      </div>
    </div>
  );
};

export default UserProfilePage;
