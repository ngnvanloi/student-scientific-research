"use client";

import {
  ParamsGetListAcceptanceForAllRole,
  useGetListAcceptanceForAllRole,
} from "@/hooks-query/queries/use-get-list-acceptance-for-all-role";
import { AcceptanceCardForAuthor } from "../AcceptanceCard/AcceptanceCardForAuthor";

const MonitorTheAcceptanceStatus = () => {
  // lấy ra danh sách các sản phẩm nghiệm thu
  let params: ParamsGetListAcceptanceForAllRole = {
    index: 1,
    pageSize: 100,
  };
  const { data: listAcceptance, refetch: refetchListAcceptance } =
    useGetListAcceptanceForAllRole(params);

  console.log(
    "========= checking list acceptance: ",
    JSON.stringify(listAcceptance, null, 2)
  );
  // mỗi AcceptanceCard bao gồm: tên, tác giả, thời gian tạo nghiệm thu, tình trạng phê duyệt của ban tổ chức + nhà trường
  return (
    <div>
      {listAcceptance?.data.items.map((item) => {
        return (
          <div key={item.id} className="mt-3">
            <AcceptanceCardForAuthor acceptance={item} />
          </div>
        );
      })}
    </div>
  );
};

export { MonitorTheAcceptanceStatus };
