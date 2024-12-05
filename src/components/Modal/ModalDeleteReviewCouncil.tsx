"use client";
import * as Dialog from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useDeleteReviewCouncilMutation } from "@/hooks-query/mutations/use-delete-review-council-mutation";
import { useGetReviewCouncilDetail } from "@/hooks-query/queries/use-get-review-council-detail";
import { Alert } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { ParamsGetListReviewCouncilForEachCompetition } from "@/hooks-query/queries/use-get-review-council-each-competition";
import { queryKeys } from "@/hooks-query/queries/query-keys";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reviewCouncilID: number;
}
const ModalDeleteReviewCouncil = (props: IProps) => {
  // STATE
  const { isOpen, setIsOpen, reviewCouncilID } = props;
  const { toast } = useToast();
  const queryClient = useQueryClient();
  // DETAILS
  let { data: reviewCouncil, refetch: refetchData } =
    useGetReviewCouncilDetail(reviewCouncilID);
  console.log(
    "checking reviewCouncil details: ",
    JSON.stringify(reviewCouncil, null, 2)
  );

  // REFETCH DATA
  useEffect(() => {
    if (isOpen && reviewCouncilID > 0) {
      refetchData();
    }
  }, [reviewCouncilID, isOpen, refetchData]);

  // HANDLE LOGIC
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const deletePostMutation = useDeleteReviewCouncilMutation((msg) => {
    setErrorMessage(msg);
  });

  const handleOnDelete = () => {
    deletePostMutation.mutate(reviewCouncilID, {
      onSuccess: async () => {
        toast({
          title: "Thông báo",
          variant: "default",
          description: "Bạn đã xóa hội đồng phản biện thành công",
        });
        setIsOpen(false);
        // refetch dữ liệu
        let params: ParamsGetListReviewCouncilForEachCompetition = {
          competitionId: reviewCouncil?.data.competitionId || 0,
          page: 1,
          pageSize: 10,
        };
        await queryClient.refetchQueries({
          queryKey: [queryKeys.listReviewCouncilForEachCompetition, params],
        });
      },
      onError: (error) => {
        console.error("Lỗi khi xóa hội đồng phản biện:", error);
      },
    });
  };

  // RENDER UI
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
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
                  Bạn có muốn xóa hội đồng phản biện{" "}
                  <strong>{reviewCouncil?.data.reviewCommitteeName}</strong>{" "}
                  không ?
                </p>
                <p>
                  Việc xóa sẽ không thể khôi phục, vui lòng cân nhắc trước khi
                  thực hiện thao tác
                </p>
              </Dialog.Description>
              {errorMessage && (
                <div className="mt-4">
                  <Alert
                    message="Oops! Đã có lỗi xảy ra"
                    description={errorMessage}
                    type="error"
                    closable={{
                      "aria-label": "close",
                      closeIcon: <CloseOutlined />,
                    }}
                    onClose={() => setErrorMessage(null)}
                    showIcon
                  />
                </div>
              )}
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
export { ModalDeleteReviewCouncil };
