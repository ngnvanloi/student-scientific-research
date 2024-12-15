"use client";
import { useGetAcceptanceDetail } from "@/hooks-query/queries/use-get-acceptance-detail";
import AcceptanceOverview from "../AcceptanceCard/AcceptanceOverview";
import { useEffect } from "react";

interface IProps {
  id: number;
}
const ResearchTopicDetailContainer = (props: IProps) => {
  const { id } = props;
  const { data } = useGetAcceptanceDetail(id);
  useEffect(() => {
    document.title = `${data?.data.name}`;
  }, [data]);
  return <AcceptanceOverview acceptance={data?.data} isShowReview={false} />;
};
export { ResearchTopicDetailContainer };
