"use client";

import {
  ParamsRegisterAccount,
  useRegisterAccountMutation,
} from "@/hooks-query/mutations/use-register-mutation";
import { CloseOutlined } from "@ant-design/icons";
import { Alert, Input } from "antd";
import { OTPProps } from "antd/es/input/OTP";
import { useEffect, useState } from "react";
import { SpinnerLoading } from "../SpinnerLoading/SpinnerLoading";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  ParamsResendOTP,
  useResendOTPMutation,
} from "@/hooks-query/mutations/use-resend-otp-mutation";
import { formatTimeMMSS } from "@/helper/extension-function";

interface IProps {
  email: string;
  password: string;
  name: string;
  numberPhone: string;
  onPrev: () => void;
  onBack: () => void;
}
const OTPVerification = (props: IProps) => {
  const { email, password, name, numberPhone, onPrev, onBack } = props;
  const [otp, setOTP] = useState<string>("");
  const router = useRouter();
  const { toast } = useToast();
  const [countDown, setCountDown] = useState<number>(120);

  useEffect(() => {
    if (countDown > 0) {
      const timer = setTimeout(() => {
        setCountDown(countDown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
    return;
  });
  const onChange: OTPProps["onChange"] = (text) => {
    console.log("onChange:", text);
    setOTP(text);
  };

  const onInput: OTPProps["onInput"] = (value) => {
    console.log("onInput:", value);
  };

  const sharedProps: OTPProps = {
    onChange,
    onInput,
  };
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate, isSuccess, isError, error, isPending } =
    useRegisterAccountMutation((msg) => {
      setErrorMessage(msg);
    });
  const {
    mutate: resendOTPMutate,
    isSuccess: resendOTPIsSuccess,
    isError: resendOTPIsError,
    error: resendOTPError,
    isPending: resendOTPIsPending,
  } = useResendOTPMutation((msg) => {
    setErrorMessage(msg);
  });

  const handleResendOTP = () => {
    let params: ParamsResendOTP = {
      email: email,
      otpType: 1,
    };
    resendOTPMutate(params, {
      onSuccess: () => {
        toast({
          title: "Thông báo",
          variant: "default",
          description:
            "Chúng tôi đã gửi lại một mã OTP đến email của bạn, vui lòng kiểm tra và hoàn tất quá trình đăng kí",
        });
        setErrorMessage(null);
      },
      onError: () => {
        alert("Resend OTP failed");
      },
    });
  };
  const handleVerifyOTP = () => {
    // gọi API đăng kí
    let formData: ParamsRegisterAccount = {
      email: email,
      password: password,
      name: name,
      numberPhone: numberPhone,
      roleName: "organizer",
      otpCode: otp,
    };
    console.log("checking params: ", JSON.stringify(formData, null, 2));
    mutate(formData, {
      onSuccess: () => {
        // alert("Register success");
        toast({
          title: "Thành công",
          variant: "default",
          description: "Tạo tài khoản cho ban tổ chức thành công",
        });
        setErrorMessage(null);
        onBack();
      },
      onError: () => {
        alert("Register failed");
      },
    });
  };
  return (
    <div>
      <div
        className="w-10 hover:text-blue-600 hover:cursor-pointer mb-3"
        onClick={onBack}
      >
        Back
      </div>
      {isPending || resendOTPIsPending ? <SpinnerLoading /> : ""}
      <main className="w-full flex flex-col items-center justify-center px-4">
        <div className="max-w-sm w-full text-gray-600 space-y-5">
          <div className="text-justify pb-8">
            Để bảo vệ tài khoản và đảm bảo rằng bạn là người sở hữu địa chỉ
            email đã cung cấp, chúng tôi đã gửi một mã OTP (One-Time Password)
            tới email của bạn. Vui lòng kiểm tra hộp thư đến (hoặc mục thư rác,
            nếu không thấy email trong vài phút) và nhập mã OTP vào ô xác nhận
            bên dưới. <br /> <br />
            Việc xác thực mã OTP là cần thiết để chúng tôi có thể hoàn tất quá
            trình đăng ký và kích hoạt tài khoản của bạn. Nếu bạn không nhận
            được mã OTP hoặc mã đã hết hạn, vui lòng nhấn vào nút “Gửi lại mã”
            để chúng tôi có thể gửi lại cho bạn một mã mới. Xin cảm ơn sự hợp
            tác của bạn trong việc bảo mật tài khoản!
          </div>
          <div className="space-y-5">
            <label className="font-semibold">Nhập mã OTP</label>
            <div className="mt-3">
              <Input.OTP
                variant="outlined"
                length={6}
                {...sharedProps}
                className="flex justify-between"
              />
            </div>

            <div className="flex items-end text-sm">
              {/* <div className="flex items-center gap-x-3">
                Bạn chưa nhận được mã OTP?
              </div> */}
              {countDown > 0 ? (
                <div className="text-center text-red-500">
                  Gửi lại mã sau {formatTimeMMSS(countDown)} giây
                </div>
              ) : (
                <p
                  className="text-center text-indigo-600 hover:text-indigo-500 hover:cursor-pointer hover:underline"
                  onClick={() => {
                    handleResendOTP();
                    setCountDown(120);
                  }}
                >
                  Gửi lại mã
                </p>
              )}
            </div>
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
            <button
              className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
              onClick={() => handleVerifyOTP()}
            >
              Xác thực
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
export { OTPVerification };
