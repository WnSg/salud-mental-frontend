"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";

const EditUserProfile = ({ params }) => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { register, handleSubmit, setValue } = useForm();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  // Verificar si el usuario está autenticado
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      router.push("/users/login");
    }
  }, [router]);

  // Cargar los datos del usuario
  useEffect(() => {
    if (!params || !isAuthenticated) return;

    const fetchParams = async () => {
      const resolvedParams = await params;
      console.log(resolvedParams);

      const { id } = resolvedParams;
      if (!id) {
        console.log("ID no disponible");
        return;
      }

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

          // Llenar el formulario con los datos actuales del usuario
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

  // Función para actualizar el perfil
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

      alert("Datos actualizados con éxito!");
      router.push(`/users/${userId}`);
    } catch (err) {
      setError("No se pudo actualizar los datos.");
    }
  };

  // Función para eliminar la cuenta
  const handleDeleteAccount = async () => {
    if (!userId) {
      setError("No se pudo obtener el ID del usuario.");
      return;
    }

    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer."
    );

    if (!confirmDelete) return;

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

      alert("Cuenta eliminada con éxito.");
      localStorage.removeItem("authToken"); // Eliminar token tras borrar cuenta
      router.push("/users/login");
    } catch (err) {
      setError("No se pudo eliminar la cuenta.");
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="edit-profile">
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="first_name">Nombre</label>
          <input
            type="text"
            {...register("first_name", { required: true })}
            defaultValue={userData.first_name}
          />
        </div>

        <div>
          <label htmlFor="last_name">Apellido</label>
          <input
            type="text"
            {...register("last_name", { required: true })}
            defaultValue={userData.last_name}
          />
        </div>

        <div>
          <label htmlFor="age">Edad</label>
          <input
            type="number"
            {...register("age", { required: true })}
            defaultValue={userData.age}
          />
        </div>

        <div>
          <label htmlFor="gender">Género</label>
          <select {...register("gender", { required: true })} defaultValue={userData.gender}>
            <option value="Hombre">Hombre</option>
            <option value="Mujer">Mujer</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div>
          <label htmlFor="nationality">Nacionalidad</label>
          <input
            type="text"
            {...register("nationality", { required: true })}
            defaultValue={userData.nationality}
          />
        </div>

        <button type="submit">Guardar cambios</button>
      </form>

      <button onClick={handleDeleteAccount} className="btn btn-danger">
        Eliminar Cuenta
      </button>

      <Link href={`/users/${userId}`} className="btn btn-outline-danger">
        Volver
      </Link>
    </div>
  );
};

export default EditUserProfile;
