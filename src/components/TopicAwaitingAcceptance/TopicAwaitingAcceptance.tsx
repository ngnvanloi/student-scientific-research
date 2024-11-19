"use client";

import {
  ParamsGetListCompetition,
  useGetListCompetition,
} from "@/hooks-query/queries/use-get-competitions";
import { useGetRegistrationCompetitionDetailForAuthor } from "@/hooks-query/queries/use-get-registration-competition-detail-author";
import FormSelect, { SelectItem } from "../FormCard/FormSelectField";
import { Alert } from "antd";
import { useForm, useWatch } from "react-hook-form";
import { TFormFilter } from "../FormCard/FormInputsData";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormAddContributorSchema } from "../FormCard/ZodSchema";
import { useEffect, useState } from "react";
import {
  ParamsGetListResearchTopicForAuthorByRolename,
  useGetListResearchTopicForAuthorByRolename,
} from "@/hooks-query/queries/use-get-research-topic-for-author";
import { ResearchTopicCardForAuthorWithAcceptance } from "../ResearchProjectCard/ResearchProjectCard";
import { ResearchTopicWithContributors } from "@/types/ResearchTopicWithContributors";

const TopicAwaitingAcceptanceForAuthor = () => {
  // hiển thị danh sách các đề tài đủ tiêu chuẩn nghiệm thu
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
  const registeredCompetitions = listCompetitions?.data.items.filter(
    (competition) =>
      data?.data.some(
        (registration) => registration.competitionId === competition.id
      )
  );
  const competitions: SelectItem[] | undefined = registeredCompetitions?.map(
    (item) => ({
      id: item.id,
      name: item.competitionName,
    })
  );
  // LẤY RA DANH SÁCH ĐỀ TÀI CỦA TÁC GIẢ (PARAMS CHỨA COMPETITION ID)
  let param: ParamsGetListResearchTopicForAuthorByRolename = {
    roleName: "author",
    index: 1,
    pageSize: 10,
    ReviewAcceptanceStatus: 1,
    acceptedForPublicationStatus: 0,
    competitionId: 1,
  };
  const {
    data: listResearchTopicByCompetition,
    refetch: refetchResearchTopicByCompetition,
  } = useGetListResearchTopicForAuthorByRolename(param);
  const [
    listResearchTopicHaveNotAcceptance,
    setListResearchTopicHaveNotAcceptance,
  ] = useState<ResearchTopicWithContributors[]>([]);
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
  // RENDER UI
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
            <ResearchTopicCardForAuthorWithAcceptance
              researchTopic={item}
              key={item.id}
            />
          );
        })}
      </div>
    </div>
  );
};
export { TopicAwaitingAcceptanceForAuthor };
