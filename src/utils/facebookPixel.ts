export const fbqTrack = (event: string, params?: Record<string, any>) => {
  if (window.fbq) {
    // Se houver e-mail, envie como parâmetro
    if (params && params.email) {
      window.fbq('track', event, { ...params, em: params.email });
    } else {
      window.fbq('track', event, params);
    }
  }
}; 