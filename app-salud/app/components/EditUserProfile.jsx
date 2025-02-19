"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Swal from "sweetalert2";

const EditUserProfile = ({ params }) => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { register, handleSubmit, setValue } = useForm();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      router.push("/users/login");
    }
  }, [router]);

  useEffect(() => {
    if (!params || !isAuthenticated) return;

    const fetchParams = async () => {
      const resolvedParams = await params;
      const { id } = resolvedParams;
      if (!id) return;

      setUserId(id);

      const fetchUserData = async () => {
        const token = localStorage.getItem("authToken");
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
          setValue("first_name", data.user.first_name);
          setValue("last_name", data.user.last_name);
          setValue("age", data.user.age);
          setValue("gender", data.user.gender);
          setValue("nationality", data.user.nationality);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    };

    fetchParams();
  }, [params, isAuthenticated, router, setValue]);

  const onSubmit = async (data) => {
    if (!userId) {
      setError("No se pudo obtener el ID del usuario.");
      return;
    }

    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `https://capstone-salud-mental-backend.onrender.com/users/udp/${userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar los datos.");
      }

      Swal.fire("Éxito", "Datos actualizados con éxito!", "success").then(() => {
        router.push(`/users/${userId}`);
      });
    } catch (err) {
      setError("No se pudo actualizar los datos.");
    }
  };

  const handleDeleteAccount = async () => {
    if (!userId) {
      setError("No se pudo obtener el ID del usuario.");
      return;
    }

    const confirmDelete = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirmDelete.isConfirmed) return;

    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `https://capstone-salud-mental-backend.onrender.com/users/del/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar la cuenta.");
      }

      Swal.fire("Cuenta eliminada", "Tu cuenta ha sido eliminada.", "success").then(() => {
        localStorage.removeItem("authToken");
        router.push("/users/login");
      });
    } catch (err) {
      setError("No se pudo eliminar la cuenta.");
    }
  };

  if (loading) return <p className="text-center text-lg">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Editar Perfil</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input type="text" {...register("first_name", { required: true })} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Apellido</label>
            <input type="text" {...register("last_name", { required: true })} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Edad</label>
            <input
              type="number"
              {...register("age", { required: true })}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Género</label>
            <select
              {...register("gender", { required: true })}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Nacionalidad</label>
            <input
              type="text"
              {...register("nationality", { required: true })}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded-md">Guardar cambios</button>
        </form>
        <button onClick={handleDeleteAccount} className="w-full bg-red-600 text-white p-2 rounded-md mt-4">Eliminar Cuenta</button>
        <Link href={`/users/${userId}`} className="block text-center mt-4 text-indigo-600 hover:underline">Volver al perfil</Link>
      </div>
    </div>
  );
};

export default EditUserProfile;
