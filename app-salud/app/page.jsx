import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex flex-col md:flex-row items-center justify-center min-h-screen px-6 md:px-16 bg-gray-100">
      {/* Sección de información introductoria */}
      <div className="max-w-xl md:w-1/2 text-left">
        <h1 className="text-4xl font-bold text-blue-700 leading-tight">
          Bienvenido a SanaMente
        </h1>
        <p className="text-lg text-gray-700 mt-4">
          SanaMente es una plataforma de evaluación de salud mental basada en evidencia, 
          diseñada para ayudar a las personas a comprender y mejorar su bienestar emocional. 
          A través de tests científicos y recursos educativos, promovemos la prevención y 
          el acceso a información confiable.
        </p>
        <p className="text-lg text-gray-700 mt-4">
          Con un enfoque en salud pública, buscamos generar conciencia sobre trastornos como 
          la ansiedad y el estrés, proporcionando herramientas accesibles para quienes necesitan apoyo.
        </p>
      </div>

      {/* Imagen ilustrativa con estilo mejorado */}
      <div className="md:w-1/2 flex justify-center">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <Image
            src="/images/FondoSanamente.png"
            alt="Salud mental"
            width={500}
            height={500}
            className="rounded-xl"
          />
        </div>
      </div>
    </main>
  );
}
