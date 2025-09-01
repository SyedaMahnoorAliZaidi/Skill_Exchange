import React, { useState, useRef, useEffect } from "react";

const API_URL = "http://localhost:8000/api/get-bot-reply/"; // Update if your backend runs elsewhere

const ChatBot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new message arrives
  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_input: input }),
      });
      const data = await response.json();
      setMessages(msgs => [...msgs, { from: "bot", text: data.bot_reply }]);
    } catch (err) {
      setMessages(msgs => [...msgs, { from: "bot", text: "Sorry, I couldn't connect to the server." }]);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999 }}>
      {open ? (
        <div style={{ width: 320, height: 420, background: "#fff", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: 16, borderBottom: "1px solid #eee", background: "#2563eb", color: "#fff", borderTopLeftRadius: 16, borderTopRightRadius: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>ChatBot</span>
            <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "#fff", fontSize: 20, cursor: "pointer" }}>&#x2715;</button>
          </div>
          <div style={{ flex: 1, padding: 16, overflowY: "auto", background: "#f9f9f9" }}>
            {messages.length === 0 && <div style={{ color: "#888", textAlign: "center", marginTop: 40 }}>Ask me anything!</div>}
            {messages.map((msg, idx) => (
              <div key={idx} style={{ marginBottom: 12, textAlign: msg.from === "user" ? "right" : "left" }}>
                <span style={{ display: "inline-block", padding: "8px 14px", borderRadius: 16, background: msg.from === "user" ? "#2563eb" : "#e5e7eb", color: msg.from === "user" ? "#fff" : "#222", maxWidth: 220, wordBreak: "break-word" }}>{msg.text}</span>
              </div>
            ))}
            {loading && (
              <div style={{ textAlign: "left", marginBottom: 12 }}>
                <span style={{ display: "inline-block", padding: "8px 14px", borderRadius: 16, background: "#e5e7eb", color: "#222", maxWidth: 220 }}>
                  <span className="animate-spin" style={{ marginRight: 8 }}>⏳</span>Bot is typing...
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSend} style={{ display: "flex", borderTop: "1px solid #eee", padding: 8, background: "#fff", borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your message..."
              style={{ flex: 1, border: "none", outline: "none", padding: 10, borderRadius: 8, background: "#f3f4f6" }}
              disabled={loading}
            />
            <button type="submit" style={{ marginLeft: 8, background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, padding: "0 16px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }} disabled={loading}>Send</button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          style={{ width: 64, height: 64, borderRadius: "50%", background: "#2563eb", color: "#fff", border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.15)", fontSize: 32, cursor: "pointer" }}
          aria-label="Open chat bot"
        >
          💬
        </button>
      )}
    </div>
  );
};

export default ChatBot;

export {}; 