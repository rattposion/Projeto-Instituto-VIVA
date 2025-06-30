import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { getPixelConfig } from './utils/pixelConfig';

async function startApp() {
  const pixel = await getPixelConfig();
  if (pixel && pixel.pixelId) {
    // Injeta o script do Pixel dinamicamente
    const script = document.createElement('script');
    script.innerHTML = `!function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${pixel.pixelId}');
    fbq('track', 'PageView');`;
    document.head.appendChild(script);
    // Injeta o noscript no body
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${pixel.pixelId}&ev=PageView&noscript=1"/>`;
    document.body.appendChild(noscript);
  }
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

startApp();
