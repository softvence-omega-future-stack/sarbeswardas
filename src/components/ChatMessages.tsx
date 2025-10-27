"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatAIResponse } from "@/lib/utils";
import {
  useGetAllSessionQuery,
  useGetSingleSessionQuery,
} from "@/store/api/AIApi";

import {
  Bot,
  Copy,
  FileText,
  Share2,
  ThumbsDown,
  ThumbsUp,
  User,
} from "lucide-react";

interface ChatMessagesProps {
  messages: { role: "user" | "ai"; content: string }[];
  handleCopy: (text: string) => void;
  sessionId: string;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  handleCopy,
  sessionId,
}) => {
  const { data: allSessions } = useGetAllSessionQuery();

  const { data: singleSessionData, isLoading: singleSessionLoading } =
    useGetSingleSessionQuery(sessionId, {
      skip: !sessionId,
    });
  console.log("allSessions", allSessions);
  console.log("singleSessionData", singleSessionData);

  const ramjan = formatAIResponse(
    singleSessionData?.data.messages[0].response.selected.text || ""
  );

  console.log("singleSessionLoading", ramjan, singleSessionLoading);

  return (
    <div className="w-full max-w-3xl border border-border rounded-xl whitespace-pre-wrap text-foreground leading-relaxed bg-background">
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-3 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "ai" && (
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  <Bot className="h-4 w-4 cursor-pointer" />
                </AvatarFallback>
              </Avatar>
            )}

            <div className="flex flex-col max-w-[75%]">
              <div
                className={`p-4 rounded-xl text-sm whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-green-600 text-white self-end"
                    : "bg-muted border border-border text-foreground"
                }`}
              >
                {msg.content}
              </div>

              {msg.role === "ai" && (
                <div className="flex justify-between md:flex-row flex-col gap-3 items-center mt-3">
                  <div className="flex gap-3">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-lg border border-border cursor-pointer"
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-lg border border-border cursor-pointer"
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-lg border border-border cursor-pointer"
                      onClick={() => handleCopy(msg.content)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-lg border border-border cursor-pointer"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button
                    variant="outline"
                    className="text-green-600 border-green-600 dark:text-green-500 dark:border-green-500 hover:bg-green-100 dark:hover:bg-green-950/20 cursor-pointer"
                  >
                    Show All Responses <FileText className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {msg.role === "user" && (
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatMessages;
