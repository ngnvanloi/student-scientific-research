"use client";
import CountdownTimer from "@/components/CountdownTimer/CountdownTimer";
import { ReviewOverview } from "@/components/TopicAwaitingReviewPage/TopicAwaitingReviewPageDetail/ReviewOverview";
import { SubmitNewResearchTopicVersion } from "@/components/TopicAwaitingReviewPage/TopicAwaitingReviewPageDetail/SubmitNewResearchTopicVersion";
import { useGetResearchProjectTopicDetail } from "@/hooks-query/queries/use-get-research-topic-detail";
import { ArrowTurnDownLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const TopicAwaitingReviewPageDetail = ({
  params,
}: {
  params: { idResearchTopic: number };
}) => {
  const { idResearchTopic } = params;
  const route = useRouter();
  const { data: researchTopicDetail } =
    useGetResearchProjectTopicDetail(idResearchTopic);

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
        <p className="font-semibold uppercase text-lg text-center mb-3">
          {researchTopicDetail?.data.nameTopic}
        </p>
        {researchTopicDetail?.data.review_Committees.dateEnd && (
          <div className="flex gap-3 justify-center">
            <p>Thời gian còn lại:</p>
            <CountdownTimer
              endDate={researchTopicDetail?.data.review_Committees.dateEnd}
            />
          </div>
        )}
      </div>
      <div className="flex gap-1">
        {researchTopicDetail?.data && (
          <ReviewOverview researchTopicDetail={researchTopicDetail.data} />
        )}
        <div className="basis-2/5">
          <p className="mb-3 text-blue-900 font-semibold text-base">
            Phần cập nhật đề tài
          </p>
          <div className="border rounded-lg">
            {researchTopicDetail?.data && (
              <SubmitNewResearchTopicVersion
                researchTopicDetail={researchTopicDetail?.data}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicAwaitingReviewPageDetail;
