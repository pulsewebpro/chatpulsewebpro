import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import PulseAvatar from './PulseAvatar';

function dispatchPulseState(mood: 'idle'|'thinking'|'excited'){
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('pulse:state', { detail: { mood } }));
  }
}
function dispatchPulseNudge(){
  if (typeof window !== 'undefined') window.dispatchEvent(new Event('pulse:nudge'));
}
let typingTimer: any;
function dispatchPulseTyping(){
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('pulse:state', { detail: { mood: 'thinking' } }));
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('pulse:state', { detail: { mood: 'idle' } }));
    }, 1000);
  }
}


function dispatchPulseState(mood: 'idle'|'thinking'|'excited'){
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('pulse:state', { detail: { mood } }));
  }
}
function dispatchPulseNudge(){
  if (typeof window !== 'undefined') window.dispatchEvent(new Event('pulse:nudge'));
}
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('pulse:state', { detail: { mood } }));
  }
}

export default function ChatWizard(){

  const { t } = useTranslation('common');
  const [step, setStep] = useState(1);
  const [type, setType] = useState('');
  const [tone, setTone] = useState('Premium divertido');
  const [brand, setBrand] = useState('Mi Marca');
  const [color, setColor] = useState('#38bdf8');
  const [messages, setMessages] = useState<{role:'user'|'assistant', content:string}[]>([
    { role: 'assistant', content: '👋 ¡Hola! Soy Pulse, tu socia creativa. Cuéntame qué web quieres crear.' }
  ]);

  const next = () => { dispatchPulseState('thinking'); setStep(s => Math.min(3, s+1)); };
  const back = () => { dispatchPulseState('idle'); setStep(s => Math.max(1, s-1)); };

  const askPulse = async (input: string) => {
    dispatchPulseState('excited');
    dispatchPulseState('excited');
    setMessages(m => [...m, { role: 'user', content: input }]);
    try {
      const res = await fetch('/api/pulse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input, context: { type, tone, brand, color } })
      });
      const data = await res.json();
      setMessages(m => [...m, { role: 'assistant', content: data.reply }]);
      dispatchPulseNudge();
      dispatchPulseState('thinking');
      dispatchPulseNudge();
      dispatchPulseState('thinking');
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: '⚠️ (mock) Respuesta local. Continúa!' }]);
      dispatchPulseNudge();
      dispatchPulseState('idle');
      dispatchPulseNudge();
      dispatchPulseState('idle');
    }
  };

  return (
    <section className="container-narrow grid md:grid-cols-2 gap-6">
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <PulseAvatar/>
          <h3 className="font-semibold">{t('chat_title')}</h3>
        </div>
        <div className="space-y-6">
          {step === 1 && (
            <div>
              <label className="block text-sm mb-2">{t('step1_title')}</label>
              <input value={type} onChange={e=>setType(e.target.value)} placeholder={t('step1_placeholder')||''} className="w-full bg-transparent border rounded-xl p-3"/>
              <div className="mt-3 flex justify-between">
                <span/>
                <button className="btn" onClick={next}>Siguiente</button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <label className="block text-sm mb-2">{t('step2_title')}</label>
              <input value={tone} onChange={e=>setTone(e.target.value)} placeholder={t('step2_placeholder')||''} className="w-full bg-transparent border rounded-xl p-3"/>
              <div className="mt-3 flex justify-between">
                <button className="btn" onClick={back}>Atrás</button>
                <button className="btn" onClick={next}>Siguiente</button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <label className="block text-sm mb-2">{t('step3_title')}</label>
              <div className="grid grid-cols-3 gap-3">
                <input value={brand} onChange={e=>setBrand(e.target.value)} placeholder="Brand" className="col-span-2 bg-transparent border rounded-xl p-3"/>
                <input value={color} onChange={e=>setColor(e.target.value)} placeholder="#38bdf8" className="bg-transparent border rounded-xl p-3"/>
              </div>
              <div className="mt-3 flex justify-between">
                <button className="btn" onClick={back}>Atrás</button>
                <button className="btn" onClick={()=>askPulse(`Quiero una web de ${type} en tono ${tone} para la marca ${brand} con color ${color}.`)}>Generar con Pulse</button>
              </div>
            </div>
          )}

          <div className="border-t border-white/10 pt-4 space-y-3 max-h-72 overflow-y-auto">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role==='assistant' ? '' : 'flex-row-reverse'}`}>
                <div className={`max-w-[75%] rounded-2xl p-3 ${m.role==='assistant' ? 'bg-white/5' : 'bg-white/10'}`}>
                  <p className="whitespace-pre-wrap">{m.content}</p>
                </div>
              </div>
            ))}
            <MessageInput onSend={askPulse} />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="card">
          <h3 className="font-semibold mb-2">Resumen</h3>
          <ul className="text-sm text-sky-100/80 space-y-1">
            <li>Tipo: <b>{type || '—'}</b></li>
            <li>Tono: <b>{tone || '—'}</b></li>
            <li>Marca: <b>{brand || '—'}</b></li>
            <li>Color: <b>{color || '—'}</b></li>
          </ul>
        </div>
        <div className="card">
          <h3 className="font-semibold mb-2">Guía de secciones (sugerida por Pulse)</h3>
          <ol className="list-decimal list-inside text-sm text-sky-100/80 space-y-1">
            <li>Hero con titular fuerte y CTA</li>
            <li>Beneficios / características</li>
            <li>Portfolio o productos</li>
            <li>Testimonios</li>
            <li>Plan de precios</li>
            <li>CTA final</li>
          </ol>
        </div>
      </div>
    </section>
  );
}

let typingTimer: any;
function dispatchPulseTyping(){
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('pulse:state', { detail: { mood: 'thinking' } }));
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('pulse:state', { detail: { mood: 'idle' } }));
    }, 1000);
  }
}

function MessageInput({ onSend }:{ onSend:(text:string)=>void }){

  const { t } = useTranslation('common');
  const [text, setText] = useState('');
  const send = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
  };
  return (
    <div className="flex gap-2 pt-2">
      <input
        value={text}
        onChange={e=>{ setText(e.target.value); dispatchPulseTyping(); }}
        placeholder={t('chat_input_placeholder')||''}
        className="flex-1 bg-transparent border rounded-xl p-3"
        onKeyDown={(e) => e.key === 'Enter' && send()}
      />
      <button className="btn" onClick={send}>Enviar</button>
    </div>
  );
}