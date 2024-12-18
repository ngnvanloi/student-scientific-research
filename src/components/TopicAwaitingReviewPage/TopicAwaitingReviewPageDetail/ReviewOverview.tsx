"use client";
import { AccordionCustom } from "@/components/Accordion/Accordion";
import {
  columns,
  DataTablePreviewMemberOfReviewCouncil,
} from "@/components/DataTable/DataTablePreviewMemberOfReviewCouncil";
import { formatDate } from "@/helper/extension-function";
import { ResearchProjectTopic } from "@/types/ResearchProjectTopic";
import { ResearchTopicWithContributors } from "@/types/ResearchTopicWithContributors";

interface IProps {
  researchTopicDetail: ResearchProjectTopic | ResearchTopicWithContributors;
}
const ReviewOverview = (props: IProps) => {
  const { researchTopicDetail } = props;
  // hiển thị thông tin danh sách thành viện hội đồn phản biện + phiếu phản biện của mỗi người

  return (
    <div>
      <div className="">
        <p className="font-semibold mb-3 text-blue-900 text-base">
          Hội đồng phản biện:{" "}
          {researchTopicDetail.review_Committees.reviewCommitteeName}
        </p>
        <DataTablePreviewMemberOfReviewCouncil
          columns={columns}
          data={researchTopicDetail.review_Committees.reviewBoardMembers || []}
        />
      </div>
      <div>
        <p className="font-semibold my-3 text-blue-900 text-base">
          Nội dung phản biện
        </p>
        <div className="max-h-[500px] overflow-x-auto">
          {researchTopicDetail.history_Update_ResearchTopics.map(
            (item, index) => {
              return (
                <div className="border mb-3 py-2 px-3">
                  <AccordionCustom
                    childrenTrigger={
                      <div className="flex gap-2">
                        <p className="font-semibold text-blue-700">
                          Phiên bản đề tài: {index + 1}
                        </p>
                        <p>
                          Ngày cập nhật: {formatDate(item?.dateUpdate || "")}
                        </p>
                      </div>
                    }
                    childrenContent={
                      <div className="mt-3">
                        {item.review_Forms.map((item, index) => {
                          return (
                            <div key={index} className="border p-2 mb-1">
                              <p className="font-semibold">
                                Người phản biện: {item.reviewer?.name}
                              </p>
                              <p className="text-xs">
                                Ngày phản biện:{" "}
                                {formatDate(item?.date_Upload || "")}
                              </p>
                              <p className="mt-2">Nội dung: {item.content}</p>
                              {(() => {
                                if (item.conclude.id === 1) {
                                  return (
                                    <p className="text-green-600">
                                      Kết luận: {item.conclude.result}
                                    </p>
                                  );
                                } else if (item.conclude.id === 2) {
                                  return (
                                    <p className="text-red-600">
                                      Kết luận: {item.conclude.result}
                                    </p>
                                  );
                                } else {
                                  return (
                                    <p className="text-yellow-500">
                                      Kết luận: {item.conclude.result}
                                    </p>
                                  );
                                }
                              })()}
                            </div>
                          );
                        })}
                      </div>
                    }
                  />
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};
export { ReviewOverview };
