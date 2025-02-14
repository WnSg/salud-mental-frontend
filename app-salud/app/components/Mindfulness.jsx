import Link from 'next/link';
import './Mindfulness.css';

const mindfulnessData = [
  {
    id: 1,
    title: 'Reconocer el estrés',
    description: 'Practicamos localizar y abrirnos a las sensaciones físicas que se crean cuando algo nos estresa.',
    link: '/mindfulness/estres',
    image: '/images/estres.jpg'
  },
  {
    id: 2,
    title: 'Relaja cuerpo y mente',
    description: 'Ayuda a que nuestra mente también pueda encontrar descanso.',
    link: '/mindfulness/relajacion',
    image: '/images/relajacion.jpg'
  },
  {
    id: 3,
    title: 'Reconocer emociones',
    description: 'Exploramos emociones que sentimos de una forma abierta y sin juzgar.',
    link: '/mindfulness/emociones',
    image: '/images/emociones.jpg'
  }
];

const MindfulnessSection = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Mindfulness</h2>
      <div className="row">
        {mindfulnessData.map((item) => (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="card" style={{ width: '18rem' }}>
              <img src={item.image} className="card-img-top" alt={item.title} />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
                <Link href={item.link} className="custom-btn">
                  Leer más
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MindfulnessSection;
