import { useTranslation } from 'next-i18next';

const data = [
  { name: 'Lucía G.', role: 'Emprendedora', text: 'Pensé que sería complicado, pero Pulse me montó un sitio en minutos. Pude vender el mismo día.' },
  { name: 'Marc D.', role: 'Fotógrafo', text: 'Me entendió el estilo al toque. El preview me ayudó a cerrar 3 clientes en una semana.' },
  { name: 'Ana R.', role: 'Restaurantera', text: 'El chat es muy claro, te guía y no se va por las ramas. Ahorro tiempo y dinero.' },
  { name: 'Tom B.', role: 'Freelancer', text: 'La opción Pro vale cada euro. Entregué portfolio con look premium sin desesperarme.' },
  { name: 'Nora P.', role: 'Tienda de café', text: 'Literalmente: “antes de que se enfríe el café”. Me encantó el tono humano y cercano.' },
  { name: 'Youssef K.', role: 'Agencia', text: 'Lo usamos como primer paso con clientes. Preview + chat = cero reuniones eternas.' },
];

export default function Testimonials(){
  const { t } = useTranslation('common');
  return (
    <section className="container-narrow py-14">
      <h2 className="text-2xl font-bold mb-6">{t('testimonials_title')}</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {data.map((x) => (
          <div key={x.name} className="card">
            <div className="font-semibold">{x.name}</div>
            <div className="text-xs opacity-70">{x.role}</div>
            <p className="mt-3 opacity-90">{x.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
