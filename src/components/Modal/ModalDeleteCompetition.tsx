"use client";
import { useDeletePostMutation } from "@/hooks-query/mutations/use-delete-post-mutation";
import { queryKeys } from "@/hooks-query/queries/query-keys";
import { useGetPostDetail } from "@/hooks-query/queries/use-get-post";
import { IDataResponseFromAPI } from "@/types/Meta";
import * as Dialog from "@radix-ui/react-dialog";
import { QueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useCompetitionManagementContext } from "../UseContextProvider/CompetitionManagementContext";
import { useGetCompetitionDetail } from "@/hooks-query/queries/use-get-competition";
import { useDeleteCompetitionMutation } from "@/hooks-query/mutations/use-delete-competition-mutation";
import { useToast } from "@/hooks/use-toast";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  competitionID: number;
}
const ModalDeleteCompetition = (props: IProps) => {
  // STATE
  const { isOpen, setIsOpen, competitionID } = props;
  const { toast } = useToast();
  // USE PROVIDER CONTEXT
  const { setIsChange } = useCompetitionManagementContext();

  // POST DETAILS
  console.log("check delete compe id: ", competitionID);
  let { data: competition, refetch: refetchData } =
    useGetCompetitionDetail(competitionID);
  console.log(
    "checking competition details: ",
    JSON.stringify(competition, null, 2)
  );

  // REFETCH DATA
  useEffect(() => {
    if (isOpen && competitionID > 0) {
      refetchData();
    }
  }, [competitionID, isOpen, refetchData]);

  // HANDLE LOGIC
  const deletePostMutation = useDeleteCompetitionMutation();

  const handleOnDelete = () => {
    deletePostMutation.mutate(competitionID, {
      onSuccess: () => {
        alert("Delete competition thành công");
        toast({
          title: "Thông báo",
          variant: "default",
          description: "Bạn đã xóa cuộc thi thành công",
        });
        setIsOpen(false);
        setIsChange(true);
      },
      onError: (error) => {
        console.error("Lỗi khi xóa bài viết:", error);
      },
    });
  };

  // RENDER UI
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      {/* <Dialog.Trigger className="w-32 py-2 ml-2 shadow-sm rounded-md bg-indigo-600 text-white mt-4 flex items-center justify-center">
        Click me
      </Dialog.Trigger> */}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40" />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] px-4 w-full max-w-lg">
          <div className="bg-white rounded-md shadow-lg px-4 py-6 sm:flex">
            <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-red-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="mt-2 text-center sm:ml-4 sm:text-left">
              <Dialog.Title className="text-lg font-medium text-gray-800">
                <div className="font-bold text-red-500">Thông báo xác nhận</div>
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-sm leading-relaxed text-gray-500">
                <p>
                  Bạn có muốn xóa cuộc thi{" "}
                  <strong>{competition?.data.competitionName}</strong> không ?
                </p>
                <p>
                  Việc xóa sẽ không thể khôi phục, vui lòng cân nhắc trước khi
                  thực hiện thao tác
                </p>
              </Dialog.Description>
              <div className="items-center gap-2 mt-3 text-sm sm:flex">
                <div>
                  <button
                    className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md ring-offset-2 ring-red-600 focus:ring-2"
                    onClick={() => handleOnDelete()}
                  >
                    Delete
                  </button>
                </div>
                <div>
                  <button
                    aria-label="Close"
                    className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md border ring-offset-2 ring-indigo-600 focus:ring-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export { ModalDeleteCompetition };
