"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setContentType } from "@/store/api/chatSlice";
import { AppDispatch } from "@/store/store";
import { Wand2 } from "lucide-react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import imageIcon from "../../public/images/elements.svg";
import imageGenerate from "../../public/images/gallery.svg";
import query from "../../public/images/query.svg";
import CommonButton from "./common/button/CommonButton";
import CommonHeader from "./common/header/CommonHeader";
import { Message } from "./ContentPage";
interface ChatInputProps {
  inputValue: string;
  setInputValue: (val: string) => void;
  handleGenerate: () => void;
  isGenerating: boolean;
  messages: Message[];
}

const ChatInput: React.FC<ChatInputProps> = ({
  inputValue,
  setInputValue,
  handleGenerate,

  isGenerating,
  messages,
}) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <>
      {messages.length === 0 && (
        <CommonHeader
          size="2xl"
          className="font-bold md:max-w-[600px] text-foreground !text-center "
        >
          Every perspective, every AI, one place.
        </CommonHeader>
      )}

      <div className="relative shadow-[0_8px_16px_0_rgba(107,115,123,0.16)] w-full max-w-3xl bg-sidebar dark:bg-card p-6 rounded-xl border border-border mb-10">
        <div
          className="shadow-[1px_1px_1px_0_rgba(0,0,0,0.18)] bg-black p-3 rounded-lg
"
        >
          <textarea
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              const textarea = e.target;
              textarea.style.height = "auto";
              textarea.style.height = `${textarea.scrollHeight}px`;
            }}
            className="w-full text-foreground  resize-none outline-none text-lg"
            placeholder="Ask a question about anything..."
          />
        </div>
        {/* Bottom controls */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div>
                  <CommonButton
                    variant="secondary"
                    className="flex items-center !rounded-full"
                  >
                    <Image
                      src={imageIcon}
                      alt="icon"
                      className="h-4 w-4 mr-1.5"
                    />
                    Specification
                  </CommonButton>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="bg-popover text-popover-foreground">
                <DropdownMenuItem
                  onClick={() => dispatch(setContentType("text"))}
                  className="hover:bg-accent hover:text-accent-foreground cursor-pointer"
                >
                  <Image src={query} alt="icon" className="h-4 w-4" />
                  Query
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => dispatch(setContentType("image"))}
                  className="hover:bg-accent hover:text-accent-foreground cursor-pointer"
                >
                  <Image src={imageGenerate} alt="icon" className="h-4 w-4" />
                  Create Image
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <CommonButton
            className="flex !py-3"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              "Generating..."
            ) : (
              <>
                Generate <Wand2 className="ml-2 h-4 w-4" />
              </>
            )}
          </CommonButton>
        </div>
      </div>
    </>
  );
};

export default ChatInput;
