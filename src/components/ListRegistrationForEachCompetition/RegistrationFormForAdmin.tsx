"use client";
import { RegistrationForm } from "@/types/RegistrationForm";
import { useState } from "react";
import { ModalApprovalRegisterForm } from "../Modal/ModalApprovalRegisterForm";
import {
  FolderArrowDownIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

interface IProps {
  registerForm: RegistrationForm;
  isAccepted: number;
}
const RegistrationFormForAdmin = (props: IProps) => {
  const { registerForm, isAccepted } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // console.log("checking approval status from regis item: ", isAccepted);

  return (
    <div>
      <div key={registerForm.id}>
        <li className="py-5 flex items-start justify-between outline-1 outline outline-blue-500">
          <div className="flex gap-3">
            <div>
              <span className="block text-sm text-blue-900 font-semibold">
                {registerForm.competitionName}
              </span>
              <span className="flex gap-2 text-sm text-gray-600 mt-2">
                <UserGroupIcon width={20} />
                Tác giả đăng kí: {registerForm.authorName}
              </span>
              <a
                className="text-sm text-gray-600 mt-3 flex gap-2"
                href={registerForm.filePath}
              >
                {/* {registerForm.filePath} */}
                <FolderArrowDownIcon width={20} />
                Tải file đăng kí tại đây
              </a>
            </div>
          </div>
          {isAccepted === 0 ? (
            <div>
              <a
                href="#"
                className="text-gray-700 text-sm border rounded-lg px-3 py-2 duration-150 bg-white hover:bg-gray-100"
                onClick={() => setIsOpen(true)}
              >
                Duyệt
              </a>
              <ModalApprovalRegisterForm
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                registrationFormID={registerForm.id}
              />
            </div>
          ) : (
            ""
          )}
        </li>
      </div>
    </div>
  );
};
export { RegistrationFormForAdmin };
