// 📂 /api/poema.js

export default async function handler(req, res) {
  try {
    // 🌼 Personalización por fecha
        const fecha = new Date().toLocaleDateString("es-ES", { dateStyle: "long" });
    const prompt = `Escribe un poema romántico, tierno y en español para mi pareja, inspirado en la fecha de hoy (${fecha}) recuerda no poner ninguna respuesta asi "Claro, aquí tienes un poema romántico y tierno, inspirado en esta fecha especial de noviembre:"`;

    // ✨ Llamada a Pollinations
    const response = await fetch(
      `https://text.pollinations.ai/${encodeURIComponent(prompt)}`
    );

    if (!response.ok) throw new Error("Error al conectar con Pollinations");

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



