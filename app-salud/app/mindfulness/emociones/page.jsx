import Link from "next/link";
import './emociones.css';

export default function EmocionesPage() {
  return (
    <div className="container">
      <h1 className="title">Reconocer emociones - 10 minutos</h1>
      <p className="text">
        En esta meditación exploramos las distintas emociones que sentimos de una forma abierta, con interés, compasión, amabilidad y sin juzgar. Investigamos también cómo estas emociones se manifiestan físicamente en el cuerpo y observamos esa conexión entre cuerpo y mente.
      </p>
      <p className="text">
        ¡Sólo 10 minutos para cuando el tiempo apremia!
      </p>
      <audio controls className="audio-player">
        <source src="/audio/emociones.mp3" type="audio/mp3" />
        Tu navegador no soporta la reproducción de audio.
      </audio>

      <Link href="/mindfulness" className="link">
        VOLVER A LAS MEDITACIONES GUIADAS
      </Link>
    </div>
  );
}
