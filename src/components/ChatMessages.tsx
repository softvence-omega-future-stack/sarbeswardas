"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetProfileQuery } from "@/store/api/profileApi";
import { User } from "lucide-react";
import Image from "next/image";
import { MdOutlineFileDownload } from "react-icons/md";
// import userImage from "../../public/aiProm.png";
// import userAvator from "../../public/user.jpg";
import { formatAIResponse, getAdapterResponse } from "@/lib/utils";
import { useLazyGetSingleSessionQuery } from "@/store/api/AIApi";
import { AiResponse, ImageApiResponse } from "@/store/api/types/profile";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import CommonHeader from "./common/header/CommonHeader";
import { Message } from "./ContentPage";
import AITabs from "./reuseable/AITabs";
export type adapterType = "openai" | "gemini" | "claude" | "perplexity";
interface ChatMessagesProps {
  messages: Message[];
  handleCopy: (text: string) => void;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  handleCopy,
}) => {
  const { data: profile } = useGetProfileQuery();
  const [activeAdapter, setActiveAdapter] = useState<adapterType>("gemini");

  const isAiTextResponse = (
    content: AiResponse | ImageApiResponse
  ): content is AiResponse => {
    return (
      typeof (content as AiResponse).data?.response !== "undefined" &&
      typeof (content as AiResponse).data?.response === "object"
    );
  };

  const handleImageDownload = async (imageUrl: string, prompt: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${prompt.replace(/\s+/g, "_").slice(0, 30)}.jpg`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  // Lazy query
  const [fetchSingleSession, { data: singleSessionData }] =
    useLazyGetSingleSessionQuery();

  const selectedSessionId = useSelector(
    (state: RootState) => state.chat.selectedSessionId
  );

  useEffect(() => {
    if (selectedSessionId) {
      fetchSingleSession(selectedSessionId);
    }
  }, [selectedSessionId, fetchSingleSession]);

  console.log("singleSessionData", singleSessionData?.data.messages);
  return (
    <div className="w-full overflow-y-auto flex flex-col gap-3 md:gap-4 ">
      {messages.map(
        (message, i) =>
          message.role === "user" && (
            <div
              key={i}
              className="ml-auto max-w-[340px]  flex flex-col gap-3  "
            >
              <div className="  flex  gap-3 items-baseline-last">
                <div className="bg-[#212B36]/20 p-6 rounded-t-3xl rounded-bl-3xl">
                  <CommonHeader size="md" className="!text-[#F9FAFB] ">
                    {message.contentBody}
                  </CommonHeader>
                </div>
                <Avatar className="h-7 w-7 self-end">
                  <AvatarImage
                    src={profile?.data.profileImage || ""}
                    alt="User profile"
                  />

                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          )
      )}
      {messages.map(
        (message, i) =>
          message.role === "ai" && (
            <div
              key={i}
              className="max-w-[572px] bg-[#212B36]/20 p-6 rounded-3xl overflow-hidden"
            >
              {activeAdapter === "gemini" &&
                isAiTextResponse(message.contentBody) && (
                  <div>
                    <CommonHeader size="md" className="!text-[#919EAB]">
                      {formatAIResponse(
                        message.contentBody.data.response.selected.text
                      )}
                    </CommonHeader>
                  </div>
                )}
              {activeAdapter === "openai" &&
                isAiTextResponse(message.contentBody) && (
                  <div>
                    <CommonHeader size="md" className="!text-[#919EAB]">
                      {getAdapterResponse(
                        message.contentBody.data.response.allResponses,
                        activeAdapter
                      )}
                    </CommonHeader>
                  </div>
                )}
              {activeAdapter === "claude" &&
                isAiTextResponse(message.contentBody) && (
                  <div>
                    <CommonHeader size="md" className="!text-[#919EAB]">
                      {getAdapterResponse(
                        message.contentBody.data.response.allResponses,
                        activeAdapter
                      )}
                    </CommonHeader>
                  </div>
                )}
              {activeAdapter === "perplexity" &&
                isAiTextResponse(message.contentBody) && (
                  <div>
                    <CommonHeader size="md" className="!text-[#919EAB]">
                      {getAdapterResponse(
                        message.contentBody.data.response.allResponses,
                        activeAdapter
                      )}
                    </CommonHeader>
                  </div>
                )}

              {isAiTextResponse(message.contentBody) && (
                <hr className="border-t border-[#454F5B] my-4.5" />
              )}

              <div>
                {!isAiTextResponse(message.contentBody) && (
                  <Image
                    width={524}
                    height={350}
                    src={
                      (message.contentBody as ImageApiResponse).data.imageUrl
                    }
                    className="rounded-xl"
                    alt="User profile"
                  />
                )}
              </div>

              <div className="flex justify-between items-center pt-4.5 ">
                {isAiTextResponse(message.contentBody) && (
                  <AITabs
                    activeAdapter={activeAdapter}
                    setActiveAdapter={setActiveAdapter}
                  />
                )}
                <div className={" w-fit ml-auto"}>
                  {isAiTextResponse(message.contentBody) && (
                    <span
                      onClick={() =>
                        handleCopy(
                          activeAdapter === "gemini"
                            ? formatAIResponse(
                                (message.contentBody as AiResponse).data
                                  .response.selected.text
                              )
                            : getAdapterResponse(
                                (message.contentBody as AiResponse).data
                                  .response.allResponses,
                                activeAdapter
                              )
                        )
                      }
                      className="bg-[#000000] p-1.5 rounded text-base cursor-pointer"
                    >
                      <IoCopyOutline />
                    </span>
                  )}

                  <div className="w-full ml-auto">
                    {!isAiTextResponse(message.contentBody) && (
                      <div
                        onClick={() =>
                          handleImageDownload(
                            (message.contentBody as ImageApiResponse).data
                              .imageUrl,
                            message.contentBody.data.prompt
                          )
                        }
                        className={`bg-[#000000] p-1.5 rounded text-base cursor-pointer " `}
                      >
                        <MdOutlineFileDownload className="size-4" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default ChatMessages;
