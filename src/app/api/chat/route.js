import { Client } from "@gradio/client";

export async function POST(req) {
  const { message } = await req.json();
  // console.log("Chatbot");

  try {
    const client = await Client.connect(
      "huggingface-projects/llama-3.2-3B-Instruct"
    );
    const result = await client.predict("/chat", {
      message,
      max_new_tokens: 500,
      temperature: 0.1,
      top_p: 0.05,
      top_k: 1,
      repetition_penalty: 1,
    });
    // console.log(result.data);

    const reply = result.data[0];

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate response" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
