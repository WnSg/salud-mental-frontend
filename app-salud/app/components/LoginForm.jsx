"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { jwtDecode } from "jwt-decode";

export default function LoginForm() {
  const { register, handleSubmit } = useForm();
  const [responseMessage, setResponseMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "https://capstone-salud-mental-backend.onrender.com/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (response.ok) {
        const token = result.token; // Obtenemos el token
        if (token) {
          localStorage.setItem("authToken", token); // Guardamos el token en localStorage

          // Decodificar el token para obtener el ID del usuario
          // const decodedToken = jwtDecode(token);

          setResponseMessage("¡Login exitoso!");

          // Redirigimos al perfil del usuario
          setTimeout(() => {
            window.location.reload(); //  recarga para actualizar el estado del Navbar
          }, 1500);
          router.push("/");
        }
      } else {
        setResponseMessage(result.message || "Error en el login.");
      }
    } catch (error) {
      setResponseMessage("Error en el login. Intenta de nuevo.");
    }
  };

  return (
    <div className="container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" {...register("email", { required: true })} />
        </div>

        <div>
          <label htmlFor="password">Contraseña</label>
          <input type="password" {...register("password", { required: true })} />
        </div>

        <button type="submit">Iniciar sesión</button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}
