import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ColumnSpacingIcon } from "@radix-ui/react-icons";
import { Button } from "antd";
import { useState } from "react";
import { useListPubicResearchTopicContext } from "./ListPublicResearchTopicContext";

const SearchResearchTopic = () => {
  // USE PROVIDER CONTEXT
  const {
    paramsFilter,
    setParamsFilter,
    listPublicResearchTopic,
    setListPublicResearchTopic,
  } = useListPubicResearchTopicContext();

  // STATE
  const [content, setContent] = useState<string>("");
  const handleSearch = () => {
    console.log("checking keywords search: ", content);
    const newParamsFilter = {
      ...paramsFilter,
      nameSearch: content,
    };
    // Cập nhật state hoặc context
    setParamsFilter(newParamsFilter);
  };
  return (
    <div className="flex w-full items-center space-x-2 h-full">
      <Input
        type="text"
        placeholder="Nhập tìm kiếm ở đây..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button
        onClick={handleSearch}
        className="px-3 py-[6px] h-full text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2 "
      >
        <MagnifyingGlassIcon width="16" />
        Tìm kiếm
      </Button>
    </div>
  );
};
export { SearchResearchTopic };
