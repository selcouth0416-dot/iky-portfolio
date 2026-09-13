 "use client";

import { useState } from "react";
import { Bot, Send, X } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Halo! Saya adalah asisten AI Iky. Ada yang bisa saya bantu terkait portfolio, pengalaman, atau project Iky?",
    },
  ]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error);
      setMessages((m) => [...m, { role: "assistant", content: data.text }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Maaf, AI Assistant sedang tidak dapat digunakan. Silakan coba lagi beberapa saat." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`ai-wrap ${open ? "open" : ""}`}>
      {open && (
        <div className="ai-panel" role="dialog" aria-label="Iky Assistant">
          <header className="ai-header">
            <div className="ai-identity">
              <span className="ai-badge"><Bot size={17} /></span>
              <div>
                <strong>Iky Assistant</strong>
                <small><i /> Online</small>
              </div>
            </div>
            <button aria-label="Close AI Assistant" onClick={() => setOpen(false)}><X size={17} /></button>
          </header>

          <div className="ai-messages">
            {messages.map((message, i) => (
              <div key={i} className={`message ${message.role}`}>
                <span>{message.content}</span>
                <small>{new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}</small>
              </div>
            ))}
            {loading && (
              <div className="typing" aria-label="AI is typing"><i /><i /><i /></div>
            )}
          </div>

          <form
            className="ai-input"
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="kamu siapa?"
              maxLength={3000}
              aria-label="Message"
            />
            <button aria-label="Send message" disabled={loading || !input.trim()}>
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {!open && (
        <button className="ai-fab" onClick={() => setOpen(true)} aria-label="Open Iky Assistant">
          <span>AI</span>
        </button>
      )}
    </div>
  );
}