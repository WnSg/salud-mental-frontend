"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const { register, handleSubmit, reset } = useForm();
  const [responseMessage, setResponseMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "https://capstone-salud-mental-backend.onrender.com/users/register",
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
        setResponseMessage("¡Registro exitoso!");
        reset(); 

        // Redirige al login después del registro
        setTimeout(() => {
          router.push("/users/login");
        }, 1500);
      } else {
        setResponseMessage(result.message || "Ocurrió un error.");
      }
    } catch (error) {
      setResponseMessage("Error en el registro. Intenta de nuevo.");
    }
  };

  return (
    <div className="container">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="first_name">Nombre</label>
          <input {...register("first_name", { required: true })} />
        </div>
        
        <div>
          <label htmlFor="last_name">Apellido</label>
          <input {...register("last_name", { required: true })} />
        </div>
        
        <div>
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" {...register("email", { required: true })} />
        </div>
        
        <div>
          <label htmlFor="password">Contraseña</label>
          <input type="password" {...register("password", { required: true })} />
        </div>

        <div>
          <label htmlFor="age">Edad</label>
          <input type="number" {...register("age", { required: true, min: 1 })} />
        </div>

        <div>
          <label htmlFor="gender">Género</label>
          <select {...register("gender", { required: true })}>
            <option value="Mujer">Mujer</option>
            <option value="Hombre">Hombre</option>
            <option value="Otro">Otro</option>
            <option value="Prefiero no decirlo">Prefiero no decirlo</option>
          </select>
        </div>

        <div>
          <label htmlFor="nationality">Nacionalidad</label>
          <input {...register("nationality", { required: true })} />
        </div>

        <button type="submit">Registrarse</button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}
