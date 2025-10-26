"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { ReactNode, useState } from "react";
interface TabItem {
  label: string;
  value: string;
  content?: ReactNode;
}

interface ReusableTabsProps {
  tabs: TabItem[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

const MiniTabs: React.FC<ReusableTabsProps> = ({
  tabs,
  defaultValue,
  onValueChange,
}) => {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value);

  const handleChange = (value: string) => {
    setActiveTab(value);
    if (onValueChange) onValueChange(value);
  };

  return (
    <div>
      <Tabs value={activeTab} onValueChange={handleChange}>
        <TabsList className="bg-[#ECECF0] p-1 rounded-xl mb-6">
          {tabs.map(({ label, value }) => (
            <TabsTrigger
              key={value}
              value={value}
              className={`px-4 cursor-pointer py-2 rounded-lg text-sm text-primary transition-colors duration-200 ${
                activeTab === value ? "bg-white shadow-sm" : ""
              }`}
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Tab Panels */}
      <div role="tabpanel">
        {tabs.find((tab) => tab.value === activeTab)?.content}
      </div>
    </div>
  );
};

export default MiniTabs;
