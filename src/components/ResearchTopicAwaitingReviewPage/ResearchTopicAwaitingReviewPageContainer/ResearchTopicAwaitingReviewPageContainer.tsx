"use client";
import { formatDate } from "@/helper/extension-function";
import {
  ParamsGetListResearchTopicForReviewer,
  useGetListResearchTopicForReviewer,
} from "@/hooks-query/queries/use-get-research-topic-for-reviewer";
import {
  CalendarDateRangeIcon,
  FolderOpenIcon,
  IdentificationIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const ResearchTopicAwaitingReviewPageContainer = () => {
  const route = useRouter();
  //hiển thị danh sách đề tài cần phản biện
  let params: ParamsGetListResearchTopicForReviewer = {
    index: 1,
    pageSize: 100,
    isStatus: 0,
  };
  const { data: listResearchTopicAwaitingReview } =
    useGetListResearchTopicForReviewer(params);

  console.log(
    "=============>>>>checking list research topics awaiting review: ",
    listResearchTopicAwaitingReview?.data.items
  );
  return (
    <div>
      <div>
        <p className="font-semibold text-xl uppercase text-blue-950 mb-3">
          Danh sách các đề tài chờ phản biện
        </p>

        <div>
          {listResearchTopicAwaitingReview?.data.items.map((item, index) => {
            return (
              <div
                key={index}
                className="border rounded-md py-3 px-4 flex mb-3"
              >
                <div className="flex-1">
                  <p className="font-semibold text-lg text-blue-900">
                    {item.nameTopic}
                  </p>
                  <p className="flex gap-2 mt-2">
                    <FolderOpenIcon width={16} />
                    {item.disciplineName}
                  </p>
                  <p className="flex gap-2 mt-1">
                    <IdentificationIcon width={16} />
                    {item.supervisor}
                  </p>
                  <p className="flex gap-2 mt-1">
                    <CalendarDateRangeIcon width={16} />
                    {formatDate(item.review_Committees.dateStart || "") +
                      " ->" +
                      formatDate(item.review_Committees.dateEnd || "")}
                  </p>
                </div>
                <div
                  className="hover:cursor-pointer hover:text-blue-500 gap-2 hover:underline"
                  onClick={() => {
                    route.push(
                      `/reviewer/research-topic-awaiting-review/${item.id}`
                    );
                  }}
                >
                  Xem phản biện
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export { ResearchTopicAwaitingReviewPageContainer };
