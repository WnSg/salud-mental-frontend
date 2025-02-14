import Link from "next/link";
import './estres.css';

export default function StressPage() {
  return (
    <div className="container">
      <h1 className="title">Reconocer estrés- 12 minutos</h1>
      <p className="text">
      En esta meditación practicamos localizar y abrirnos a las sensaciones físicas que se crean cuando algo nos estresa. Esta apertura y aceptación nos ayuda a que nos sintamos menos atrapados por el estrés.
      </p>
      <p className="text">
        ¡Sólo 12 minutos para cuando el tiempo apremia!
      </p>
      <audio controls className="audio-player">
        <source src="/audio/estres.mp3" type="audio/mp3" />
        Tu navegador no soporta la reproducción de audio.
      </audio>
      <p className="text">
        Nos encantaría saber qué te ha parecido esta meditación guiada, si te ha gustado o si piensas que se puede mejorar por favor déjanos un comentario más abajo ¡nos ayudará a que sigamos subiendo nuevas (y mejores) meditaciones gratis!
      </p>
      <Link href="/mindfulness" className="link">
        VOLVER A LAS MEDITACIONES GUIADAS
      </Link>
    </div>
  );
}