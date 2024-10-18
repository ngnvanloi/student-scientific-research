"use client";
import TabAttachmentFile from "@/components/SubmitResearchProject/TabAttachmentFile";
import TabCollaborator from "@/components/SubmitResearchProject/TabCollaborator";
import TabConfirmationStep from "@/components/SubmitResearchProject/TabConfirmationStep";
import TabOverview from "@/components/SubmitResearchProject/TabOverview";
import TabResearchGoalsResults from "@/components/SubmitResearchProject/TabResearchGoalsResults";
import {
  ClipboardDocumentListIcon,
  DocumentCheckIcon,
  PaperClipIcon,
  RectangleStackIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";
import {
  TFormSubmitResearchProjectTabGoalResult,
  TFormSubmitResearchProjectTabOveriew,
} from "../FormCard/FormInputsData";

const SubmitResearchProject = () => {
  // STATE
  const [overViewFields, setOverviewFields] =
    useState<TFormSubmitResearchProjectTabOveriew>();

  const [goalResultFields, setGoalResultFiels] =
    useState<TFormSubmitResearchProjectTabGoalResult>();

  // CHECK CHỌT
  console.log("check overviewFields: " + JSON.stringify(overViewFields));
  console.log("check goalResultFiels: " + JSON.stringify(goalResultFields));

  // TABS ITEMS
  const tabItems = [
    {
      icon: <RectangleStackIcon width={"20px"} />,
      name: "Overview",
      contentElement: (
        <TabOverview
          overViewFields={overViewFields}
          setOverviewFields={setOverviewFields}
        />
      ),
    },
    {
      icon: <ClipboardDocumentListIcon width={"20px"} />,
      name: "Goals and Results",
      contentElement: (
        <TabResearchGoalsResults
          goalResultFields={goalResultFields}
          setGoalResultFiels={setGoalResultFiels}
        />
      ),
    },
    {
      icon: <UsersIcon width={"20px"} />,
      name: "Collaborators",
      contentElement: <TabCollaborator />,
    },
    {
      icon: <PaperClipIcon width={"20px"} />,
      name: "File attachment",
      contentElement: <TabAttachmentFile />,
    },
    {
      icon: <DocumentCheckIcon width={"20px"} />,
      name: "Final Confirmation",
      contentElement: <TabConfirmationStep />,
    },
  ];

  // RENDER UI
  return (
    <Tabs.Root
      className="max-w-screen-xl mx-auto px-4 md:px-8"
      defaultValue="Overview"
    >
      <Tabs.List
        className="w-full border-b flex items-center gap-x-3 overflow-x-auto text-sm"
        aria-label="Manage your account"
      >
        {tabItems.map((item, idx) => (
          <Tabs.Trigger
            key={idx}
            className="group outline-none py-1.5 border-b-2 border-white text-gray-500 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
            value={item.name}
          >
            <div className="flex items-center gap-x-2 py-1.5 px-3 rounded-lg duration-150 group-hover:text-indigo-600 group-hover:bg-gray-50 group-active:bg-gray-100 font-medium">
              {item.icon}
              {item.name}
            </div>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {tabItems.map((item, idx) => (
        <Tabs.Content key={idx} className="py-6" value={item.name}>
          {item.contentElement}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};
export { SubmitResearchProject };
