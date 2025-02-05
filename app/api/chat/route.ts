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
          content: `You are an educational AI tutor. For each user query:
          1. First provide a concise, direct answer
          2. Then provide a learning path in this exact JSON format:
          {
            "topic": "Topic name",
            "steps": [
              {
                "title": "Step title",
                "description": "2-3 sentence description",
                "resources": ["Specific resource 1", "Specific resource 2"]
              }
            ]
          }
          Important: Always structure your response as a brief answer followed by valid JSON.`,
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
