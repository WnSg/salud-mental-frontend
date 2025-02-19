# salud-mental-frontend
Capstone Máster en Desarrollo de Apps y Programación Web - Aplicación Educativa sobre Salud Mental: Leysa Melina Pozo, Wolfran Noe Silva y Jennifer Herrera

# SanaMente - Frontend

SanaMente es una plataforma de evaluación de salud mental basada en evidencia, diseñada para ayudar a las personas a comprender y mejorar su bienestar emocional. Este repositorio contiene el código fuente del frontend de la aplicación, desarrollado en **Next.js** con **Tailwind CSS** para la estilización.

## 🚀 Tecnologías Utilizadas

- **Next.js** - Framework de React para desarrollo de aplicaciones web.
- **Tailwind CSS** - Framework de diseño para estilización rápida.
- **Axios** - Cliente HTTP para realizar peticiones a la API backend.
- **React Hook Form** - Manejo eficiente de formularios en React.
- **SweetAlert2** - Librería para mostrar alertas interactivas.
- **React Icons** - Iconos personalizables en React.
- **LocalStorage** - Para el manejo de sesión y almacenamiento de tokens de autenticación.

---

## 🔥 Funcionalidades Implementadas

### 📝 Autenticación de Usuarios
- **Inicio de sesión** con validación de credenciales.
- **Manejo de tokens** almacenados en `localStorage`.
- **Cierre de sesión** y eliminación del token.

### 🧠 Evaluación de Salud Mental
- Listado de **Tests de Ansiedad y Estrés**.
- Presentación de preguntas y opciones de respuesta.
- Validación para asegurar que el usuario responda todas las preguntas antes de enviar el test.
- Envío de respuestas al backend y visualización de resultados.

### 📚 Recursos Educativos
- Acceso a material informativo sobre salud mental.

### 📞 Directorio de Ayuda
- Consulta de líneas de ayuda según el país seleccionado.
- Renderizado dinámico de la información en tarjetas.

---

## 🔗 Rutas del Frontend

### **Rutas Públicas**
Estas rutas son accesibles sin autenticación:
- `/` → Página de inicio con información sobre la plataforma.
- `/test` → Listado de tests disponibles.
- `/recursos` → Recursos educativos sobre salud mental.
- `/helplines` → Directorio de ayuda basado en el país del usuario.

### **Rutas Protegidas (Requieren Autenticación)**
Estas rutas solo son accesibles si el usuario ha iniciado sesión:
- `/test/[id]` → Página para responder un test específico.
- `/perfil` → Página de perfil del usuario.
- `/historial` → Historial de tests realizados y resultados obtenidos.

---

## 🛠 Configuración y Uso

1. Clona el repositorio:
   ```sh
   git clone https://github.com/tuusuario/sanamente-frontend.git
   ```
2. Instala las dependencias:
   ```sh
   cd sanamente-frontend
   npm install
   ```
3. Crea un archivo **.env.local** con la siguiente configuración:
   ```env
   NEXT_PUBLIC_API_URL=https://capstone-salud-mental-backend.onrender.com
   ```
4. Inicia el servidor de desarrollo:
   ```sh
   npm run dev
   ```

---

## 📌 Notas Importantes

- Asegúrate de que el backend está corriendo correctamente para que las peticiones funcionen.
- El token de autenticación se almacena en `localStorage` con la clave `"authToken"`.
- El estado de sesión se maneja en el componente `Navbar.jsx`.

---

## 💡 Mejoras Futuras

- Implementación de **refresh token** para mejorar la persistencia de la sesión.
- Funcionalidad de **restablecimiento de contraseña**.
- Mejoras en la accesibilidad y optimización de carga.

---

Desarrollado con ❤️ por el equipo de SanaMente: Leysa Melina Pozo, Jennifer Herrera, Wolfran Noe Silva
