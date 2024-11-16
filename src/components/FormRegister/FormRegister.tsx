"use client";

import { GoogleSVG } from "@/assets/svg/google.icon";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { TFormRegisterData } from "../FormCard/FormInputsData";
import { FormRegisterSchema } from "../FormCard/ZodSchema";
import { authenticate } from "@/lib/actions";
import FormField from "../FormCard/FormInputField";
import {
  ParamsRegisterAccount,
  useRegisterAccountMutation,
} from "@/hooks-query/mutations/use-register-mutation";
import { SpinnerLoading } from "../SpinnerLoading/SpinnerLoading";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Alert } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const RegisterForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();
  if (session) {
    router.push("/");
  }
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate, isSuccess, isError, error, isPending } =
    useRegisterAccountMutation((msg) => {
      setErrorMessage(msg);
    });

  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TFormRegisterData>({
    resolver: zodResolver(FormRegisterSchema),
  });

  // HANDLE LOGIC
  const handleOnSubmitRegister = async (data: TFormRegisterData) => {
    console.log("SUCCESS", data);
    let formData: ParamsRegisterAccount = {
      email: data.email,
      password: data.password,
      name: data.name,
      numberPhone: data.numberPhone,
      roleName: "author",
    };

    // gọi API xác thực OTP
    // => xác thực => đúng => lấy formData và gọi hàm đăng kí (mã otp có hạn)
    // gửi lại OTP

    // gọi API đăng kí
    mutate(formData, {
      onSuccess: () => {
        // alert("Register success");
        toast({
          title: "Thành công",
          variant: "default",
          description:
            "Tạo tài khoản thành công, vui lòng chuyển trang Login đăng nhập vào hệ thống",
        });
        setErrorMessage(null);
        router.push("/login");
        // window.location.reload();
      },
      onError: () => {
        alert("Register failed");
      },
    });
  };

  const onSubmit = (data: TFormRegisterData) => {
    handleOnSubmitRegister(data);
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS", errors); // Kiểm tra các lỗi của form
  };

  // RENDER UI
  return (
    <main className="w-full flex">
      {isPending ? <SpinnerLoading /> : ""}
      <div className="relative flex-1 hidden items-center justify-center h-screen bg-gray-900 lg:flex">
        <div className="relative z-10 w-full max-w-md">
          <img src="https://floatui.com/logo-dark.svg" width={150} />
          <div className=" mt-16 space-y-3">
            <h3 className="text-white text-3xl font-bold">
              Bắt đầu những cống hiến của bạn
            </h3>
            <p className="text-gray-300">
              Tạo tài khoản để nhận những thông báo mới nhất về các cuộc thi
              diễn ra trên trang web, đồng thời giúp bạn quản lý những thành tựu
              khoa học của mình
            </p>
          </div>
        </div>
        <div
          className="absolute inset-0 my-auto h-[500px]"
          style={{
            background:
              "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
            filter: "blur(118px)",
          }}
        ></div>
      </div>
      <div className="flex-1 flex items-center justify-center h-screen">
        <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
          <div className="">
            <img
              src="https://floatui.com/logo.svg"
              width={150}
              className="lg:hidden"
            />
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                Đăng kí tài khoản
              </h3>
              <p className="">
                Bạn đã có tài khoản?{" "}
                <a
                  href="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Đăng nhập
                </a>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <button className="flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
              <div className="mr-2">Continue with Google</div>
              <GoogleSVG />
            </button>
          </div>
          <div className="relative">
            <span className="block w-full h-px bg-gray-300"></span>
            <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">
              Bạn có thể tiếp tục với
            </p>
          </div>
          <form
            className="space-y-5"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <div>
              <label className="font-medium">Họ và tên</label>
              <FormField
                type="text"
                placeholder="Nhập họ và tên ..."
                name="name"
                register={register}
                error={errors.name}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Số điện thoại</label>
              <FormField
                type="text"
                placeholder="Nhập số điện thoại ..."
                name="numberPhone"
                register={register}
                error={errors.numberPhone}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Email</label>
              <FormField
                type="email"
                placeholder="Email"
                name="email"
                register={register}
                error={errors.email}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Password</label>
              <FormField
                type="password"
                placeholder="Password"
                name="password"
                register={register}
                error={errors.password}
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
              Tạo tài khoản
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};
export { RegisterForm };
