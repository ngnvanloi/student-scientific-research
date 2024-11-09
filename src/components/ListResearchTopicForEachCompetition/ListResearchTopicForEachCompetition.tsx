"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Badge } from "antd";
import { Competition } from "@/types/Competition";
import {
  ParamsGetListResearchTopicForeachCompetition,
  useGetListResearchTopicForeachCompetition,
} from "@/hooks-query/queries/use-get-research-topic-foreach-competition";
import { ResearchTopicComponentForAdmin } from "./ResearchTopicComponentForAdmin";
import { useEffect } from "react";
interface IProps {
  competition: Competition;
  isAssignment: boolean;
}
const ListResearchTopicForEachCompetition = (props: IProps) => {
  const { competition, isAssignment } = props;
  // lấy ra danh sách đề tài cho từng cuộc thi
  let params: ParamsGetListResearchTopicForeachCompetition = {
    competitionId: competition.id,
    index: 1,
    pageSize: 100,
  };
  const { data: listResearchTopic, refetch } =
    useGetListResearchTopicForeachCompetition(params);
  console.log(
    "==== checking list research topics: ",
    JSON.stringify(listResearchTopic?.data.items)
  );

  useEffect(() => {
    refetch();
  }, [competition]);

  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <h3 className="">{competition.competitionName}</h3>
          </AccordionTrigger>
          <AccordionContent>
            {listResearchTopic?.data.items.map((topic) => (
              <ResearchTopicComponentForAdmin
                researchTopic={topic}
                isAssignment={isAssignment}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
export { ListResearchTopicForEachCompetition };
