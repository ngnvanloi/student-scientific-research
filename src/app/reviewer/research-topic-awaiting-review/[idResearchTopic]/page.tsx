"use client";
import PreviewPDFCustomToolbar from "@/components/PreviewPDF/PreviewPDFCustomToolbar";
import ResearchTopicOverview from "@/components/ResearchTopicAwaitingReviewPage/ResearchTopicAwaitingReviewPageDetails/ResearchTopicOverview";
import TabsReviewForAllVersionOfResearchTopic from "@/components/ResearchTopicAwaitingReviewPage/ResearchTopicAwaitingReviewPageDetails/TabsReviewForAllVersionOfResearchTopic";
import { useGetResearchProjectTopicDetail } from "@/hooks-query/queries/use-get-research-topic-detail";
import {
  ArrowTurnDownLeftIcon,
  CursorArrowRippleIcon,
} from "@heroicons/react/24/outline";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ResearchTopicAwaitingReviewPageDetailsPage = ({
  params,
}: {
  params: { idResearchTopic: number };
}) => {
  const { idResearchTopic } = params;
  const route = useRouter();
  const { data: researchTopicDetail } =
    useGetResearchProjectTopicDetail(idResearchTopic);
  // console.log("file path: ", researchTopicDetail?.data.reportFilePath);
  useEffect(() => {
    document.title = `Phản Biện Đề Tài: ${researchTopicDetail?.data.nameTopic}`;
  }, [researchTopicDetail]);
  const authorAccountId = researchTopicDetail?.data.author_ResearchTopics.find(
    (item) => item.roleName === "author"
  )?.author.accountId;
  const [fileVersionUrl, setFileVersionUrl] = useState<string>(
    researchTopicDetail?.data.reportFilePath ||
      "https://firebasestorage.googleapis.com/v0/b/seminarclouds.appspot.com/o/ReportFile%2F8ad96830-bf95-41bf-aa05-1a5beb66e9eb_mongodb.pdf?alt=media"
  );
  return (
    <div>
      <div
        className="hover:cursor-pointer hover:text-blue-500 flex gap-2 items-center mb-3 w-32"
        onClick={() => {
          route.back();
        }}
      >
        <ArrowTurnDownLeftIcon width={20} />
        Quay lại
      </div>
      <div className="mb-5">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="flex gap-2 items-center hover:cursor-pointer hover:text-blue-500 font-semibold">
              <p>Nhấn vào đây để hiển thị/ẩn tổng quan đề tài</p>
              <CursorArrowRippleIcon width={20} />
            </AccordionTrigger>
            <AccordionContent>
              <ResearchTopicOverview
                researchTopic={researchTopicDetail?.data}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="grid grid-cols-2 gap-1">
        <div className="border h-screen">
          <PreviewPDFCustomToolbar fileUrl={fileVersionUrl} />
        </div>
        <div className="border">
          {researchTopicDetail?.data && (
            <TabsReviewForAllVersionOfResearchTopic
              setFileVersionUrl={setFileVersionUrl}
              researchTopicDetail={researchTopicDetail?.data}
              accountID={authorAccountId || 0}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default ResearchTopicAwaitingReviewPageDetailsPage;
