"use client";
import { ModalUpdateOrganizerProfile } from "@/components/Modal/ModalUpdateOrganizerProfile";
import { isValid } from "@/helper/extension-function";
import { useGetProfile } from "@/hooks-query/queries/use-get-user-profile";
import { Organizer } from "@/types/Organizer";
import { Alert, Button } from "antd";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function MyProfile() {
  const { data: user, refetch } = useGetProfile();
  console.log("check user organizer profile: ", user);
  let organizer: Organizer = {
    name: user?.data.name || "",
    email: user?.data.email || "",
    numberPhone: user?.data.numberPhone || "",
    facultyId: user?.data.facultyId || 0,
    facultyName: user?.data.facultyName || "",
    description: user?.data.description || "",
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isChange, setIsChange] = useState<boolean>(false);

  useEffect(() => {
    refetch();
  }, [isChange]);
  return (
    <div>
      <div className="px-4 sm:px-0">
        <div className="flex justify-between items-center">
          <h3 className="text-base/7 font-semibold text-gray-900">
            Thông tin cá nhân
          </h3>
          <div>
            <Button onClick={() => setIsOpen(true)}>Cập nhật hồ sơ</Button>
            <ModalUpdateOrganizerProfile
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              organizer={organizer}
              setIsChange={setIsChange}
            />
          </div>
        </div>
        {(() => {
          if (
            !isValid(user?.data.facultyName) ||
            !isValid(user?.data.facultyId) ||
            !isValid(user?.data.numberPhone)
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
            <dt className="text-sm/6 font-medium text-gray-900">
              Tên ban tổ chức
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user?.data.name}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Email</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user?.data.email}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Khoa</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user?.data.facultyName}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Giới thiệu</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user?.data.description}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
