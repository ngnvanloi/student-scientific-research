"use client";
import ReviewResearchTopicContainer from "@/components/ReviewResearchTopic/ReviewResearchTopicContainer";
import FormSubmitResearchTopic from "@/components/SubmitResearchProject/FormSubmitResearchTopic";
import { useState } from "react";

const UITest = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <ReviewResearchTopicContainer />
    </div>
  );
};
export default UITest;
