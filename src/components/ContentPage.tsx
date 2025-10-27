"use client";
import { newQuery, resetTrigger } from "@/store/api/chatSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import CommonHeader from "./common/header/CommonHeader";

import { useSendSessionMutation } from "@/store/api/AIApi";
import imageIcon from "../../public/images/elements.svg";
import imageGenerate from "../../public/images/gallery.svg";
import query from "../../public/images/query.svg";
import TypingLoader from "./reuseable/TypingLoader";

const ContentPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { triggerNewQuery, sessionId: reduxSessionId } = useSelector(
    (state: RootState) => state.chat
  );

  const [sessionId, setSessionId] = useState<string>("");
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; content: string }[]
  >([]);
  const [inputValue, setInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [sendSession, { isLoading: sendSessionLoading }] =
    useSendSessionMutation();

  useEffect(() => {
    if (!reduxSessionId) setSessionId(uuidv4());
    else setSessionId(reduxSessionId);
  }, [reduxSessionId]);

  useEffect(() => {
    if (triggerNewQuery) {
      setMessages([]);
      setInputValue("");
      setSessionId(uuidv4());
      dispatch(resetTrigger());
    }
  }, [triggerNewQuery, dispatch]);

  const handleNewQuery = () => {
    setMessages([]);
    setInputValue("");
    setSessionId(uuidv4());
    dispatch(newQuery());
  };

  const handleGenerate = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { role: "user" as const, content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsGenerating(true);

    const responseText = `Hello, ${inputValue}.`;

    let i = 0;
    let temp = "";
    setMessages((prev) => [...prev, { role: "ai", content: "" }]);
    const interval = setInterval(() => {
      temp += responseText[i];
      i++;
      if (i >= responseText.length) {
        clearInterval(interval);
        setIsGenerating(false);
      }
      setMessages((prev) => {
        const lastIdx = prev.length - 1;
        return prev.map((msg, idx) =>
          idx === lastIdx && msg.role === "ai" ? { ...msg, content: temp } : msg
        );
      });
    }, 20);

    try {
      await sendSession({
        session_id: sessionId,
        prompt: inputValue,
        contentType: "text",
      }).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="flex h-full flex-col items-center justify-center p-4 gap-6">
      {messages.length === 0 ? (
        <CommonHeader
          size="2xl"
          className="font-bold md:max-w-[500px] text-foreground !text-center"
        >
          Every perspective, every AI, one place.
        </CommonHeader>
      ) : isGenerating || sendSessionLoading ? (
        <TypingLoader />
      ) : (
        <ChatMessages
          messages={messages}
          handleCopy={handleCopy}
          sessionId={sessionId}
        />
      )}

      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleGenerate={handleGenerate}
        handleNewQuery={handleNewQuery}
        isGenerating={isGenerating}
        imageIcon={imageIcon}
        query={query}
        imageGenerate={imageGenerate}
      />
    </div>
  );
};

export default ContentPage;
