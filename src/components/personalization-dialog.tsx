"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";
import AlertBox from "./AlertBox";
import CommonButton from "./common/button/CommonButton";
import CommonBorder from "./common/custom/CommonBorder";
import CommonHeader from "./common/header/CommonHeader";
import CommonWrapper from "./common/space/CommonWrapper";
import Separator from "./common/space/Separator";
import FormHeader from "./reuseable/FormHeader";

interface Props {
  handleClose: () => void;
}
const PersonalizationDialog: React.FC<Props> = ({ handleClose }) => {
  const { theme, setTheme } = useTheme();

  return (
    <CommonWrapper className="">
      <CommonBorder className="sm:min-w-[380px] pointer-events-auto">
        <div className="space-y-4.5">
          <FormHeader title="Personalization" handleClose={handleClose} />
          <Separator marginY="4.5" />

          <div className="flex items-center justify-between">
            <CommonHeader>Theme</CommonHeader>
            <Select
              value={theme === "system" ? "system" : theme}
              onValueChange={(val) => setTheme(val)}
            >
              <SelectTrigger className="w-[140px] cursor-pointer text-white">
                <SelectValue placeholder="Select Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className=" cursor-pointer" value="light">
                  Light
                </SelectItem>
                <SelectItem className=" cursor-pointer" value="dark">
                  Dark
                </SelectItem>
                <SelectItem className=" cursor-pointer" value="system">
                  System
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Language Selector */}
          <div className="flex items-center justify-between">
            <CommonHeader>Language</CommonHeader>
            <Select defaultValue="en">
              <SelectTrigger className="w-[140px] cursor-pointer text-white">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className=" cursor-pointer" value="en">
                  English
                </SelectItem>
                <SelectItem className=" cursor-pointer" value="bn">
                  Bangla
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <AlertBox title="This will change your whole interface." />

          {/* Buttons */}
          <div className="flex justify-center gap-4.5">
            <CommonButton onClick={handleClose} className="cursor-pointer">
              Save
            </CommonButton>
            <CommonButton
              variant="secondary"
              onClick={handleClose}
              className="cursor-pointer"
            >
              Cancel
            </CommonButton>
          </div>
        </div>
      </CommonBorder>
    </CommonWrapper>
  );
};

export default PersonalizationDialog;
