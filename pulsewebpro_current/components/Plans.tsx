import { useTranslation } from 'next-i18next';

export default function Plans(){
  const { t } = useTranslation('common');
  const tiers = [
    { name: t('plan_basic'), price: 5, features: ['1 proyecto', 'Hosting básico', 'Soporte por email'] },
    { name: t('plan_pro'), price: 39, features: ['Proyectos ilimitados', 'Hosting rápido', 'Dominio + SSL', 'Soporte prioritario'] },
    { name: t('plan_elite'), price: 59, features: ['Todo Pro', 'Plantillas premium', 'Asesoría UX', 'Integraciones avanzadas'] },
  ];
  return (
    <section className="container-narrow py-14">
      <h2 className="text-2xl font-bold mb-6">{t('plans_title')} <span className="opacity-60 text-sm">{t('annual_discount')}</span></h2>
      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <div key={tier.name} className="card">
            <div className="flex items-baseline gap-2">
              <h3 className="text-xl font-semibold">{tier.name}</h3>
              <div className="ml-auto text-3xl font-extrabold">{tier.price}€<span className="text-sm opacity-60"> {t('per_month')}</span></div>
            </div>
            <ul className="mt-4 space-y-2 text-sky-100/80 text-sm">
              {tier.features.map(f => <li key={f}>• {f}</li>)}
            </ul>
            <div className="mt-5">
              <button className="btn w-full">Elegir</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
