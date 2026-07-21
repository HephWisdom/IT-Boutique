import { useEffect, useId, useRef } from 'react';

declare global { interface Window { turnstile?: { render: (element: HTMLElement, options: Record<string, unknown>) => string; remove: (id: string) => void } } }

export function TurnstileField({ onToken }: { onToken: (token: string) => void }) {
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;
  const ref = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);
  const onTokenRef = useRef(onToken);
  useEffect(() => { onTokenRef.current = onToken; }, [onToken]);
  const id = useId();
  useEffect(() => {
    if (!siteKey || !ref.current) return;
    const render = () => { if (ref.current && window.turnstile && !widgetId.current) widgetId.current = window.turnstile.render(ref.current, { sitekey: siteKey, callback: (token: string) => onTokenRef.current(token), 'expired-callback': () => onTokenRef.current(''), theme: 'light' }); };
    const existing = document.querySelector<HTMLScriptElement>('script[data-itb-turnstile]');
    if (existing) { if (window.turnstile) render(); else existing.addEventListener('load', render, { once: true }); }
    else { const script = document.createElement('script'); script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'; script.async = true; script.defer = true; script.dataset.itbTurnstile = 'true'; script.addEventListener('load', render, { once: true }); document.head.appendChild(script); }
    return () => { if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current); widgetId.current = undefined; };
  }, [id, siteKey]);
  if (!siteKey) return <p className="text-xs text-subtle">Spam protection is bypassed only because no Turnstile site key is configured in this environment.</p>;
  return <div ref={ref} id={`turnstile-${id}`} aria-label="Anti-spam verification" />;
}
