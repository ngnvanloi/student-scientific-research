"use client";
import { CloseModalIcon } from "@/assets/svg/close.modal";
import * as Dialog from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";
import { ResearchTopicWithContributors } from "@/types/ResearchTopicWithContributors";
import { SpinnerLoading } from "../SpinnerLoading/SpinnerLoading";
import ResearchTopicOverview from "../ResearchTopicAwaitingReviewPage/ResearchTopicAwaitingReviewPageDetails/ResearchTopicOverview";
import { ReviewOverview } from "../TopicAwaitingReviewPage/TopicAwaitingReviewPageDetail/ReviewOverview";
import { ResearchProjectTopic } from "@/types/ResearchProjectTopic";
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import FormSelect from "../FormCard/FormSelectField";
import { useForm } from "react-hook-form";
import { TFormApprovalRegistration } from "../FormCard/FormInputsData";
import { FormApprovalRegistration } from "../FormCard/ZodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ParamsCreateNotification,
  useCreateNotificationMutation,
} from "@/hooks-query/mutations/use-create-notification-mutation";
import {
  ParamsApprovalReviewAcceptance,
  useApprovalReviewAcceptanceMutation,
} from "@/hooks-query/mutations/use-approval-review-acceptance-for-research-topic-mutation";
import { useSession } from "next-auth/react";
import { NotificationContentSample } from "@/lib/notification-content-sample ";
import { useToast } from "@/hooks/use-toast";
import { Alert } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import AcceptanceOverview from "../AcceptanceCard/AcceptanceOverview";
import { Acceptance } from "@/types/Acceptance";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  acceptance: Acceptance | undefined;
}
const ModalShowDetailAcceptanceOfResearchTopic = (props: IProps) => {
  const { isOpen, setIsOpen, acceptance } = props;
  const { data: session } = useSession();
  const { toast } = useToast();

  // RENDER UI
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40 " />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-6xl mx-auto px-4 h-[690px] overflow-x-auto">
          <div className="bg-white rounded-md shadow-lg h-full  overflow-x-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <Dialog.Title className="text-lg font-medium text-gray-800 ">
                Thông tin chi tiết nghiệm thu: {acceptance?.name}
              </Dialog.Title>
              <Dialog.Close className="p-2 text-gray-400 rounded-md hover:bg-gray-100">
                <CloseModalIcon />
              </Dialog.Close>
            </div>
            <Dialog.Description className="space-y-2 p-4 text-[15.5px] leading-relaxed text-gray-500 h-full">
              <div className="pb-5">
                <AcceptanceOverview
                  acceptance={acceptance}
                  isShowReview={true}
                />
              </div>
            </Dialog.Description>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export { ModalShowDetailAcceptanceOfResearchTopic };
