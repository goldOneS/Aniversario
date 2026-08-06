// 📂 /api/poema.js
export default async function handler(req, res) {
  try {
    const fecha = new Date().toLocaleDateString("es-ES", { dateStyle: "long" });
    const prompt = `Escribe un poema romántico, tierno y en español para mi pareja, inspirado en la fecha de hoy (${fecha}). Responde solo con el poema, sin ninguna introducción ni comentario adicional.`;

    const response = await fetch(
      `https://text.pollinations.ai/${encodeURIComponent(prompt)}`,
      { signal: AbortSignal.timeout(15000) } // evita que se quede colgado si Pollinations tarda
    );

    if (!response.ok) throw new Error(`Pollinations respondió ${response.status}`);

    const poema = await response.text();
    res.status(200).json({ poema });
  } catch (error) {
    console.error("Error en /api/poema:", error);
    res.status(200).json({
      poema:
        "Hoy no se pudo generar un poema, pero mi amor por ti sigue igual de fuerte 💖",
    });
  }
}
