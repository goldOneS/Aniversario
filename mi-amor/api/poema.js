import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Eres una IA romántica que escribe poemas breves, dulces y originales para dedicar al amor de tu vida."
        },
        {
          role: "user",
          content: "Escribe un poema romántico corto y diferente para mi pareja. Usa máximo 6 versos."
        }
      ]
    });

    const poema = completion.choices?.[0]?.message?.content ?? "No se generó poema 💔";
    res.status(200).json({ poema });
  } catch (error) {
    console.error("Error en /api/poema:", error);
    res.status(500).json({ error: error.message });
  }
}
