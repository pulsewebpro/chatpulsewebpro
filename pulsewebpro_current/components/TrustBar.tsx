import { useTranslation } from 'next-i18next';

export default function TrustBar(){
  const { t } = useTranslation('common');
  const logos = ['ACME', 'NOVA', 'ORBIT', 'HYPER', 'ATLAS', 'APEX'];
  return (
    <section className="container-narrow py-8">
      <div className="card flex items-center justify-between gap-4 flex-wrap">
        <span className="opacity-80">{t('trust_title')}</span>
        <div className="flex items-center gap-6 opacity-70">
          {logos.map((l, i) => (
            <span key={i} className="tracking-widest">{l}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
