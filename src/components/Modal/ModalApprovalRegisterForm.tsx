import {
  ParamsUpdateRegistrationForm,
  useApprovalRegistrationFormMutation,
} from "@/hooks-query/mutations/use-update-registration-status-mutation";
import * as Dialog from "@radix-ui/react-dialog";
import { Fragment, useState } from "react";
import FormSelect from "../FormCard/FormSelectField";
import { useForm } from "react-hook-form";
import { FormApprovalRegistration } from "../FormCard/ZodSchema";
import { TFormApprovalRegistration } from "../FormCard/FormInputsData";
import { zodResolver } from "@hookform/resolvers/zod";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  registrationFormID: number;
}
const approvalStatus = [
  { id: 1, name: "Phê duyệt" },
  { id: 2, name: "Từ chối" },
];
const ModalApprovalRegisterForm = (props: IProps) => {
  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TFormApprovalRegistration>({
    resolver: zodResolver(FormApprovalRegistration),
  });
  // STATE
  const { isOpen, setIsOpen, registrationFormID } = props;

  // POST DETAILS
  console.log("check delete registrationFormID: ", registrationFormID);

  // HANDLE LOGIC
  const approvalRegisMutation = useApprovalRegistrationFormMutation();

  // HANDLE LOGIC
  const onSubmit = (data: TFormApprovalRegistration) => {
    const bodyRequest: ParamsUpdateRegistrationForm = {
      isAccepted: data.approvalStatus,
    };
    approvalRegisMutation.mutate(
      { id: registrationFormID, requestbody: bodyRequest },
      {
        onSuccess: () => {
          alert("Phê duyệt thành công");
          setIsOpen(false);
        },
        onError: (error) => {
          console.error("Lỗi khi phê duyệt:", error);
        },
      }
    );
    console.log(JSON.stringify(data));
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS", errors); // Kiểm tra các lỗi của form
  };

  // RENDER UI
  return (
    <Fragment>
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40" />
          <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4">
            <div className="bg-white rounded-md shadow-lg px-4 py-6">
              <div className="flex items-center justify-between">
                <Dialog.Title className="text-lg font-medium text-gray-800">
                  <div className="font-bold text-yellow-500">
                    Phê duyệt phiếu đăng kí
                  </div>
                </Dialog.Title>
                <Dialog.Close className="p-2 text-gray-400 rounded-md hover:bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mx-auto"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Dialog.Close>
              </div>
              <Dialog.Description className="mt-3 text-sm leading-relaxed text-left text-gray-500">
                Vui lòng phê duyệt phiếu đăng kí đề tài của sinh viên. Khi chấp
                nhận phê duyệt sinh viên có thể tiến hành nộp đề tài lên hệ
                thống
              </Dialog.Description>
              <br />
              <FormSelect
                name="approvalStatus"
                items={approvalStatus}
                register={register}
                error={errors.approvalStatus}
                label="Chọn tình trạng phê duyệt"
                className="relative z-20 w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2"
              />
              <div className="items-center gap-2 mt-3 text-sm sm:flex">
                <div>
                  <button
                    className="w-full mt-2 p-2.5 flex-1 text-white bg-yellow-600 rounded-md ring-offset-2 ring-red-600 focus:ring-2"
                    onClick={handleSubmit(onSubmit, onError)}
                  >
                    Cập nhật
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
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Fragment>
  );
};
export { ModalApprovalRegisterForm };
