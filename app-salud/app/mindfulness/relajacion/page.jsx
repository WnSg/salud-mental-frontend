import Link from "next/link";
import './relajacion.css';

export default function RelaxPage() {
  return (
    <div className="container">
      <h1 className="title">Relaja el cuerpo, relaja la mente - 9 minutos</h1>
      <p className="text">
        Cuerpo y mente son un todo, el estado del uno influye en el estado del otro. En esta meditación practicamos relajar el cuerpo para ayudar a que nuestra mente también pueda encontrar descanso.
      </p>
      <p className="text">
        ¡Sólo 12 minutos para cuando el tiempo apremia!
      </p>
      <audio controls className="audio-player">
        <source src="/audio/relajacion.mp3" type="audio/mp3" />
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