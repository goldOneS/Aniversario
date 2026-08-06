export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Método no permitido" });
  }

  // Asegurar el parseo de req.body si llega como string o JSON
  let bodyData = req.body;
  if (typeof bodyData === "string") {
    try {
      bodyData = JSON.parse(bodyData);
    } catch (e) {
      bodyData = {};
    }
  }

  const mensaje = bodyData?.mensaje;

  const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  // Validación de credenciales de entorno
  if (!TELEGRAM_TOKEN || !CHAT_ID) {
    console.error("Faltan las variables TELEGRAM_BOT_TOKEN o TELEGRAM_CHAT_ID");
    return res.status(500).json({ ok: false, error: "Configuración del servidor incompleta." });
  }

  if (!mensaje || !mensaje.trim()) {
    return res.status(400).json({ ok: false, error: "El mensaje está vacío" });
  }

  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    const payload = {
      chat_id: CHAT_ID,
      text: `💌 Nuevo mensaje de tu pareja:\n\n${mensaje}`,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!data.ok) {
      throw new Error(data.description || "Error devuelto por Telegram");
    }

    return res.status(200).json({ ok: true, message: "Mensaje enviado correctamente 💖" });
  } catch (error) {
    console.error("Error enviando a Telegram:", error);
    return res.status(500).json({ ok: false, error: "No se pudo enviar el mensaje 😢" });
  }
}
