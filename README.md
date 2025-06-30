# Integração Facebook Pixel Avançada

## Como funciona

- O Facebook Pixel é carregado no index.html (substitua 'SEU_PIXEL_ID' pelo seu ID real).
- O disparo de eventos é centralizado no utilitário `src/utils/facebookPixel.ts`.
- O rastreamento de PageView funciona em SPA via hook `useFacebookPageView`.
- O consentimento de cookies é obrigatório (LGPD/GDPR) e implementado com `react-cookie-consent`.
- Só após o consentimento o Pixel é ativado.

## Eventos implementados

- **PageView**: a cada navegação de página
- **Quero Ajudar**: clique no botão do Header
- **Contact**: envio do formulário de contato (com e-mail do usuário)
- **Purchase**: doação única
- **Subscribe**: doação mensal
- **Lead**: voluntariado e parcerias
- **ClickExternal**: clique em link externo (exemplo no Instagram do Footer)
- **Download**: download de arquivo (exemplo no Footer)

## Como adicionar novos eventos

1. Importe o utilitário:
   ```js
   import { fbqTrack } from '../utils/facebookPixel';
   ```
2. Dispare o evento onde quiser:
   ```js
   fbqTrack('NomeDoEvento', { parametro: 'valor' });
   ```

## Consentimento de Cookies
- O banner aparece no rodapé do site.
- Só dispara eventos se o usuário aceitar.
- Você pode customizar o texto e as cores em `App.tsx`.

## Debug e Monitoramento
- Use a extensão [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc) para validar os eventos.
- Confira o painel do Facebook Events Manager.

## Performance
- O script do Pixel é carregado de forma assíncrona.
- Não há duplicidade de eventos.

## Checklist de Testes
- [ ] Pixel dispara PageView ao navegar entre páginas
- [ ] Pixel dispara eventos personalizados nos botões e formulários
- [ ] Consentimento de cookies bloqueia/desbloqueia o Pixel corretamente
- [ ] Eventos aparecem no Pixel Helper e no painel do Facebook

## Conversion API (CAPI)
- Para máxima precisão, implemente também o envio de eventos do backend (Node.js/Express).
- Se quiser, peça para eu criar a estrutura inicial para você! 