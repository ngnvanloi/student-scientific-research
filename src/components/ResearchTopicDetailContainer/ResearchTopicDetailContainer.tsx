"use client";
import { useGetAcceptanceDetail } from "@/hooks-query/queries/use-get-acceptance-detail";
import AcceptanceOverview from "../AcceptanceCard/AcceptanceOverview";

interface IProps {
  id: number;
}
const ResearchTopicDetailContainer = (props: IProps) => {
  const { id } = props;
  const { data } = useGetAcceptanceDetail(id);
  return <AcceptanceOverview acceptance={data?.data} />;
};
export { ResearchTopicDetailContainer };
