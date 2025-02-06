import { mistral } from "@ai-sdk/mistral";
import { streamText } from "ai";

export async function POST(req: Request) {
  try {
    const { conversation } = await req.json();

    const systemPrompt = `You are an educational AI tutor. Based on the following conversation between the user and the AI tutor, follow these two steps:
1. Evaluate the user's input to determine their current learning/research goals and pre-knowledge. Immediately output a JSON object after "USERINFO:" exactly in the following format:
{
  "goals": "User's primary learning or research goals",
  "knowledge": "A summary of the user's current pre-knowledge in the subject"
}
2. Propose a tailored learning or working path based on the user's conversation. Immediately after "LEARNINGPATH:" output a valid JSON object exactly in the format below:
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
Ensure that both JSON objects are valid and strictly follow the formats.
Conversation:
${conversation}`;

    const result = streamText({
      model: mistral("mistral-large-latest"),
      messages: [{ role: "system", content: systemPrompt }],
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Analyze API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process analysis request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
