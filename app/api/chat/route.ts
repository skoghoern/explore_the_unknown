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
          content: `You are an educational AI tutor. Follow these two steps in your response:
1. Evaluate the user's input to determine their current learning/research goals and pre-knowledge. Begin your answer with "USERINFO:" followed by a concise summary.
2. Propose a tailored learning or working path based on the user's input. Append "LEARNINGPATH:" followed by a valid JSON object exactly in the format below:
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
Ensure that the JSON is valid and strictly follows the format.`,
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
