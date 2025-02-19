import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import "./globals.css"; 


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sanamente",
  description: "Aplicación educativa sobre salud mental",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </head>
      <body className={`${inter.className} bg-gray-100`}>
        {/* Navbar */}
        <Navbar/>
        {/* Contenido de la Página */}
        <main className="container mx-auto p-4">{children}</main>

        {/* Íconos FontAwesome */}
        <script
          src="https://kit.fontawesome.com/6986216daf.js"
          crossOrigin="anonymous"
          async
        ></script>
      </body>
    </html>
  );
}
