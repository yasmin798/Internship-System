import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

const LiveChat = ({ userName = "You", onUserMessage }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Listen for dummy attendee replies
  useEffect(() => {
    const handleReply = (e) => {
      setMessages((prev) => [...prev, e.detail]);
    };
    window.addEventListener("attendee-reply", handleReply);
    return () => window.removeEventListener("attendee-reply", handleReply);
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = {
      user: userName,
      text: input.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // Trigger parent callback
    if (onUserMessage) onUserMessage(newMsg);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "8px",
        width: "300px",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        zIndex: 10,
        position: "relative",
      }}
    >
      <div
        style={{
          flexGrow: 1,
          overflowY: "auto",
          marginBottom: "8px",
          maxHeight: "350px",
        }}
      >
        {messages.length === 0 ? (
          <div style={{ color: "#666" }}>No messages yet. Start chatting!</div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} style={{ marginBottom: "4px" }}>
              <strong>{msg.user}:</strong> {msg.text}{" "}
              <small style={{ fontSize: "0.7em", color: "#666" }}>
                {msg.timestamp.toLocaleTimeString()}
              </small>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ display: "flex", gap: "4px" }}>
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ padding: "4px", flexGrow: 1 }}
        />
        <button onClick={sendMessage} style={{ padding: "4px 8px" }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default LiveChat;
