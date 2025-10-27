"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Wand2 } from "lucide-react";
import Image from "next/image";
import { HiOutlinePlusCircle } from "react-icons/hi";
import CommonButton from "./common/button/CommonButton";

interface ChatInputProps {
  inputValue: string;
  setInputValue: (val: string) => void;
  handleGenerate: () => void;
  handleNewQuery: () => void;
  isGenerating: boolean;
  imageIcon: string;
  query: string;
  imageGenerate: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  inputValue,
  setInputValue,
  handleGenerate,
  handleNewQuery,
  isGenerating,
  imageIcon,
  query,
  imageGenerate,
}) => {
  return (
    <div className="relative shadow-[0_8px_16px_0_rgba(107,115,123,0.16)] w-full max-w-3xl bg-sidebar dark:bg-card p-6 rounded-xl border border-border">
      <textarea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full bg-background text-foreground p-3 rounded-lg resize-none outline-none text-lg"
        rows={2}
        placeholder="Type your query here..."
      />

      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div>
                <CommonButton
                  variant="secondary"
                  className="flex items-center !px-1 !py-1 !rounded-full"
                >
                  <HiOutlinePlusCircle className="h-6 w-6" />
                </CommonButton>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-popover text-popover-foreground">
              <DropdownMenuItem
                onClick={handleNewQuery}
                className="hover:bg-accent hover:text-accent-foreground cursor-pointer"
              >
                Query
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-accent hover:text-accent-foreground cursor-pointer">
                Create Image
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
                onClick={handleNewQuery}
                className="hover:bg-accent hover:text-accent-foreground cursor-pointer"
              >
                <Image src={query} alt="icon" className="h-4 w-4" />
                Query
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-accent hover:text-accent-foreground cursor-pointer">
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
  );
};

export default ChatInput;
