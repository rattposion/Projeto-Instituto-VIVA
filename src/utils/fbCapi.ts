export async function sendCapiEvent(event_name: string, user_data: any = {}, custom_data: any = {}) {
  await fetch('http://localhost:3000/fb-capi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event_name, user_data, custom_data })
  });
} 