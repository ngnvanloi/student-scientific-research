"use client";
import * as Dialog from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useArticleManagementContext } from "../UseContextProvider/ArticleManagementContext";
import { useGetArticleDetail } from "@/hooks-query/queries/use-get-article-detail";
import { useDeleteArticleMutation } from "@/hooks-query/mutations/use-delete-article-mutation";
import { Alert } from "antd";
import { CloseOutlined } from "@ant-design/icons";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  articleID: number;
}
const ModalDeleteArticle = (props: IProps) => {
  // STATE
  const { isOpen, setIsOpen, articleID } = props;
  const { toast } = useToast();
  // USE PROVIDER CONTEXT
  const { setIsChange } = useArticleManagementContext();

  // ARTICLE DETAILS
  let { data: article, refetch: refetchData } = useGetArticleDetail(articleID);
  //   console.log("checking article details: ", JSON.stringify(article, null, 2));

  // REFETCH DATA
  useEffect(() => {
    if (isOpen && articleID > 0) {
      refetchData();
    }
  }, [articleID, isOpen, refetchData]);

  // HANDLE LOGIC
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const deleteArticleMutation = useDeleteArticleMutation((msg) => {
    setErrorMessage(msg);
  });
  const handleOnDelete = () => {
    deleteArticleMutation.mutate(articleID, {
      onSuccess: () => {
        toast({
          title: "Thông báo",
          variant: "default",
          description: "Bạn đã xóa bài báo thành công",
        });
        setIsOpen(false);
        setIsChange(true);
      },
      onError: (error) => {
        console.error("Lỗi khi xóa bài báo:", error);
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
                  Bạn có muốn xóa bài báo <strong>{article?.data.title}</strong>{" "}
                  không ?
                </p>
                <p>
                  Việc xóa sẽ không thể khôi phục, vui lòng cân nhắc trước khi
                  thực hiện thao tác
                </p>
              </Dialog.Description>
              {errorMessage && (
                <div className="m-4">
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
export { ModalDeleteArticle };
