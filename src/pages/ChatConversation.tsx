import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const CHAT_DATA: Record<string, {
  name: string;
  avatar: string;
  myIcebreaker: string;
  theirIcebreaker: string;
  messages: { id: number; from: "me" | "them"; text: string; time: string }[];
}> = {
  "1": {
    name: "Amara",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face",
    myIcebreaker: "Sunsets from my balcony with a warm cup of chai — that's my happy place.",
    theirIcebreaker: "A stranger's dog sat next to me on a bench today and it made my whole week.",
    messages: [
      { id: 1, from: "them", text: "I love that you mentioned chai sunsets! Do you have a favorite spot?", time: "3:12 PM" },
      { id: 2, from: "me", text: "There's a rooftop café near Westlands with the best view 🌅", time: "3:14 PM" },
      { id: 3, from: "them", text: "That hiking trail sounds amazing! When are you going?", time: "3:15 PM" },
      { id: 4, from: "me", text: "This weekend! Want to join? It's beginner-friendly", time: "3:16 PM" },
      { id: 5, from: "them", text: "I'd love that! Which trail is it?", time: "3:18 PM" },
    ],
  },
  "2": {
    name: "Jordan",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    myIcebreaker: "Sunsets from my balcony with a warm cup of chai — that's my happy place.",
    theirIcebreaker: "Found a tiny bookshop yesterday that smelled like cedar. Bought 3 books I didn't need.",
    messages: [
      { id: 1, from: "me", text: "A bookshop that smells like cedar? That sounds like a dream!", time: "1:30 PM" },
      { id: 2, from: "them", text: "Right? It's hidden on Koinange Street. Tiny place, huge soul.", time: "1:32 PM" },
      { id: 3, from: "them", text: "I'll send you the name of that bookshop 📚", time: "1:33 PM" },
    ],
  },
};

const ChatConversation = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const chat = CHAT_DATA[chatId || "1"];
  const [messages, setMessages] = useState(chat?.messages || []);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!chat) {
    navigate("/chats");
    return null;
  }

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: messages.length + 1,
      from: "me" as const,
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setTimeout(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }), 50);
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <button onClick={() => navigate("/chats")} className="text-foreground">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <img src={chat.avatar} alt={chat.name} className="h-9 w-9 rounded-full object-cover ring-2 ring-sage" />
        <div>
          <p className="text-sm font-semibold text-foreground">{chat.name}</p>
          <p className="text-[11px] text-muted-foreground">Matched 2 days ago</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {/* Icebreaker header */}
        <div className="space-y-2 mb-6">
          <p className="text-center text-[11px] font-medium text-muted-foreground">Your icebreakers started this conversation</p>
          <div className="rounded-xl bg-sage p-3">
            <p className="text-[10px] font-semibold text-sage-foreground/60 mb-0.5">{chat.name}'s answer</p>
            <p className="text-xs text-sage-foreground italic">"{chat.theirIcebreaker}"</p>
          </div>
          <div className="rounded-xl bg-peach p-3">
            <p className="text-[10px] font-semibold text-peach-foreground/60 mb-0.5">Your answer</p>
            <p className="text-xs text-peach-foreground italic">"{chat.myIcebreaker}"</p>
          </div>
        </div>

        {/* Messages */}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                msg.from === "me"
                  ? "rounded-br-md bg-primary text-primary-foreground"
                  : "rounded-bl-md bg-card text-foreground shadow-[var(--shadow-card)]"
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <p className={`mt-1 text-[10px] ${msg.from === "me" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 rounded-full border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button
            onClick={handleSend}
            size="icon"
            className="h-10 w-10 shrink-0 rounded-full bg-primary text-primary-foreground"
            disabled={!input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatConversation;
