"use client";

import { useToast } from "@/hooks/use-toast";
import FormField from "../FormCard/FormInputField";
import { TFormResetPassword } from "../FormCard/FormInputsData";
import { useState } from "react";
import { FormResetPasswordSchema } from "../FormCard/ZodSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Alert } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import {
  ParamsResetPassword,
  useResetPasswordMutation,
} from "@/hooks-query/mutations/use-reset-password";
import { signOut, useSession } from "next-auth/react";
import { setAuthToken } from "@/web-configs/community-api";
import { SpinnerLoading } from "../SpinnerLoading/SpinnerLoading";

const ResetPassword = () => {
  const { toast } = useToast();
  const route = useRouter();
  const { data: session } = useSession();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate, isSuccess, isError, error, isPending } =
    useResetPasswordMutation((msg) => {
      setErrorMessage(msg);
    });

  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TFormResetPassword>({
    resolver: zodResolver(FormResetPasswordSchema),
  });

  // HANDLE LOGIC
  const handleOnSubmitRegister = async (data: TFormResetPassword) => {
    console.log("SUCCESS", data);
    let formData: ParamsResetPassword = {
      email: session?.user?.email || "",
      password: data.password,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    };

    // gọi API reset password
    mutate(formData, {
      onSuccess: () => {
        // alert("Register success");
        toast({
          title: "Thành công",
          variant: "default",
          description:
            "Bạn đã cập nhật mật khẩu thành công, vui lòng đăng nhập lại vào hệ thống",
        });
        setErrorMessage(null);
        setAuthToken(undefined);
        signOut();
        route.push("/login");
        // window.location.reload();
      },
      onError: () => {
        alert("Reset password failed");
      },
    });
  };

  const onSubmit = (data: TFormResetPassword) => {
    handleOnSubmitRegister(data);
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS", errors); // Kiểm tra các lỗi của form
  };
  return (
    <main className="w-full flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600 space-y-5">
        <div className="text-center pb-8">
          <div className="mt-5">
            <h3 className="text-gray-800 text-2xl font-semibold sm:text-3xl">
              CẬP NHẬT MẬT KHẨU
            </h3>
          </div>
        </div>
      </div>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit, onError)}>
        {isPending ? <SpinnerLoading /> : ""}
        <div>
          <label className="font-medium text-base">Nhập mật khẩu cũ</label>
          <FormField
            type="text"
            placeholder="Huit@1245"
            name="password"
            register={register}
            error={errors.password}
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
        <div>
          <label className="font-medium text-base">Nhập mật khẩu mới</label>
          <FormField
            type="text"
            placeholder="Nhập mật khẩu mới ..."
            name="newPassword"
            register={register}
            error={errors.newPassword}
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
        <div>
          <label className="font-medium text-base">Xác nhận mật khẩu mới</label>
          <FormField
            type="text"
            placeholder="Xác nhận mật khẩu mới ..."
            name="confirmPassword"
            register={register}
            error={errors.confirmPassword}
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>

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

        <button
          type="submit"
          className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
        >
          Cập nhật mật khẩu
        </button>
      </form>
    </main>
  );
};
export { ResetPassword };
