export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  const userMessage = body.message || "";

  const gptResponse = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_OPENAI_API_KEY"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: userMessage }]
    })
  });

  const data = await gptResponse.json();
  res.status(200).json({ reply: data.choices[0].message.content });
}