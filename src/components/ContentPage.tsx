"use client";
import {
  useSendSessionForImageMutation,
  useSendSessionForTextMutation,
} from "@/store/api/AIApi";
import { resetTrigger, setContentType } from "@/store/api/chatSlice";
import { AiResponse, ImageApiResponse } from "@/store/api/types/profile";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import TypingLoader from "./reuseable/TypingLoader";

export type Message =
  | { role: "user"; contentBody: string }
  | { role: "ai"; contentBody: AiResponse | ImageApiResponse };
const ContentPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    triggerNewQuery,
    sessionId: reduxSessionId,
    contentType,
  } = useSelector((state: RootState) => state.chat);

  const [sessionId, setSessionId] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const [sendSessionForText, { isLoading: isLoadingText }] =
    useSendSessionForTextMutation();
  const [sendSessionForImage, { isLoading: isLoadingImage }] =
    useSendSessionForImageMutation();

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

  // const handleNewQuery = () => {
  //   dispatch(setContentType("text"));
  //   setMessages([]);
  //   setInputValue("");
  //   setSessionId(uuidv4());
  //   dispatch(newQuery());
  //   dispatch(resetTrigger());
  // };

  const handleTextGeneration = async () => {
    dispatch(setContentType("text"));
    if (!inputValue.trim()) return;

    const userMessage: Message = { role: "user", contentBody: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    try {
      const res = await sendSessionForText({
        session_id: sessionId,
        prompt: inputValue,
        contentType,
      }).unwrap();

      const aiMessage: Message = { role: "ai", contentBody: res };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("AI response error:", err);
      toast.error("Failed to get AI response");
    }
  };
  const handleImageGeneration = async () => {
    dispatch(setContentType("image"));
    if (!inputValue.trim()) return;

    const userMessage: Message = { role: "user", contentBody: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    try {
      const res = await sendSessionForImage({
        session_id: sessionId,
        prompt: inputValue,
        contentType,
      }).unwrap();

      const aiMessage: Message = { role: "ai", contentBody: res };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("AI response error:", err);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const handleGenerate = () => {
    if (isLoadingText || isLoadingImage) return;
    setIsGenerating(true);
    if (contentType === "text") handleTextGeneration();
    else if (contentType === "image") handleImageGeneration();
    setIsGenerating(false);
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 overflow-hidden">
      {isLoadingText || isLoadingImage ? (
        <TypingLoader size={8} color="#999" text="Thinking" />
      ) : (
        <ChatMessages messages={messages} handleCopy={handleCopy} />
      )}

      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleGenerate={handleGenerate}
        isGenerating={isGenerating}
        messages={messages}
      />
    </div>
  );
};

export default ContentPage;
