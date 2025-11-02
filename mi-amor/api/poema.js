import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // guarda tu key en Variables de entorno de Vercel
});

export default async function handler(req, res) {
  const prompt = `Escribe un poema corto, romántico y original para dedicar a mi pareja. 
  Que sea dulce, con un tono amoroso, ideal para mostrar en una página web.`;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.9,
  });

  const poema = completion.choices[0].message.content;
  res.status(200).json({ poema });
}
