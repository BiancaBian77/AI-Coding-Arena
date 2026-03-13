"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Timer from "@/components/Timer";
import { mockQuestions } from "@/data/mock-data";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export default function CandidateTestPage() {
  const [currentPart, setCurrentPart] = useState<number>(0);
  const [code, setCode] = useState<string>(mockQuestions[0].starterCode || "");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  const question = mockQuestions[currentPart];

  const handlePartChange = (index: number) => {
    setCurrentPart(index);
    setCode(mockQuestions[index].starterCode || "");
  };

  const handleSendChat = useCallback(() => {
    if (!chatInput.trim()) return;
    const now = new Date();
    const ts = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

    const userMsg: ChatMessage = { role: "user", content: chatInput, timestamp: ts };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponses: Record<string, string> = {
        default: "这是一个 AI 助手模拟回复。在实际产品中，这里会接入真实的 LLM API。我可以帮你分析代码结构、调试错误、优化算法等。请告诉我你需要什么帮助？",
      };
      const aiMsg: ChatMessage = {
        role: "assistant",
        content: aiResponses.default,
        timestamp: ts,
      };
      setChatMessages((prev) => [...prev, aiMsg]);
    }, 1000);
  }, [chatInput]);

  const handleSubmit = () => {
    setIsSubmitted(true);
    setShowSubmitConfirm(false);
  };

  const handleTimeUp = useCallback(() => {
    setIsSubmitted(true);
  }, []);

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 rounded-xl border border-[var(--border)] bg-[var(--card)] max-w-md">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-2xl font-bold mb-2">测试已提交</h2>
          <p className="text-gray-400 mb-6">感谢你完成 AI Coding Arena 测试！评分结果将在 24 小时内发送到你的邮箱。</p>
          <a href="/" className="text-blue-400 hover:text-blue-300">返回首页</a>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Top bar */}
      <div className="h-14 border-b border-[var(--border)] bg-[var(--card)] flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <span className="font-bold text-blue-400">AI Coding Arena</span>
          <div className="flex gap-1">
            {mockQuestions.map((q, i) => (
              <button
                key={q.id}
                onClick={() => handlePartChange(i)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  currentPart === i
                    ? "bg-blue-500 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                Part {q.part}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Timer totalMinutes={120} onTimeUp={handleTimeUp} />
          <button
            onClick={() => setShowSubmitConfirm(true)}
            className="px-4 py-1.5 bg-green-600 hover:bg-green-500 rounded text-sm font-medium transition-colors"
          >
            提交测试
          </button>
        </div>
      </div>

      {/* Submit confirmation modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 max-w-sm">
            <h3 className="text-lg font-bold mb-2">确认提交？</h3>
            <p className="text-gray-400 text-sm mb-4">提交后将无法修改代码。请确保你已完成所有部分。</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-sm"
              >
                继续编码
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded bg-green-600 hover:bg-green-500 text-sm font-medium"
              >
                确认提交
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left panel - Question */}
        <div className="w-[30%] border-r border-[var(--border)] overflow-y-auto p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">
              Part {question.part} · {question.duration} 分钟 · {question.maxScore} 分
            </span>
          </div>
          <h2 className="text-lg font-bold mb-4">{question.title}</h2>
          <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
            {question.description.split("\n").map((line, i) => {
              if (line.startsWith("## ")) return <h2 key={i} className="text-lg font-bold mt-4 mb-2">{line.slice(3)}</h2>;
              if (line.startsWith("### ")) return <h3 key={i} className="text-md font-semibold mt-3 mb-1 text-blue-300">{line.slice(4)}</h3>;
              if (line.startsWith("- ")) return <li key={i} className="ml-4 list-disc">{line.slice(2)}</li>;
              if (line.startsWith("```")) return null;
              return <p key={i} className="mb-1">{line}</p>;
            })}
          </div>
        </div>

        {/* Center panel - Code Editor */}
        <div className="w-[40%] border-r border-[var(--border)] flex flex-col">
          <div className="h-10 bg-gray-900 border-b border-[var(--border)] flex items-center px-3 text-sm text-gray-400">
            <span className="mr-4">📄 solution.py</span>
            <span className="text-xs text-gray-600">Python 3.9</span>
          </div>
          <div className="flex-1">
            <MonacoEditor
              height="100%"
              language="python"
              theme="vs-dark"
              value={code}
              onChange={(v) => setCode(v || "")}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                padding: { top: 12 },
                lineNumbers: "on",
                renderWhitespace: "selection",
                tabSize: 4,
              }}
            />
          </div>
        </div>

        {/* Right panel - AI Chat */}
        <div className="w-[30%] flex flex-col">
          <div className="h-10 bg-gray-900 border-b border-[var(--border)] flex items-center px-3 text-sm">
            <span className="text-purple-400">🤖 AI 助手</span>
            <span className="text-xs text-gray-600 ml-2">所有对话将被记录</span>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {chatMessages.length === 0 && (
              <div className="text-center text-gray-600 mt-8">
                <div className="text-3xl mb-2">💬</div>
                <p className="text-sm">向 AI 助手提问</p>
                <p className="text-xs mt-1">你可以询问架构设计、调试帮助、代码优化等</p>
              </div>
            )}
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] p-3 rounded-lg text-sm ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-200"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                  <div className="text-xs mt-1 opacity-50">{msg.timestamp}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[var(--border)] p-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                placeholder="向 AI 助手提问..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSendChat}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm transition-colors"
              >
                发送
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
