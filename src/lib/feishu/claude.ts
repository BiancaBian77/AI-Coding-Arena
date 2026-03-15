import Anthropic from "@anthropic-ai/sdk";

let anthropicClient: Anthropic | null = null;

function getAnthropicClient(): Anthropic {
  if (anthropicClient) return anthropicClient;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey === "your-anthropic-api-key-here") {
    throw new Error("ANTHROPIC_API_KEY must be set to a valid key");
  }

  anthropicClient = new Anthropic({ apiKey });
  return anthropicClient;
}

const conversationHistory = new Map<
  string,
  Array<{ role: "user" | "assistant"; content: string }>
>();

const MAX_HISTORY = 20;

export async function chat(
  userId: string,
  message: string
): Promise<string> {
  const client = getAnthropicClient();

  const history = conversationHistory.get(userId) || [];
  history.push({ role: "user", content: message });

  if (history.length > MAX_HISTORY) {
    history.splice(0, history.length - MAX_HISTORY);
  }

  const systemPrompt =
    process.env.SYSTEM_PROMPT ||
    "你是一个智能 AI 助手，运行在飞书平台上，由 Claude 驱动。请用中文回复。";

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    system: systemPrompt,
    messages: history,
  });

  const assistantMessage =
    response.content[0].type === "text" ? response.content[0].text : "";

  history.push({ role: "assistant", content: assistantMessage });
  conversationHistory.set(userId, history);

  return assistantMessage;
}

export function clearHistory(userId: string): void {
  conversationHistory.delete(userId);
}
