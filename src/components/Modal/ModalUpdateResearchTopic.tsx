"use client";
import { CloseModalIcon } from "@/assets/svg/close.modal";
import { Competition } from "@/types/Competition";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "antd";
import React, { useState } from "react";
import { SubmitResearchProject } from "../SubmitResearchProject/SubmitResearchProject";
import FormSubmitResearchTopic from "../SubmitResearchProject/FormSubmitResearchTopic";
import FormUpdateResearchTopic from "../UpdateResearchTopic/UpdateResearchTopic";
import { ResearchProjectTopic } from "@/types/ResearchProjectTopic";
import { ResearchTopicWithContributors } from "@/types/ResearchTopicWithContributors";
import { SpinnerLoading } from "../SpinnerLoading/SpinnerLoading";

interface IProps {
  competition: Competition | undefined;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  researchTopic: ResearchTopicWithContributors | undefined;
}
const ModalUpdateResearchTopic = (props: IProps) => {
  const { competition, isOpen, setIsOpen, researchTopic } = props;
  const [isLoadingSpinner, setIsLoadingSpinner] = useState(false);
  // RENDER UI
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      {isLoadingSpinner ? <SpinnerLoading /> : ""}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40 " />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-6xl mx-auto px-4 h-[690px] overflow-x-auto">
          <div className="bg-white rounded-md shadow-lg h-full  overflow-x-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <Dialog.Title className="text-lg font-medium text-gray-800 ">
                Chỉnh sửa đề tài {researchTopic?.nameTopic}
              </Dialog.Title>
              <Dialog.Close className="p-2 text-gray-400 rounded-md hover:bg-gray-100">
                <CloseModalIcon />
              </Dialog.Close>
            </div>
            <Dialog.Description className="space-y-2 p-4 mt-3 text-[15.5px] leading-relaxed text-gray-500 h-full">
              <FormUpdateResearchTopic
                competition={competition}
                setIsOpen={setIsOpen}
                researchTopic={researchTopic}
                setIsLoadingSpinner={setIsLoadingSpinner}
              />
            </Dialog.Description>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export { ModalUpdateResearchTopic };
