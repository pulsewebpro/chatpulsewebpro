import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Hero from '@/components/Hero';
import ChatWizard from '@/components/ChatWizard';
import PreviewCard from '@/components/PreviewCard';
import Plans from '@/components/Plans';
import TrustBar from '@/components/TrustBar';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function Home(){
  const [started, setStarted] = useState(false);
  const [brand, setBrand] = useState('Mi Marca');
  const [tagline, setTagline] = useState('Tu web antes de que se te enfríe el café');
  const [color, setColor] = useState('#38bdf8');

  return (
    <>
      <Head>
        <title>PulseWebPro — Tu web antes de que se te enfríe el café</title>
        <meta name="description" content="Habla con Pulse, tu socia creativa. En 3 pasos te arma una web lista." />
      </Head>
      <main>
        <Hero onStart={() => setStarted(true)} />
        {started && (
          <div className="container-narrow">
            <PreviewCard name={brand} tagline={tagline} color={color} />
          </div>
        )}
        <ChatWizard />
        <TrustBar />
        <Plans />
        <Testimonials />
        <Footer />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'es', ['common'])),
  },
});
