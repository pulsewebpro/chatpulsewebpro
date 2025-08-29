import type { NextApiRequest, NextApiResponse } from 'next';
import { isOnTopic } from '@/lib/pulseGuard';

type Body = { input: string, context?: any };

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { input, context } = req.body as Body;
  if (!isOnTopic(input)) {
    return res.status(200).json({ reply: process.env.OFFTOPIC_MSG || 'Solo puedo hablar de webs y negocios online. Cuéntame qué quieres crear 😊' });
  }

  const MODE = process.env.PULSE_MODE || 'mock'; // 'mock' | 'live'
  if (MODE === 'live' && process.env.OPENAI_API_KEY) {
    try {
      const reply = await liveReply(input, context);
      return res.status(200).json({ reply });
    } catch (e){
      console.error(e);
      return res.status(200).json({ reply: mockReply(input, context) + ' (fallback mock)' });
    }
  }
  // mock
  const reply = mockReply(input, context);
  return res.status(200).json({ reply });
}

// ------- MOCK (capado) -------
function mockReply(input: string, context: any){
  const { type='sitio', tone='premium', brand='Tu Marca', color='#38bdf8' } = context || {};
  return [
    `✅ Entendido: ${type} para **${brand}** (${tone}).`,
    `🎨 Paleta: principal ${color}, secundarios derivados.`,
    `🧭 Estructura: Hero + Beneficios + Portfolio/Productos + Testimonios + Planes + CTA.`,
    `⚙️ Próximo: Puedo sugerir copys y bloques, o generar un preview PNG desde el panel.`
  ].join('\n');
}

// ------- LIVE (opcional) -------
async function liveReply(input: string, context: any){
  // Minimal demo using OpenAI responses if provided;
  // Keep it simple and *capado* to the topic by joining context.
  const payload = {
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'Eres Pulse, socia creativa capada: solo webs/negocio online. Responde breve, con pasos accionables.'},
      { role: 'user', content: `Contexto: ${JSON.stringify(context)}\nUsuario: ${input}`}
    ],
    temperature: 0.5
  };
  // No external fetch allowed at build time; here is runtime-only
  const r = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify(payload)
  });
  const data = await r.json();
  const reply = data.choices?.[0]?.message?.content || mockReply(input, context);
  return reply;
}
