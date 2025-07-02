"use client";
import { useChat } from "@ai-sdk/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  // Consider adding timestamps to UI?
  // .messages#.createdAt
  return (
    <>
      <header id="chat-header">CHAT TITLE HEADER</header>
      <div id="chat-history">
        {messages.map((message) => (
          <div key={message.id} className={`msg ${message.role === "user" ? "msg-user" : "msg-agent"}`}>
            {message.parts.map((part, i) => {
              switch (part.type) {
                case "text":
                  return <div key={`${message.id}-${i}`}>{part.text}</div>;
                case "tool-invocation":
                  return <pre key={`${message.id}-${i}`}>{JSON.stringify(part.toolInvocation, null, 2)}</pre>;
              }
            })}
          </div>
        ))}
      </div>
      <form id="chat-form" onSubmit={handleSubmit}>
        <input value={input} placeholder="Say something..." onChange={handleInputChange} />
      </form>
    </>
  );
}
