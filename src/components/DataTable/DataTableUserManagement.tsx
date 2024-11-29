"use client";

import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<AccountManagement>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "roleName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Vai trò
          <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "isSuspended",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Vô hiệu hóa
          <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowsUpDownIcon,
  BoltSlashIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { AccountManagement } from "@/types/AccountManagement";
import {
  ParamsDeactiveAccount,
  useDeactivateAccountMutation,
} from "@/hooks-query/mutations/use-deactivate-account";
import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";
import { ModalDeleteAccount } from "../Modal/ModalDeleteAccount";
import { Button } from "../ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setData?: React.Dispatch<React.SetStateAction<TData[] | any>>;
}

export function DataTableUserManagement<TData, TValue>({
  columns,
  data,
  setData,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [accountID, setAccountID] = useState<number>(0);
  const [userName, setUserName] = useState<string>("");

  const {
    mutate: deactiveMutation,
    isError: deactiveIsError,
    isSuccess: deactiveIsSuccess,
    isPending: deactiveIsPending,
  } = useDeactivateAccountMutation();

  // Hàm xóa phần tử
  const handleDelete = (item: TData) => {
    setIsOpen(true);
    // @ts-ignore
    setAccountID(item.id);
    // @ts-ignore
    setUserName(item.email);
  };
  const handleDeactivateAccount = (item: TData) => {
    let params: ParamsDeactiveAccount = {
      // @ts-ignore
      IsSuspended: !item.isSuspended,
    };
    deactiveMutation(
      // @ts-ignore
      { id: item.id, params },
      {
        onSuccess: () => {
          toast({
            title: "Thành công",
            variant: "default",
            description:
              "Bạn đã cập nhật trạng thái hoạt động của tài khoản thành công",
          });
        },
        onError: () => {
          alert("Lỗi cập nhật trạng thái tài khoản");
        },
      }
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell>
                  <TrashIcon
                    width={16}
                    onClick={() => handleDelete(row.original)}
                    className="hover:cursor-pointer hover:text-red-500"
                  />
                </TableCell>

                <TableCell>
                  <BoltSlashIcon
                    width={16}
                    onClick={() => handleDeactivateAccount(row.original)}
                    className="hover:cursor-pointer hover:text-orange-600"
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ModalDeleteAccount
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        accountID={accountID}
        userName={userName}
      />
    </div>
  );
}
