"use client";
import {
  ParamsGetListAcceptanceForAllRole,
  useGetListAcceptanceForAllRole,
} from "@/hooks-query/queries/use-get-list-acceptance-for-all-role";
import { AcceptanceCardForAuthor } from "../AcceptanceCard/AcceptanceCardForAuthor";
import FormSelect from "../FormCard/FormSelectField";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { TFormFilter } from "../FormCard/FormInputsData";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFilterSchema } from "../FormCard/ZodSchema";
import { useSession } from "next-auth/react";
import { Acceptance } from "@/types/Acceptance";
const roleNames = [
  { id: "author", name: "Tác giả chính" },
  { id: "co-author", name: "Đồng tác giả" },
];
const MyResearchTopic = () => {
  const { data: session } = useSession();
  const [roleNameAuthor, setRoleNameAuthor] = useState<string>("author");
  const [listAcceptanceByRoleName, setListAcceptanceByRoleName] = useState<
    Acceptance[] | undefined
  >(undefined);
  // lấy ra danh sách các sản phẩm nghiệm thu
  let params: ParamsGetListAcceptanceForAllRole = {
    index: 1,
    pageSize: 100,
    facultyAcceptedStatus: 1,
    acceptedForPublicationStatus: 3,
  };

  const { data: listAcceptance, refetch: refetchListAcceptance } =
    useGetListAcceptanceForAllRole(params);

  console.log(
    "======= checking list acceptance: ",
    JSON.stringify(listAcceptance?.data.items, null, 2)
  );

  useEffect(() => {
    const filterAcceptance = listAcceptance?.data.items.filter((acc) =>
      acc.researchTopic.author_ResearchTopics.some(
        (item) =>
          item.author.accountId === session?.user?.accountId &&
          item.roleName === roleNameAuthor
      )
    );
    setListAcceptanceByRoleName(filterAcceptance);
  }, [listAcceptance, roleNameAuthor]);

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    control,
  } = useForm<TFormFilter>({
    resolver: zodResolver(FormFilterSchema),
  });
  // Sử dụng useWatch để theo dõi sự thay đổi của roleName
  let selectedRoleName = useWatch({
    control,
    name: "roleName",
  });

  // fetch danh sách đề tài theo selectedRoleName
  useEffect(() => {
    if (selectedRoleName) {
      setRoleNameAuthor(selectedRoleName);
      refetchListAcceptance();
    }
  }, [selectedRoleName, refetchListAcceptance]);
  return (
    <div>
      <div>
        <FormSelect
          name="roleName"
          items={roleNames || []}
          register={register}
          error={errors.roleName}
          label="Chọn vai trò tham gia"
          className="w-[300px] appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2"
        />
      </div>
      {listAcceptanceByRoleName?.map((item) => {
        return (
          <div key={item.id} className="mt-3">
            <AcceptanceCardForAuthor acceptance={item} />
          </div>
        );
      })}
    </div>
  );
};
export { MyResearchTopic };
