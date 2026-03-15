import { NextRequest, NextResponse } from "next/server";
import * as lark from "@larksuiteoapi/node-sdk";
import { getFeishuClient } from "@/lib/feishu/client";
import { chat, clearHistory } from "@/lib/feishu/claude";

const processedEvents = new Set<string>();

// Auto-clean processed events every 5 minutes
setInterval(() => {
  processedEvents.clear();
}, 5 * 60 * 1000);

async function replyToMessage(messageId: string, text: string) {
  const client = getFeishuClient();
  await client.im.message.reply({
    data: {
      content: JSON.stringify({ text }),
      msg_type: "text",
    },
    path: {
      message_id: messageId,
    },
  });
}

async function handleMessageEvent(data: {
  sender: {
    sender_id?: { open_id?: string; user_id?: string };
    sender_type: string;
  };
  message: {
    message_id: string;
    message_type: string;
    content: string;
    chat_type: string;
    chat_id: string;
  };
}) {
  const { sender, message } = data;

  // Ignore bot messages
  if (sender.sender_type === "app") return;

  // Only handle text messages
  if (message.message_type !== "text") {
    await replyToMessage(
      message.message_id,
      "目前仅支持文本消息，请发送文字内容。"
    );
    return;
  }

  let userText: string;
  try {
    const content = JSON.parse(message.content);
    userText = content.text || "";
  } catch {
    userText = message.content;
  }

  if (!userText.trim()) return;

  // Handle special commands
  const userId = sender.sender_id?.open_id || sender.sender_id?.user_id || "unknown";

  if (userText.trim() === "/clear" || userText.trim() === "/reset") {
    clearHistory(userId);
    await replyToMessage(message.message_id, "对话历史已清除，开始新的对话。");
    return;
  }

  if (userText.trim() === "/help") {
    await replyToMessage(
      message.message_id,
      "OpenClaw AI 助手使用指南：\n" +
        "- 直接发送文字即可与 AI 对话\n" +
        "- /clear 或 /reset - 清除对话历史\n" +
        "- /help - 显示此帮助信息\n\n" +
        "由 Claude API 驱动"
    );
    return;
  }

  try {
    const aiResponse = await chat(userId, userText);
    await replyToMessage(message.message_id, aiResponse);
  } catch (error: unknown) {
    console.error("Claude API error:", error);
    const errMsg =
      error instanceof Error ? error.message : "Unknown error";
    await replyToMessage(
      message.message_id,
      `AI 处理出错: ${errMsg}`
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Handle Feishu URL verification challenge
    if (body.type === "url_verification") {
      return NextResponse.json({ challenge: body.challenge });
    }

    // Handle event callback
    if (body.header?.event_type === "im.message.receive_v1") {
      const eventId = body.header.event_id;

      // Deduplicate events
      if (processedEvents.has(eventId)) {
        return NextResponse.json({ code: 0 });
      }
      processedEvents.add(eventId);

      // Process asynchronously - respond to Feishu within 3s
      handleMessageEvent(body.event).catch((err) =>
        console.error("Error handling message event:", err)
      );

      return NextResponse.json({ code: 0 });
    }

    // Legacy v1 event format
    if (body.event?.type === "message") {
      return NextResponse.json({ code: 0 });
    }

    return NextResponse.json({ code: 0 });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "OpenClaw Feishu Bot (powered by Claude)",
  });
}
