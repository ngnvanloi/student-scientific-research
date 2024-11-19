"use client";
import { Alert } from "antd";
import {
  ParamsGetListAcceptanceForAllRole,
  useGetListAcceptanceForAllRole,
} from "@/hooks-query/queries/use-get-list-acceptance-for-all-role";
import { AcceptanceCardForOrganizer } from "../AcceptanceCard/AcceptanceCardForOrganizer";

const TrackOngoingProjectEvaluations = () => {
  // lấy ra danh sách các sản phẩm nghiệm thu
  let params: ParamsGetListAcceptanceForAllRole = {
    index: 1,
    pageSize: 100,
  };
  const { data: listAcceptance, refetch: refetchListAcceptance } =
    useGetListAcceptanceForAllRole(params);
  return (
    <div>
      <Alert
        message="Dưới đây là danh sách các đề tài đang chờ nghiệm thu"
        type="info"
        showIcon
        className="text-base mb-3 text-justify px-3 py-2"
      />
      <div className="mt-5">
        {listAcceptance?.data.items.map((item, index) => {
          return <AcceptanceCardForOrganizer acceptance={item} key={item.id} />;
        })}
      </div>
    </div>
  );
};
export { TrackOngoingProjectEvaluations };
