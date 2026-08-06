// 📂 /api/poema.js

const poemas = [
  "Hoy el sol se despierta más despacio,\nsolo para darte tiempo de brillar tú primero.\nCada día contigo es un espacio\nque el tiempo guarda entero.",

  "No necesito buscar en las estrellas\nninguna razón para quererte,\nporque tú ya eres la más bella\nrazón que tuve para no perderte.",

  "Eres la calma después de la tormenta,\nel café tibio en una mañana fría,\nla razón por la que mi alma cuenta\nlos días junto a ti, uno a uno, con alegría.",

  "Si el amor fuera un lugar, serías mi casa,\nel rincón donde el mundo no me alcanza,\ndonde cada silencio no pasa\nsin que tu mano sea mi esperanza.",

  "Te quiero en lo simple, en lo cotidiano,\nen un mensaje de buenos días,\nen sostener, sin soltar, tu mano,\ny en amarte más, cada una de mis días.",

  "No hay poema que alcance a describirte,\nni palabra que iguale tu sonrisa,\nsolo sé que quiero seguir escribirte\nversos nuevos, sin ninguna prisa.",

  "Contigo el tiempo cambia de manera,\nlos minutos se sienten como instantes,\ny aunque el mundo entero desapareciera,\nseguirías siendo tú, entre todos, mi constante.",

  "Eres la razón detrás de mis sonrisas,\nel motivo por el que el día vale más,\ny en cada una de nuestras brisas,\nsé que a tu lado siempre querré estar.",

  "No busco un amor de cuento perfecto,\nbusco el tuyo, real y verdadero,\nese que se queda, sin ningún defecto,\nen los días buenos y en los de invierno.",

  "Hoy, como cada día, elijo quererte,\nsin condiciones, sin medida,\nporque contigo entendí que la suerte\nes compartir contigo esta vida.",
];

export default async function handler(req, res) {
  try {
    // Calcula el día del año (1 a 365/366)
    const hoy = new Date();
    const inicioAño = new Date(hoy.getFullYear(), 0, 0);
    const diff = hoy - inicioAño;
    const unDia = 1000 * 60 * 60 * 24;
    const diaDelAño = Math.floor(diff / unDia);

    // Rota entre los poemas disponibles según el día del año
    const indice = diaDelAño % poemas.length;
    const poema = poemas[indice];

    res.status(200).json({ poema });
  } catch (error) {
    console.error("Error en /api/poema:", error);
    res.status(200).json({
      poema:
        "Hoy no se pudo cargar un poema, pero mi amor por ti sigue igual de fuerte 💖",
    });
  }
}
