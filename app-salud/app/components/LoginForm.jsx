'use client'
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const { register, handleSubmit } = useForm();
  const [responseMessage, setResponseMessage] = useState("");
  const router = useRouter();

  // Verifica si estamos en el cliente 
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Esto asegura que el código solo se ejecute en el cliente
    setIsClient(true);
  }, []);

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
        // Al recibir la respuesta con el token, lo guardamos en localStorage
        const token = result.token; // Obtenemos el token desde la respuesta
        if (token && isClient) {
          localStorage.setItem("authToken", token); // Guardamos el token solo en el cliente
          setResponseMessage("¡Login exitoso!");

          // Redirigimos al dashboard después de guardar el token
          setTimeout(() => {
            router.push("/");
          }, 1500);
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
