"use client";
import { ModalUpdateProfile } from "@/components/Modal/ModalUpdateProfile";
import { ModalUpdateReviewerProfile } from "@/components/Modal/ModalUpdateReviewerProfile";
import { formatDate, isValid } from "@/helper/extension-function";
import { useGetProfile } from "@/hooks-query/queries/use-get-user-profile";
import { Author } from "@/types/Author";
import { Reviewer } from "@/types/Reviewer";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { Alert, Button } from "antd";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function MyProfile() {
  const { data: user } = useGetProfile();
  console.log("check user reviewer profile: ", user);
  let reviewer: Reviewer = {
    name: user?.data.name || "",
    email: user?.data.email || "",
    numberPhone: user?.data.numberPhone || "",
    dateOfBirth: user?.data.dateOfBirth || "",
    sex: user?.data.sex || "",
    academicDegree: user?.data.academicRank || "",
    academicRank: user?.data.academicDegree || "",
    facultyId: user?.data.facultyId || 0,
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isChange, setIsChange] = useState<boolean>(false);

  return (
    <div>
      <div className="px-4 sm:px-0">
        <div className="flex justify-between items-center">
          <h3 className="text-base/7 font-semibold text-gray-900">
            Thông tin cá nhân
          </h3>
          <div>
            <Button onClick={() => setIsOpen(true)}>Cập nhật hồ sơ</Button>
            <ModalUpdateReviewerProfile
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              reviewer={reviewer}
              setIsChange={setIsChange}
            />
          </div>
        </div>
        {(() => {
          if (
            !isValid(user?.data?.facultyName) ||
            !isValid(user?.data.facultyId) ||
            !isValid(user?.data.numberPhone) ||
            !isValid(user?.data.academicDegree) ||
            !isValid(user?.data.academicRank)
          ) {
            return (
              <Alert
                message="Vui lòng hoàn thiện hồ sơ cá nhân của bạn để tránh các trường hợp lỗi sau này"
                type="warning"
                showIcon
                className="mt-3"
              />
            );
          }
        })()}
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Họ tên</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user?.data.name}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Ngày sinh</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {formatDate(user?.data.dateOfBirth || "")}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Giới tính</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user?.data.sex}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Email</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user?.data.email}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">
              Số điện thoại
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user?.data.numberPhone}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Học vị</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user?.data.academicDegree}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Học hàm</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user?.data.academicRank}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Khoa</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user?.data.facultyName}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
