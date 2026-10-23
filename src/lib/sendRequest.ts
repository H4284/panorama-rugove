import { send } from "@emailjs/browser";

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Sends the room request through EmailJS. Resolves only when EmailJS confirms delivery (HTTP 200); throws otherwise,
// including when the browser already sent a request in the last 10 seconds (EmailJS rejects with status 429).
export async function sendRequest(params: Record<string, string>) {
  if (!serviceId || !templateId || !publicKey) throw new Error("EmailJS is not configured: set the VITE_EMAILJS_* variables.");
  const response = await send(serviceId, templateId, params, { publicKey, limitRate: { id: "room-request", throttle: 10_000 } });
  if (response.status !== 200) throw new Error(`EmailJS responded ${response.status}: ${response.text}`);
}
