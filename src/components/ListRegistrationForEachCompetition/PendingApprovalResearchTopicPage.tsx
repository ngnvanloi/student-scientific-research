"use client";

import {
  ParamsGetListCompetition,
  useGetListCompetitionAdmin,
} from "@/hooks-query/queries/use-get-competitions";
import { ListRegistrationForEachCompetition } from "./ListRegistrationForEachCompetition";

interface IProps {
  isAccepted: number;
}
const PendingApprovalTopicPageComponent = (props: IProps) => {
  const { isAccepted } = props;
  // fetch list competition
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
      {listCompetitions?.data.items.map((item, index) => {
        return (
          <ListRegistrationForEachCompetition
            competition={item}
            isAccepted={isAccepted}
          />
        );
      })}
    </div>
  );
};
export { PendingApprovalTopicPageComponent };
