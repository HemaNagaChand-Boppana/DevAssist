const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: `
You are a Java coding assistant.

Rules:
- If code is CORRECT, respond EXACTLY:
NO ERROR:
Code is correct.

- If code has error:
Give ONLY 1-2 lines explanation

Then give corrected code

Format EXACTLY:

ERROR:
<short explanation>

FIXED CODE:
<code only>
`
          },
          {
            role: "user",
            content: message
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply = response.data.choices[0].message.content;

    res.json({ content: reply });

  } catch (err) {
    console.log("ERROR:", err.response?.data || err.message);
    res.status(500).json({ error: "AI failed" });
  }
});

module.exports = router;