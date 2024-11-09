"use client";

import {
  ParamsGetListCompetition,
  useGetListCompetitionAdmin,
} from "@/hooks-query/queries/use-get-competitions";
import { ListResearchTopicForEachCompetition } from "./ListResearchTopicForEachCompetition";

interface IProps {
  isAssignment: boolean;
}
const PendingAssignmentResearchTopic = (props: IProps) => {
  const { isAssignment } = props;
  // lấy ra danh sách các cuộc thi (cuộc thi chứa các đề tài đã và chưa phân công phản biện)
  let params: ParamsGetListCompetition = {
    index: 1,
    pageSize: 100,
  };
  const { data: listCompetitions, refetch: refetchCompetitions } =
    useGetListCompetitionAdmin(params);

  console.log(
    "check list competition",
    JSON.stringify(listCompetitions?.data.items, null, 2)
  );
  return (
    <div>
      {listCompetitions?.data.items.map((item, idx) => {
        return (
          <div key={idx}>
            <ListResearchTopicForEachCompetition
              competition={item}
              isAssignment={isAssignment}
            />
          </div>
        );
      })}
    </div>
  );
};
export { PendingAssignmentResearchTopic };
