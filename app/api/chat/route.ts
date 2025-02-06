import { mistral } from "@ai-sdk/mistral";
import { streamText } from "ai";

interface Message {
  role: string;
  content: string;
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const result = streamText({
      model: mistral("mistral-large-latest"),
      messages: [
        {
          role: "system",
          content: `You are an educational AI tutor. Engage in a natural and helpful conversation with the user to understand their learning/research goals and their current pre-knowledge. Ask follow-up questions if necessary to encourage further detail. Do NOT include any special markers or JSON formatting in your responses.`,
        },
        ...messages.map((msg: Message) => ({
          role: msg.role,
          content: msg.content,
        })),
      ],
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
