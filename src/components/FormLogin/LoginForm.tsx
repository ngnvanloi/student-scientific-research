"use client";
import { authenticate } from "@/lib/actions";
import { useForm } from "react-hook-form";
import { TFormLoginData } from "../FormCard/FormInputsData";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormLoginSchema } from "../FormCard/ZodSchema";
import FormField from "../FormCard/FormInputField";
import { GoogleSVG } from "@/assets/svg/google.icon";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const LoginForm = () => {
  const router = useRouter();
  const { data: session } = useSession();
  if (session) {
    router.push("/");
  }

  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TFormLoginData>({
    resolver: zodResolver(FormLoginSchema),
  });

  // HANDLE LOGIC
  const handleOnSubmitLogin = async (data: TFormLoginData) => {
    console.log("SUCCESS", data);
    let formData = {
      email: data.email,
      password: data.password,
    };
    await authenticate(formData);
    if (!session?.expires) {
      router.push("/");
      window.location.reload();
    } else {
      console.log("Login failed");
    }
  };

  const onSubmit = (data: TFormLoginData) => {
    handleOnSubmitLogin(data);
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS", errors); // Kiểm tra các lỗi của form
  };

  const handleLoginGoogle = () => {};
  // RENDER UI
  return (
    <main className="w-full flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600 space-y-5">
        <div className="text-center pb-8">
          <div className="mt-5">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h3>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-5">
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
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-x-3">
              <input
                type="checkbox"
                id="remember-me-checkbox"
                className="checkbox-item peer hidden"
              />
              <label
                htmlFor="remember-me-checkbox"
                className="relative flex w-5 h-5 bg-white peer-checked:bg-indigo-600 rounded-md border ring-offset-2 ring-indigo-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
              ></label>
              <span>Remember me</span>
            </div>
            <a
              href=""
              className="text-center text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </a>
          </div>
          <button
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
            type="submit"
          >
            Sign in
          </button>
        </form>
        <button
          className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100"
          onClick={() => handleLoginGoogle()}
        >
          <GoogleSVG />
          Login with Google
        </button>
        <p className="text-center">
          Don't have an account?{" "}
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
};

export { LoginForm };
