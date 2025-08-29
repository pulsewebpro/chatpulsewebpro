import { useRef, useEffect } from 'react';
import { useTranslation } from 'next-i18next';

type Props = {
  name: string;
  tagline: string;
  color: string;
};

export default function PreviewCard({ name, tagline, color }: Props){
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { t } = useTranslation('common');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;

    // background
    ctx.fillStyle = "#0b0f14";
    ctx.fillRect(0, 0, w, h);
    const grd = ctx.createRadialGradient(w*0.7, h*0.1, 50, w*0.7, h*0.1, 400);
    grd.addColorStop(0, hexToRgba(color, 0.25));
    grd.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, w, h);

    // mock header
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.fillRect(20, 20, w-40, 50);
    // logo
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(50, 45, 12, 0, Math.PI*2);
    ctx.fill();

    // title
    ctx.fillStyle = "white";
    ctx.font = "bold 32px system-ui, -apple-system, Segoe UI, Roboto";
    ctx.fillText(name || "Your Brand", 80, 55);

    // hero card
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.fillRect(40, 100, w-80, 200);
    ctx.strokeStyle = hexToRgba(color, 0.6);
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 100, w-80, 200);

    // headline
    ctx.fillStyle = "white";
    ctx.font = "bold 36px system-ui, -apple-system, Segoe UI, Roboto";
    const head = (tagline || "Tu web antes de que se enfríe el café");
    wrapText(ctx, head, 60, 160, w-120, 40);

    // button
    ctx.fillStyle = hexToRgba(color, 0.22);
    ctx.fillRect(60, 240, 200, 42);
    ctx.strokeStyle = hexToRgba(color, 0.7);
    ctx.strokeRect(60, 240, 200, 42);
    ctx.fillStyle = "white";
    ctx.font = "bold 16px system-ui, -apple-system";
    ctx.fillText("Get Started", 100, 267);

  }, [name, tagline, color]);

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `preview-${(name||'brand').toLowerCase().replace(/\s+/g,'-')}.png`;
    a.click();
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Preview</h3>
        <button className="btn" onClick={download}>📥 {t('cta_download')}</button>
      </div>
      <canvas ref={canvasRef} width={900} height={420} className="w-full rounded-xl border border-white/10" />
    </div>
  );
}

function hexToRgba(hex: string, alpha: number){
  if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex)) return `rgba(56,189,248,${alpha})`;
  let c = hex.substring(1);
  if (c.length === 3) c = c.split('').map(x => x+x).join('');
  const num = parseInt(c,16);
  const r = (num>>16)&255, g=(num>>8)&255, b=num&255;
  return `rgba(${r},${g},${b},${alpha})`;
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number){
  const words = text.split(' ');
  let line = '';
  for (let n=0; n<words.length; n++){
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0){
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}
