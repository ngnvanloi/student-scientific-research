"use client";
import {
  ParamsGetListCompetition,
  useGetListCompetition,
} from "@/hooks-query/queries/use-get-competitions";
import { useGetRegistrationCompetitionDetailForAuthor } from "@/hooks-query/queries/use-get-registration-competition-detail-author";
import {
  ParamsGetListResearchTopicForeachCompetition,
  useGetListResearchTopicForeachCompetition,
} from "@/hooks-query/queries/use-get-research-topic-foreach-competition";
import FormSelect, { SelectItem } from "../FormCard/FormSelectField";
import { useForm, useWatch } from "react-hook-form";
import { TFormFilter } from "../FormCard/FormInputsData";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFilterSchema } from "../FormCard/ZodSchema";
import { useEffect, useState } from "react";
import { Alert } from "antd";
import { ResearchTopicCardForOrganizerWithExtendDeadlineAction } from "../ResearchProjectCard/ResearchProjectCard";
import { ResearchTopicWithContributors } from "@/types/ResearchTopicWithContributors";

const TopicsAreBeingAccepted = () => {
  let params: ParamsGetListCompetition = {
    index: 1,
    pageSize: 8,
  };
  // dữ liệu list competition
  const {
    data: listCompetitions,
    refetch: refetchCompetitions,
    isPending,
  } = useGetListCompetition(params);
  // dữ liệu list registration form
  const { data, refetch } = useGetRegistrationCompetitionDetailForAuthor();
  // lọc ra list competitions sao cho competitionID có trong RegistrationForm
  const competitions: SelectItem[] | undefined =
    listCompetitions?.data.items?.map((item) => ({
      id: item.id,
      name: item.competitionName,
    }));

  // lấy danh sách đề tài
  let param: ParamsGetListResearchTopicForeachCompetition = {
    index: 1,
    pageSize: 10,
    ReviewAcceptanceStatus: 1,
    acceptedForPublicationStatus: 0,
    competitionId: 1,
  };
  const {
    data: listResearchTopicByCompetition,
    refetch: refetchResearchTopicByCompetition,
  } = useGetListResearchTopicForeachCompetition(param);
  const [
    listResearchTopicHaveNotAcceptance,
    setListResearchTopicHaveNotAcceptance,
  ] = useState<ResearchTopicWithContributors[]>([]);

  // cập nhật danh sách đề tài theo competition
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

  // fetch danh sách đề tài theo selectedCompetitionId
  useEffect(() => {
    if (selectedCompetitionId) {
      param.competitionId = Number(selectedCompetitionId);
      refetchResearchTopicByCompetition();
    }
  }, [selectedCompetitionId, refetchResearchTopicByCompetition]);
  useEffect(() => {
    let listResearch = listResearchTopicByCompetition?.data.items.filter(
      (item) => item.acceptance === null
    );
    if (listResearch) {
      setListResearchTopicHaveNotAcceptance(listResearch);
    }
  }, [listResearchTopicByCompetition]);
  return (
    <div>
      <Alert
        message="Dưới đây là danh sách toàn bộ các đề tài đã đạt đủ điều kiện để tiến hành nghiệm thu. Nếu bạn đã hoàn thành sản phẩm nghiệm thu, hãy tạo một bản nghiệm thu mới và gửi đến ban tổ chức. Bạn có thể theo dõi tình trạng phê duyệt của nghiệm thu trong mục 'Theo dõi tình trạng nghiệm thu' để cập nhật tiến độ nhanh chóng và chính xác."
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
      <div className="mt-4">
        {listResearchTopicHaveNotAcceptance.map((item) => {
          return (
            <ResearchTopicCardForOrganizerWithExtendDeadlineAction
              researchTopic={item}
              key={item.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export { TopicsAreBeingAccepted };
