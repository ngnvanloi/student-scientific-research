"use client";

import { useForm } from "react-hook-form";
import FormField from "../FormCard/FormInputField";
import { TFormSendEmail } from "../FormCard/FormInputsData";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSendEmailSchema } from "../FormCard/ZodSchema";
import { CloseOutlined } from "@ant-design/icons";
import { Alert, Button } from "antd";
import { useState } from "react";
import { CursorArrowRippleIcon } from "@heroicons/react/24/outline";
import {
  ParamsSendEmail,
  useSendEmailMutation,
} from "@/hooks-query/mutations/use-send-email";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { ModalAskAI } from "../Modal/ModalAskAI";
import { LoadingSpinner } from "../SpinnerLoading/LoadingSpinner";

const SendingMessage = () => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messageContent, setMessageContent] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate, isPending, isError, isSuccess } = useSendEmailMutation(
    (msg) => {
      setErrorMessage(msg);
    }
  );
  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<TFormSendEmail>({
    resolver: zodResolver(FormSendEmailSchema),
    defaultValues: {},
  });

  // HANDLE LOGIC
  const onSubmit = (data: TFormSendEmail) => {
    //
    let params: ParamsSendEmail = {
      receiverEmail: data.receiverEmail,
      receiverName: data?.receiverName || "",
      senderEmail: session?.user?.email || "",
      senderName: session?.user?.name || "",
      subject: data.subject || "",
      content: data.content || "",
    };
    mutate(params, {
      onSuccess: () => {
        toast({
          title: "Thành công",
          variant: "default",
          description: `Bạn đã gửi email thành công`,
        });
      },
      onError: (error) => {
        console.error("Lỗi khi gửi email:", error);
      },
    });
    // RESET FORM UPDATE
    reset({
      content: "",
      subject: "",
      receiverEmail: "",
      receiverName: "",
    });
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS", errors);
  };

  return (
    <div className="w-2/3 mx-auto">
      <div>{isPending ? <LoadingSpinner /> : ""}</div>
      <div>
        <label className="mb-[10px] block text-base font-bold text-dark dark:text-white border-l-2 border-l-blue-600 pl-2">
          Người nhận
        </label>
        <FormField
          type="text"
          placeholder="nguyenvana@gmail.com"
          name="receiverEmail"
          register={register}
          error={errors.receiverEmail}
          className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
        />
      </div>
      <div className="mt-3">
        <label className="mb-[10px] block text-base font-bold text-dark dark:text-white border-l-2 border-l-blue-600 pl-2">
          Tiêu đề
        </label>
        <FormField
          type="text"
          placeholder="Nhập tiêu đề ..."
          name="subject"
          register={register}
          error={errors.subject}
          className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
        />
      </div>
      <div className="mt-3">
        <div className="flex justify-between items-center mb-[10px]">
          <label className=" block text-base font-bold text-dark dark:text-white border-l-2 border-l-blue-600 pl-2">
            Nội dung tin nhắn
          </label>
          <ModalAskAI />
        </div>
        <FormField
          type="text"
          placeholder="Nhập nội dung tin nhắn ..."
          name="content"
          register={register}
          error={errors.content}
          isTextArea={true}
          className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
        />
      </div>
      <div className="mt-3">
        {errorMessage && (
          <div className="my-3">
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
        <Button
          onClick={handleSubmit(onSubmit, onError)}
          className="px-4 py-2 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2 "
        >
          Gửi tin nhắn
        </Button>
      </div>
    </div>
  );
};
export { SendingMessage };
