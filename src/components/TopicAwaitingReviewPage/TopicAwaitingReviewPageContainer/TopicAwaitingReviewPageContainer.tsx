"use client";
import { formatDate } from "@/helper/extension-function";
import {
  ParamsGetListResearchTopicForAuthorByRolename,
  useGetListResearchTopicForAuthorByRolename,
} from "@/hooks-query/queries/use-get-research-topic-for-author";
import {
  CalendarDateRangeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const TopicAwaitingReviewPageContainer = () => {
  const route = useRouter();
  let params: ParamsGetListResearchTopicForAuthorByRolename = {
    roleName: "author",
    index: 1,
    pageSize: 999,
  };
  const { data: ownResearchTopic } =
    useGetListResearchTopicForAuthorByRolename(params);

  return (
    <div>
      <p className="font-semibold text-xl uppercase text-blue-950 mb-3">
        Danh sách các đề tài chờ phản biện
      </p>

      <div>
        {ownResearchTopic?.data.items.map((item, index) => {
          return (
            <div key={index} className="border rounded-md py-3 px-4 flex mb-3">
              <div className="flex-1">
                <p className="font-semibold text-lg text-blue-900">
                  {item.nameTopic}
                </p>
                <p className="mt-1 flex gap-2">
                  <UserGroupIcon width={16} />
                  {item.author_ResearchTopics
                    ?.map((ite) => ite.author.name)
                    .join(", ")}
                </p>
                <p className="flex gap-2">
                  <CalendarDateRangeIcon width={16} />
                  {formatDate(item.review_Committees?.dateStart || "") +
                    " ->" +
                    formatDate(item.review_Committees?.dateEnd || "")}
                </p>
              </div>
              <div
                className="hover:cursor-pointer hover:text-blue-500 gap-2 hover:underline"
                onClick={() => {
                  route.push(
                    `/author/research-topic-awaiting-review/${item.id}`
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
  );
};
export { TopicAwaitingReviewPageContainer };
