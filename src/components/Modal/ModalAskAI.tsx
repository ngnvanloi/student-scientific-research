"use client";
import { CloseModalIcon } from "@/assets/svg/close.modal";
import React, { useEffect, useState } from "react";
import { SpinnerLoading } from "../SpinnerLoading/SpinnerLoading";
import { Acceptance } from "@/types/Acceptance";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button, message } from "antd";
import {
  CursorArrowRippleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import FormField from "../FormCard/FormInputField";
import { useForm } from "react-hook-form";
import { TFormAskAI } from "../FormCard/FormInputsData";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormAskAISchema } from "../FormCard/ZodSchema";
import {
  ParamsAskAI,
  useAskAIMutation,
} from "@/hooks-query/mutations/use-ask-ai";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "../SpinnerLoading/LoadingSpinner";

const ModalAskAI = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoadingSpinner, setIsLoadingSpinner] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [contentGenerate, setContentGenerate] = useState<string>("");
  const { mutate, isPending, isError, isSuccess } = useAskAIMutation((msg) => {
    setErrorMessage(msg);
  });
  const { toast } = useToast();
  const [messageApi, contextHolder] = message.useMessage();
  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<TFormAskAI>({
    resolver: zodResolver(FormAskAISchema),
    defaultValues: {},
  });
  // MESSAGE
  const CopySuccess = () => {
    messageApi.open({
      type: "success",
      content: "Sao chép văn bản thành công",
    });
  };
  const CopyError = () => {
    messageApi.open({
      type: "error",
      content: "Sao chép văn bản không thành công",
    });
  };
  // Reset form khi modal đóng
  useEffect(() => {
    if (!isOpen) {
      reset({ prompt: "" });
      setContentGenerate("");
    }
  }, [isOpen, reset]);
  // COPY
  const handleCopy = async () => {
    try {
      // Copy nội dung vào clipboard
      await navigator.clipboard.writeText(contentGenerate);
      CopySuccess();
    } catch (err) {
      console.error("Failed to copy: ", err);
      CopyError();
    }
  };
  // HANDLE LOGIC
  const onSubmit = (data: TFormAskAI) => {
    //
    let params: ParamsAskAI = {
      maxLength: 500,
      language: "vi",
    };
    mutate(
      { params: params, data: data.prompt },
      {
        onSuccess: (result) => {
          setContentGenerate(result.data.summary);
          // RESET FORM UPDATE
          //   reset({ prompt: "" });
        },
        onError: (error) => {
          console.error("Lỗi khi tạo prompt:", error);
        },
      }
    );
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS", errors);
  };

  // RENDER UI
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="px-4 py-2 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2 ">
          Hỏi AI
          <CursorArrowRippleIcon width={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-xl mx-auto px-4 h-[400px] overflow-x-auto">
        {contextHolder}

        <div>{isPending ? <LoadingSpinner /> : ""}</div>
        <DialogHeader>
          <DialogTitle className="font-semibold text-blue-900">
            Trợ lý AI của bạn
          </DialogTitle>
          <DialogDescription className="font-semibold text-blue-900">
            Hãy nhập yêu cầu của bạn và xem tôi có thể làm được gì
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <FormField
            type="text"
            placeholder="Tôi có thể giúp gì cho bạn ..."
            name="prompt"
            register={register}
            error={errors.prompt}
            isTextArea={true}
            className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
          />
        </div>
        <div>
          <p className="font-semibold text-blue-900 flex gap-2">
            <SparklesIcon width={20} />
            AI trả lời
          </p>
          <p className="text-justify">{contentGenerate}</p>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit(onSubmit, onError)}>
            {contentGenerate === "" ? "Tạo" : "Tạo lại"}
          </Button>
          {contentGenerate !== "" ? (
            <>
              <Button onClick={handleCopy}>Copy</Button>
              <Button
                onClick={() => {
                  setContentGenerate("");
                }}
              >
                Xóa
              </Button>
            </>
          ) : (
            ""
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export { ModalAskAI };
