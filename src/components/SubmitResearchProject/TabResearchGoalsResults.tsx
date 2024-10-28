"use client";

import { useState } from "react";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import { TFormSubmitResearchProjectTabGoalResult } from "../FormCard/FormInputsData";
import { Button } from "antd";

interface IProps {
  goalResultFields: TFormSubmitResearchProjectTabGoalResult | undefined;
  setGoalResultFiels: React.Dispatch<
    React.SetStateAction<TFormSubmitResearchProjectTabGoalResult | undefined>
  >;
}
const TabResearchGoalsResults = (props: IProps) => {
  const { goalResultFields, setGoalResultFiels } = props;
  const [researchProject_Goal, setTaget] = useState<string>("");
  const [researchProject_Result, setAchievedResult] = useState<string>("");

  // HANDLE LOGIC
  const onSubmit = () => {
    const data: TFormSubmitResearchProjectTabGoalResult = {
      researchProject_Goal,
      researchProject_Result,
    };
    setGoalResultFiels(data);
  };

  // RENDER UI
  return (
    <div>
      <div className="h-[200px]">
        <h4 className="py-2 font-bold">Mục tiêu đề tài</h4>

        <div className="max-h-[300px] overflow-auto border-b border-b-[#ccc] shadow-inner">
          <RichTextEditor
            content={researchProject_Goal || ""}
            setContent={setTaget}
          />
        </div>
      </div>

      <div className="h-[200px] mt-[100px]">
        <h4 className="py-2 font-bold">Kết quả đạt được</h4>
        <div className="max-h-[300px] overflow-auto border-b border-b-[#ccc] shadow-inner">
          <RichTextEditor
            content={researchProject_Result || ""}
            setContent={setAchievedResult}
          />
        </div>
      </div>

      <Button onClick={() => onSubmit()}>Next step</Button>
    </div>
  );
};
export default TabResearchGoalsResults;
