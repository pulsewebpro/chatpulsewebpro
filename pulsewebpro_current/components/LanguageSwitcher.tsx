import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const { i18n, t } = useTranslation('common');
  const [open, setOpen] = useState(false);
  const locales = ['es', 'en', 'fr'];

  const switchTo = (lng: string) => {
    setOpen(false);
    router.push(router.pathname, router.asPath, { locale: lng });
  };

  return (
    <div className="relative">
      <button className="btn" onClick={() => setOpen(v=>!v)}>
        🌐 {t('switch_lang')}: {i18n.language.toUpperCase()}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 card">
          {locales.map(l => (
            <button
              key={l}
              onClick={() => switchTo(l)}
              className="block w-full text-left px-3 py-2 hover:bg-white/5 rounded"
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
