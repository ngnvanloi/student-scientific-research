"use client";
import { formatDate } from "@/helper/extension-function";
import { Acceptance } from "@/types/Acceptance";
import {
  CalendarDateRangeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
interface IProps {
  acceptance: Acceptance | undefined;
}
const PublicResearchTopicCard = (props: IProps) => {
  const { acceptance } = props;
  const router = useRouter();
  return (
    <div
      className="border rounded-md py-3 px-4 flex mb-3 gap-x-2 border-l-4 border-l-blue-900 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-10 duration-300 hover:cursor-pointer hover:shadow-sm"
      onClick={() => {
        router.push(`/research-topic/${acceptance?.id}`);
      }}
    >
      <div className="flex-1">
        <p className="font-semibold text-lg text-blue-900">
          {acceptance?.name}
        </p>
        <p className="flex gap-2 mt-1 items-center">
          <UserGroupIcon width={20} />
          {acceptance?.researchTopic?.author_ResearchTopics
            ?.map((author) => author.author.name)
            .join(", ")}
        </p>
        <p className="flex gap-2 mt-1 items-center">
          <CalendarDateRangeIcon width={20} />
          {formatDate(acceptance?.dateAcceptance || "")}
        </p>
      </div>
    </div>
  );
};
export { PublicResearchTopicCard };
