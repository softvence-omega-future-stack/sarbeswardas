import { adapterType } from "../ChatMessages";
import CommonButton from "../common/button/CommonButton";

interface AITabsProps {
  setActiveAdapter: (adapter: adapterType) => void;
  activeAdapter: adapterType;
}

const adapters: adapterType[] = ["gemini", "openai", "claude", "perplexity"];
const AITabs: React.FC<AITabsProps> = ({ setActiveAdapter, activeAdapter }) => {
  return (
    <div className="flex gap-2">
      {adapters.map((adapter) => (
        <CommonButton
          key={adapter}
          className={`capitalize ${
            adapter === activeAdapter ? "!bg-[#22C55E]" : "!bg-[#000]"
          }`}
          onClick={() => setActiveAdapter(adapter)}
        >
          {adapter}
        </CommonButton>
      ))}
    </div>
  );
};

export default AITabs;
