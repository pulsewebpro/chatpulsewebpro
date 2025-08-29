import Link from 'next/link';
import { useTranslation } from 'next-i18next';

export default function Footer(){
  const { t } = useTranslation('common');
  const year = new Date().getFullYear();
  return (
    <footer className="container-narrow py-10">
      <hr className="hr-soft mb-6"/>
      <div className="flex items-center justify-between gap-4 flex-wrap text-sm opacity-80">
        <div>© {year} PulseWebPro — {t('footer_rights')}</div>
        <nav className="flex items-center gap-4">
          <Link className="hover:underline" href="/legal/terms">{t('legal_terms')}</Link>
          <Link className="hover:underline" href="/legal/privacy">{t('legal_privacy')}</Link>
          <Link className="hover:underline" href="/legal/cookies">{t('legal_cookies')}</Link>
        </nav>
      </div>
    </footer>
  );
}
