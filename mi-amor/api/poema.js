import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // 👈 debe ser exactamente esto
});

export default async function handler(req, res) {
  try {
    const prompt = "Escribe un poema romántico para mi pareja.";

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const poema = completion.choices[0].message.content;
    res.status(200).json({ poema });
  } catch (error) {
    console.error("Error en /api/poema:", error);
    res.status(500).json({ error: "Error generando poema" });
  }
}
