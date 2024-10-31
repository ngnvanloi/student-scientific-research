"use client";
import { CloseModalIcon } from "@/assets/svg/close.modal";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { TFormAddPost } from "../FormCard/FormInputsData";
import { FormAddPostSchema } from "../FormCard/ZodSchema";
import FormField from "../FormCard/FormInputField";
import { Button } from "antd";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import React, { useState } from "react";
import ClickFileUpload from "../UploadFile/ClickFileUpload";
import { DatePicker } from "../DatePicker/DatePicker";
import {
  ParamsCreatePost,
  useCreatePostMutation,
} from "@/hooks-query/mutations/use-create-post-mutation";
import DragFileUpload from "../UploadFile/DragFileUpload";
import { usePostManagementContext } from "../UseContextProvider/PostManagementContext";
import { useUploadFileMutation } from "@/hooks-query/mutations/use-upload-file-mutation";
import { FolderNameUploadFirebase } from "@/web-configs/folder-name-upload-firebase";
import { ParamsRegisterCompetiton } from "@/hooks-query/mutations/use-register-competition";
import { useToast } from "@/hooks/use-toast";
import { ArticleDetailContainer } from "../ArticleDetailContainer/ArticleDetailContainer";

interface IProps {
  articleID: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ModalShowArticleDetails = (props: IProps) => {
  const { articleID, isOpen, setIsOpen } = props;
  // RENDER UI
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40 " />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-6xl mx-auto px-4 ">
          <div className="bg-white rounded-md shadow-lg ">
            <div className="flex items-center justify-between p-4 border-b">
              <Dialog.Title className="text-lg font-medium text-gray-800 ">
                Chi tiết bài báo
              </Dialog.Title>
              <Dialog.Close className="p-2 text-gray-400 rounded-md hover:bg-gray-100">
                <CloseModalIcon />
              </Dialog.Close>
            </div>
            <Dialog.Description className="space-y-2 p-4 mt-3 text-[15.5px] leading-relaxed text-gray-500">
              <ArticleDetailContainer articleID={articleID} />
            </Dialog.Description>
            <div className="flex items-center gap-3 p-4 border-t">
              <Dialog.Close asChild>
                <Button className="px-6 py-2 text-gray-800 border rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2 ">
                  Cancel
                </Button>
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export { ModalShowArticleDetails };
