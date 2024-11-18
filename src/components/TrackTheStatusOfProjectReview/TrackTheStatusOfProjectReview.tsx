"use client";
import {
  ParamsGetListResearchTopicForeachCompetition,
  useGetListResearchTopicForeachCompetition,
} from "@/hooks-query/queries/use-get-research-topic-foreach-competition";
import { ResearchTopicCardForAdmin } from "../ResearchProjectCard/ResearchProjectCard";
import FormSelect, { SelectItem } from "../FormCard/FormSelectField";
import { useForm, useWatch } from "react-hook-form";
import { TFormAddContributor, TFormFilter } from "../FormCard/FormInputsData";
import { FormAddContributorSchema } from "../FormCard/ZodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ParamsGetListCompetition,
  useGetListCompetitionAdmin,
} from "@/hooks-query/queries/use-get-competitions";
import { useEffect } from "react";
import { Alert } from "antd";

const TrackTheStatusOfProjectReview = () => {
  // lấy ra danh sách cuộc thi
  let param: ParamsGetListCompetition = {
    index: 1,
    pageSize: 8,
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
  // lấy ra danh sách đề tài theo cuộc thi
  let params: ParamsGetListResearchTopicForeachCompetition = {
    competitionId: 3,
    index: 1,
    pageSize: 100,
    ReviewAcceptanceStatus: 0, // đang chờ phê duyệt
  };
  const {
    data: listResearchTopicByCompetition,
    refetch: refetchResearchTopicByCompetition,
  } = useGetListResearchTopicForeachCompetition(params);

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    control,
  } = useForm<TFormFilter>({
    resolver: zodResolver(FormAddContributorSchema),
  });

  // refetch danh sách đề tài theo selected
  // Sử dụng useWatch để theo dõi sự thay đổi của competitionId
  let selectedCompetitionId = useWatch({
    control,
    name: "competitionId",
  });

  // fetch danh sách đề tài theo selectedCompetitionId
  useEffect(() => {
    if (selectedCompetitionId) {
      params.competitionId = Number(selectedCompetitionId);
      refetchResearchTopicByCompetition();
    }
  }, [selectedCompetitionId, refetchResearchTopicByCompetition]);

  return (
    <div>
      <Alert
        message="Dưới đây là danh sách các đề tài hiện đang trong quá trình chờ phê duyệt, sau khi
        được thông qua sẽ chính thức chuyển sang giai đoạn thực hiện việc nghiệm
        thu kết quả. Vui lòng theo dõi tiến độ phản biện và phê duyệt đề tài theo đúng tiến độ"
        type="info"
        showIcon
        className="text-base mb-3 text-justify px-3 py-2"
      />
      <div>
        <FormSelect
          name="competitionId"
          items={competitions || []}
          register={register}
          error={errors.competitionId}
          label="Chọn cuộc thi"
          className="w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2"
        />
      </div>
      <div className="mt-5">
        {listResearchTopicByCompetition?.data.items.map((item, index) => {
          return <ResearchTopicCardForAdmin researchTopic={item} key={index} />;
        })}
      </div>
    </div>
  );
};
export { TrackTheStatusOfProjectReview };
