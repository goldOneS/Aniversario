export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { mensaje } = req.body;

  const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    const body = {
      chat_id: CHAT_ID,
      text: `💌 Nueva queja de tu pareja:\n\n${mensaje}`,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!data.ok) throw new Error(data.description);

    res.status(200).json({ ok: true, message: "Queja enviada correctamente 💖" });
  } catch (error) {
    console.error("Error enviando a Telegram:", error);
    res.status(500).json({ ok: false, error: "No se pudo enviar la queja 😢" });
  }
}
