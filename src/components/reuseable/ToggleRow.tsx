"use client";
import React from "react";
import CustomSwitch from "../common/custom/CustomSwitch";
import FormHeader from "./FormHeader";

interface ToggleRowProps {
  title: string;
  description?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  borderTop?: boolean;
  borderBottom?: boolean;
}

const ToggleRow: React.FC<ToggleRowProps> = ({
  title,
  description,
  checked,
  onChange,
  borderTop,
  borderBottom,
}) => {
  return (
    <div
      className={`w-full flex justify-between items-center ${
        borderTop ? "border-t-[1.73px] border-border pt-6" : ""
      } ${borderBottom ? "border-b-[1.73px] border-border pb-6" : ""}`}
    >
      <FormHeader title={title} description={description} />
      <CustomSwitch checked={checked} onChange={onChange} />
    </div>
  );
};

export default ToggleRow;
