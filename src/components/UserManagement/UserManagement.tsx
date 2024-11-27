"use client";
import {
  ParamsGetListAccount,
  useGetListAccount,
} from "@/hooks-query/queries/use-get-list-account";
import {
  columns,
  DataTableUserManagement,
} from "../DataTable/DataTableUserManagement";
import { Button, Pagination } from "antd";
import { useState } from "react";
import { Input } from "../ui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const UserManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [nameSearch, setNameSearch] = useState<string>("");
  const handleSearch = () => {};
  let params: ParamsGetListAccount = {
    index: currentPage,
    pageSize: pageSize,
    nameSearch: nameSearch,
  };
  const { data: listAccount, refetch } = useGetListAccount(params);

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    setPageSize(pageSize || 5);
    refetch();
  };
  return (
    <div>
      <div className="flex w-full items-center space-x-2 h-full mb-4">
        <Input
          type="text"
          placeholder="Nhập username cần tìm kiếm..."
          value={nameSearch}
          onChange={(e) => {
            setNameSearch(e.target.value);
            refetch();
          }}
        />
        {/* <Button
          onClick={handleSearch}
          className="px-3 py-[6px] h-full text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2 "
        >
          <MagnifyingGlassIcon width="16" />
          Tìm kiếm
        </Button> */}
      </div>
      <DataTableUserManagement
        columns={columns}
        data={listAccount?.data.items || []}
      />
      <div className="mt-5">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          align="center"
          total={listAccount?.data.totalCount || 0} // Tổng số bài báo
          onChange={handlePageChange}
          showSizeChanger
          style={{ textAlign: "center" }}
        />
      </div>
    </div>
  );
};

export { UserManagement };
