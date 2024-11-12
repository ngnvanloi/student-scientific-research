"use client";
import DateTimePicker from "@/components/DatePicker/DateTimePicker";
import ReviewResearchTopicContainer from "@/components/ReviewResearchTopic/ReviewResearchTopicContainer";
import FormSubmitResearchTopic from "@/components/SubmitResearchProject/FormSubmitResearchTopic";
import { useState } from "react";

const UITest = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  return (
    <div>
      <div>
        <DateTimePicker date={selectedDate} setDate={setSelectedDate} />
        <p>Selected Date: {selectedDate?.toISOString()}</p>
      </div>
      <ReviewResearchTopicContainer />
    </div>
  );
};
export default UITest;
