"use client";
import {
  ParamsGetListCompetition,
  useGetListCompetition,
} from "@/hooks-query/queries/use-get-competitions";
import FormSelect, { SelectItem } from "../FormCard/FormSelectField";
import { useForm, useWatch } from "react-hook-form";
import { TFormFilter } from "../FormCard/FormInputsData";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFilterSchema } from "../FormCard/ZodSchema";
import { useGetListFaculty } from "@/hooks-query/queries/use-get-faculties";
import { Button } from "antd";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useListPubicResearchTopicContext } from "./ListPublicResearchTopicContext";
import { useEffect } from "react";

const SidebarFilter = () => {
  // USE PROVIDER CONTEXT
  const {
    paramsFilter,
    setParamsFilter,
    listPublicResearchTopic,
    setListPublicResearchTopic,
  } = useListPubicResearchTopicContext();
  // LẤY RA DANH SÁCH CUỘC THI
  let param: ParamsGetListCompetition = {
    index: 1,
    pageSize: 8,
    facultyId: 0,
  };
  const {
    data: listCompetitions,
    refetch: refetchCompetitions,
    isPending,
  } = useGetListCompetition(param);
  const competitions: SelectItem[] | undefined =
    listCompetitions?.data.items.map((item) => ({
      id: item.id,
      name: item.competitionName,
    }));
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
  // Sử dụng useWatch để theo dõi sự thay đổi của competitionId
  let selectedCompetitionId = useWatch({
    control,
    name: "competitionId",
  });
  let selectedFacultyId = useWatch({
    control,
    name: "facultyId",
  });

  // LẤY DANH SÁCH KHOA
  const { data: faculties } = useGetListFaculty();
  const listFaculty: SelectItem[] | undefined = faculties?.data.map(
    (faculty) => ({
      id: faculty.id,
      name: faculty.facultyName,
    })
  );

  const onSubmit = (data: TFormFilter) => {
    console.log("check faculty ID: ", data.facultyId);
    console.log("check competition ID: ", data.competitionId);

    const newParamsFilter = {
      ...paramsFilter,
      facultyId: Number(data.facultyId),
      competitionId: Number(data.competitionId),
    };
    // Cập nhật state hoặc context
    setParamsFilter(newParamsFilter);
    // RESET FORM UPDATE
    // reset({
    //   competitionId: "",
    //   facultyId: "",
    // });
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS", errors);
  };

  useEffect(() => {
    if (selectedFacultyId) {
      param.facultyId = Number(selectedFacultyId);
      refetchCompetitions();
    }
  }, [selectedFacultyId, refetchCompetitions]);
  // render UI
  return (
    <div>
      <div>
        <FormSelect
          name="facultyId"
          items={listFaculty || []}
          register={register}
          error={errors.facultyId}
          label="Khoa"
          className="w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2"
        />
      </div>
      <div className="mt-3">
        <FormSelect
          name="competitionId"
          items={competitions || []}
          register={register}
          error={errors.competitionId}
          label="Chọn cuộc thi"
          className="w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2"
        />
      </div>
      <Button
        onClick={handleSubmit(onSubmit, onError)}
        className="px-3 py-2 mt-3 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2 "
      >
        <FunnelIcon width="16" />
        Lọc
      </Button>
    </div>
  );
};
export { SidebarFilter };
