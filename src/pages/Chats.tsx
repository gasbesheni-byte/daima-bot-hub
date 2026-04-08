import { useNavigate } from "react-router-dom";
import ChatPreview from "@/components/ChatPreview";

const MOCK_CHATS = [
  {
    id: 1,
    name: "Amara",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face",
    lastMessage: "That hiking trail sounds amazing! When are you going?",
    time: "2m ago",
    unread: true,
  },
  {
    id: 2,
    name: "Jordan",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    lastMessage: "I'll send you the name of that bookshop 📚",
    time: "1h ago",
    unread: false,
  },
];

const Chats = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24 pt-4">
      <div className="px-5 pb-2">
        <h1 className="font-display text-2xl font-bold text-foreground">Chats</h1>
        <p className="mt-0.5 text-xs text-muted-foreground">{MOCK_CHATS.length} conversations</p>
      </div>

      <div className="px-3 mt-2 space-y-1">
        {MOCK_CHATS.map((chat) => (
          <ChatPreview
            key={chat.id}
            {...chat}
            onClick={() => navigate(`/chat/${chat.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Chats;
