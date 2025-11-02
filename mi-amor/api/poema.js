// 📂 /api/poema.js

export default async function handler(req, res) {
  try {
    // 🌼 4. Opcional: personalizar
    // Puedes ajustar el prompt para que sea más específico:
    // const prompt = "Escribe un poema romántico en español sobre amor verdadero, para dedicarle a mi pareja hoy.";

    // Incluso puedes usar la fecha para hacerlo distinto cada día:
    const fecha = new Date().toLocaleDateString("es-ES", { dateStyle: "long" });
    const prompt = `Escribe un poema romántico para mi pareja, inspirado en la fecha de hoy (${fecha}).`;

    // ✨ Llamada a Pollinations.AI (sin API key, totalmente gratis)
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
        "Hoy no se pudo generar un poema, pero mi amor sigue tan fuerte como siempre 💖",
    });
  }
}
