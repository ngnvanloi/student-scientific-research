"use client";
import {
  ParamsGetListCompetition,
  useGetListCompetition,
  useGetListCompetitionAdmin,
} from "@/hooks-query/queries/use-get-competitions";
import FormSelect, { SelectItem } from "../FormCard/FormSelectField";
import { useForm, useWatch } from "react-hook-form";
import { TFormFilter } from "../FormCard/FormInputsData";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFilterSchema } from "../FormCard/ZodSchema";
import { useGetListFaculty } from "@/hooks-query/queries/use-get-faculties";
import { Button, Input } from "antd";
import {
  AdjustmentsHorizontalIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useListAcceptanceContext } from "./ListAcceptanceContext";
import FormField from "../FormCard/FormInputField";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { NumericInput } from "../FormCard/InputNumberic";

const kindOfApproval: SelectItem[] = [
  { id: 1, name: "Nghiệm thu chờ phê duyệt" },
  { id: 2, name: "Nghiệm thu được Khoa phê duyệt" },
  { id: 3, name: "Nghiệm thu được Trường phê duyệt" },
];
const SidebarFilter = () => {
  // USE PROVIDER CONTEXT
  const {
    paramsFilter,
    setParamsFilter,
    listPublicResearchTopic,
    setListPublicResearchTopic,
  } = useListAcceptanceContext();
  // LẤY RA DANH SÁCH CUỘC THI
  let param: ParamsGetListCompetition = {
    index: 1,
    pageSize: 100,
    facultyId: 0,
    year: 0,
  };
  const {
    data: listCompetitions,
    refetch: refetchCompetitions,
    isPending,
  } = useGetListCompetitionAdmin(param);
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

  const onSubmit = (data: TFormFilter) => {
    if (Number(data.kindOfApproval) === 1) {
      const newParamsFilter = {
        ...paramsFilter,
        competitionId: Number(data.competitionId),
        facultyAcceptedStatus: 0,
        acceptedForPublicationStatus: 0,
      };
      // Cập nhật state hoặc context
      setParamsFilter(newParamsFilter);
    } else if (Number(data.kindOfApproval) === 2) {
      const newParamsFilter = {
        ...paramsFilter,
        competitionId: Number(data.competitionId),
        facultyAcceptedStatus: 1,
        acceptedForPublicationStatus: 3,
      };
      // Cập nhật state hoặc context
      setParamsFilter(newParamsFilter);
    } else if (Number(data.kindOfApproval) === 3) {
      const newParamsFilter = {
        ...paramsFilter,
        competitionId: Number(data.competitionId),
        facultyAcceptedStatus: 1,
        acceptedForPublicationStatus: 1,
      };
      // Cập nhật state hoặc context
      setParamsFilter(newParamsFilter);
    }
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS", errors);
  };
  // STATE
  const [year, setYear] = useState<string>("");
  const handleSearch = () => {
    if (Number(year)) {
      param.year = Number(year);
      refetchCompetitions();
    }
  };
  // render UI
  return (
    <div>
      <div>
        <div className="flex w-full items-center space-x-2 h-full">
          <NumericInput style={{}} value={year} onChange={setYear} />
          <Button
            onClick={handleSearch}
            className="px-3 py-[6px] h-10 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2 "
          >
            <AdjustmentsHorizontalIcon width="16" />
          </Button>
        </div>
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
      <div className="mt-3">
        <FormSelect
          name="kindOfApproval"
          items={kindOfApproval || []}
          register={register}
          error={errors.kindOfApproval}
          label="Chọn tình trạng phê duyệt"
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
