import { CalendarDateRangeIcon } from "@heroicons/react/20/solid";
import {
  BriefcaseIcon,
  CalendarDaysIcon,
  CalendarIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { Button } from "antd";
import { Fragment, useState } from "react";
import { ModalCompetitionRegistration } from "../Modal/ModalCompeRegistration";
import { useGetRegistrationCompetitionDetail } from "@/hooks-query/queries/use-get-registration-competition-detail";
import { useGetRegistrationCompetitionDetailForAuthor } from "@/hooks-query/queries/use-get-registration-competition-detail-author";
import { formatDate, isCurrentDateInRange } from "@/helper/extension-function";
import { Competition } from "@/types/Competition";
import { ModalSubmitResearchTopic } from "../Modal/ModalSubmitResearchTopic";
import {
  ParamsGetListResearchTopicForAuthorByRolename,
  useGetListResearchTopicForAuthorByRolename,
} from "@/hooks-query/queries/use-get-research-topic-for-author";
import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button as ButtonUI } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { PlusOutlined } from "@ant-design/icons";
import { ModalEstablishReviewCouncil } from "../Modal/ModalEstablishReviewCouncil";
interface IProps {
  competition: Competition | undefined;
}
const prefixPath: string = "/competitions/";

const CompetitionCard = (props: IProps) => {
  const { competition } = props;
  // STATE
  const [competitionTarget, setCompetitionTarget] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // GET FORM REGISTRATION FOR AUTHOR
  const { data, refetch } = useGetRegistrationCompetitionDetailForAuthor();
  console.log(
    "checking registration details: ",
    JSON.stringify(data?.data, null, 2)
  );
  // HANDLE LOGIC
  const handleRegistrationForm = (id: number | any) => {
    setCompetitionTarget(id);
    setIsOpen(true);
  };
  function isCompetitionIdPresent(competitionId: number | undefined) {
    return data?.data.some((item) => item.competitionId === competitionId);
  }

  function isRegistrationApproved(competitionId: number | undefined) {
    return data?.data.some(
      (item) => item.competitionId === competitionId && item.isAccepted === 1
    );
  }
  function isRegistrationPending(competitionId: number | undefined) {
    return data?.data.some(
      (item) => item.competitionId === competitionId && item.isAccepted === 0
    );
  }
  function isRegistrationReject(competitionId: number | undefined) {
    return data?.data.some(
      (item) => item.competitionId === competitionId && item.isAccepted === 2
    );
  }

  // KIỂM TRA ĐIỀU KIỆN
  // nếu như competition đã đăng kí ẩn nút Đăng kí
  // thay vào đó là dòng text trạng thái đã đang kí
  // nếu như đăng kí thất bại thì hiển thị lại nút đăng kí
  // lấy ra thông tin đăng kí trong bảng RegistrationForms

  return (
    <ul className="mt-12 space-y-6">
      <li key={competition?.id} className="p-5 bg-white rounded-md shadow-sm">
        <a href="#">
          {/* {`${prefixPath}${competition?.id}`} */}
          <div>
            <div className="justify-between sm:flex">
              <div className="flex-1">
                <h3 className="text-xl font-medium text-cyan-600">
                  {competition?.competitionName}
                </h3>
                <p className="text-gray-500 mt-2 pr-2 h-11 text-ellipsis overflow-hidden text-base font-light">
                  {competition?.description}
                </p>
              </div>
              <div className="mt-5 space-y-4 text-sm sm:mt-0 sm:space-y-2">
                <span className="flex items-center text-gray-500">
                  <CalendarIcon width={"18px"} /> &nbsp;
                  {formatDate(competition?.dateStart || "")}
                </span>
                <span className="flex items-center text-gray-500">
                  <CalendarDateRangeIcon width={"18px"} /> &nbsp;
                  {formatDate(competition?.dateEnd || "")}
                </span>
                {/* BUTTON ĐĂNG KÍ */}
                {(() => {
                  if (
                    !isCompetitionIdPresent(competition?.id) &&
                    isCurrentDateInRange(
                      competition?.dateStart,
                      competition?.dateEndSubmit
                    )
                  ) {
                    return (
                      <Button
                        variant="filled"
                        className=""
                        onClick={() => handleRegistrationForm(competition?.id)}
                      >
                        Đăng kí tham gia
                      </Button>
                    );
                  } else if (
                    !isCurrentDateInRange(
                      competition?.dateStart,
                      competition?.dateEndSubmit
                    )
                  ) {
                    return <p>Cuộc thi hết hạn đăng kí</p>;
                  } else if (isRegistrationPending(competition?.id)) {
                    return <p>Đang chờ phê duyệt</p>;
                  } else if (isRegistrationReject(competition?.id)) {
                    return (
                      <Button
                        variant="filled"
                        className=""
                        onClick={() => handleRegistrationForm(competition?.id)}
                      >
                        Đăng kí lại
                      </Button>
                    );
                  } else if (
                    isRegistrationApproved(competition?.id) &&
                    isCurrentDateInRange(
                      competition?.dateStart,
                      competition?.dateEndSubmit
                    )
                  ) {
                    return <p>Nộp bài</p>;
                  }
                })()}
                <ModalCompetitionRegistration
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  competitionID={competitionTarget}
                />
              </div>
            </div>
            <div className="mt-4 items-center space-y-4 text-sm sm:flex sm:space-x-4 sm:space-y-0">
              <span className="flex items-center text-gray-500">
                <BriefcaseIcon width={"18px"} /> &nbsp;
                {competition?.organizerName}
              </span>
              <span className="flex items-center text-gray-500">
                <MapPinIcon width={"18px"} /> &nbsp;
                {competition?.destination}
              </span>
            </div>
          </div>
        </a>
      </li>
    </ul>
  );
};
const CompetitionCardForAdmin = (props: IProps) => {
  const { competition } = props;
  return (
    <Fragment>
      <article
        className="mt-5 hover:shadow-lg hover:border transition duration-300 py-4 px-5 hover:rounded-md"
        key={`post${competition?.id}`}
      >
        <a href={`/competitions/${competition?.id}`}>
          <span className="block text-gray-400 text-sm">
            {formatDate(competition?.dateStart || "")}
            {formatDate(competition?.dateEnd || "")}
          </span>
          <div className="mt-2">
            <h3 className="text-xl text-gray-900 font-semibold hover:underline">
              {competition?.competitionName}
            </h3>
            {/* <p className="text-gray-400 mt-1 leading-relaxed truncate w-48 max-h-60 text-ellipsis">
        <div dangerouslySetInnerHTML={{ __html: post?.content ?? "" }} />
      </p> */}
          </div>
        </a>
      </article>
    </Fragment>
  );
};
const CompetitionCardForAuthor = (props: IProps) => {
  const { competition } = props;
  // STATE
  const [competitionTarget, setCompetitionTarget] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isModalSubmitOpen, setIsModalSubmitOpen] = useState<boolean>(false);
  // GET FORM REGISTRATION FOR AUTHOR
  const { data, refetch } = useGetRegistrationCompetitionDetailForAuthor();
  console.log(
    "checking registration details: ",
    JSON.stringify(data?.data, null, 2)
  );
  // HANDLE LOGIC
  const handleRegistrationForm = (id: number | any) => {
    setCompetitionTarget(id);
    setIsOpen(true);
  };
  function isCompetitionIdPresent(competitionId: number | undefined) {
    return data?.data.some((item) => item.competitionId === competitionId);
  }

  function isRegistrationApproved(competitionId: number | undefined) {
    return data?.data.some(
      (item) => item.competitionId === competitionId && item.isAccepted === 1
    );
  }
  function isRegistrationPending(competitionId: number | undefined) {
    return data?.data.some(
      (item) => item.competitionId === competitionId && item.isAccepted === 0
    );
  }
  function isRegistrationReject(competitionId: number | undefined) {
    return data?.data.some(
      (item) => item.competitionId === competitionId && item.isAccepted === 2
    );
  }
  let params: ParamsGetListResearchTopicForAuthorByRolename = {
    roleName: "author",
    index: 1,
    pageSize: 999,
  };
  const { data: ownResearchTopic } =
    useGetListResearchTopicForAuthorByRolename(params);

  console.log(
    "checking list research topic by owner: ",
    JSON.stringify(ownResearchTopic?.data.items, null, 2)
  );
  let isSubmitted = ownResearchTopic?.data.items.some(
    (topic) => topic.competitionId === competition?.id
  );
  // KIỂM TRA ĐIỀU KIỆN
  // nếu như competition đã đăng kí ẩn nút Đăng kí
  // thay vào đó là dòng text trạng thái đã đang kí
  // nếu như đăng kí thất bại thì hiển thị lại nút đăng kí
  // lấy ra thông tin đăng kí trong bảng RegistrationForms
  // nếu đã submit rồi thì ẩn nút nộp bài

  return (
    <ul className="mt-12 space-y-6">
      <li key={competition?.id} className="p-5 bg-white rounded-md shadow-sm">
        <a href="#">
          {/* {`${prefixPath}${competition?.id}`} */}
          <div>
            <div className="justify-between sm:flex">
              <div className="flex-1">
                <h3 className="text-xl font-medium text-cyan-600">
                  {competition?.competitionName}
                </h3>
                <p className="text-gray-500 mt-2 pr-2 h-11 text-ellipsis overflow-hidden text-base font-light">
                  {competition?.description}
                </p>
              </div>
              <div className="mt-5 space-y-4 text-sm sm:mt-0 sm:space-y-2">
                <span className="flex items-center text-gray-500">
                  <CalendarIcon width={"18px"} /> &nbsp;
                  {formatDate(competition?.dateStart || "")}
                </span>
                <span className="flex items-center text-gray-500">
                  <CalendarDateRangeIcon width={"18px"} /> &nbsp;
                  {formatDate(competition?.dateEnd || "")}
                </span>
                {/* BUTTON ĐĂNG KÍ */}
                {(() => {
                  if (
                    !isCompetitionIdPresent(competition?.id) &&
                    isCurrentDateInRange(
                      competition?.dateStart,
                      competition?.dateEndSubmit
                    )
                  ) {
                    return (
                      <Button
                        variant="filled"
                        className=""
                        onClick={() => handleRegistrationForm(competition?.id)}
                      >
                        Đăng kí tham gia
                      </Button>
                    );
                  } else if (
                    !isCurrentDateInRange(
                      competition?.dateStart,
                      competition?.dateEndSubmit
                    )
                  ) {
                    return <p>Cuộc thi hết hạn đăng kí</p>;
                  } else if (isRegistrationPending(competition?.id)) {
                    return <p>Đang chờ phê duyệt</p>;
                  } else if (isRegistrationReject(competition?.id)) {
                    return (
                      <Button
                        variant="filled"
                        className=""
                        onClick={() => handleRegistrationForm(competition?.id)}
                      >
                        Đăng kí lại
                      </Button>
                    );
                  } else if (isSubmitted) {
                    return <p>Đề tài đã được nộp lên hệ thống</p>;
                  } else if (
                    isRegistrationApproved(competition?.id) &&
                    isCurrentDateInRange(
                      competition?.dateStart,
                      competition?.dateEndSubmit
                    )
                  ) {
                    return (
                      <Button
                        variant="filled"
                        className=""
                        onClick={() => setIsModalSubmitOpen(true)}
                      >
                        Nộp bài
                      </Button>
                    );
                  }
                })()}
                <ModalCompetitionRegistration
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  competitionID={competitionTarget}
                />
                <ModalSubmitResearchTopic
                  competition={competition}
                  isOpen={isModalSubmitOpen}
                  setIsOpen={setIsModalSubmitOpen}
                />
              </div>
            </div>
            <div className="mt-4 items-center space-y-4 text-sm sm:flex sm:space-x-4 sm:space-y-0">
              <span className="flex items-center text-gray-500">
                <BriefcaseIcon width={"18px"} /> &nbsp;
                {competition?.organizerName}
              </span>
              <span className="flex items-center text-gray-500">
                <MapPinIcon width={"18px"} /> &nbsp;
                {competition?.destination}
              </span>
            </div>
          </div>
        </a>
      </li>
    </ul>
  );
};
const CompetitionCardAdminWithActionEstablishReviewCouncil = (
  props: IProps
) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [
    isShowModaEstablishReviewCouncil,
    setIsShowModalEstablishReviewCouncil,
  ] = useState(false);
  const { competition } = props;
  return (
    <Fragment>
      <article
        className="mt-5 hover:shadow-lg hover:border transition duration-300 py-4 px-5 hover:rounded-md"
        key={`post${competition?.id}`}
      >
        <div className="flex justify-between items-center">
          <span className="block text-gray-400 text-sm">
            {formatDate(competition?.dateStart || "")} {" -> "}
            {formatDate(competition?.dateEnd || "")}
          </span>
          <Button
            className="bg-green-500 text-white"
            onClick={() => setIsShowModalEstablishReviewCouncil(true)}
          >
            <PlusOutlined />
          </Button>
        </div>
        <ModalEstablishReviewCouncil
          isOpen={isShowModaEstablishReviewCouncil}
          setIsOpen={setIsShowModalEstablishReviewCouncil}
          competition={competition}
        />
        <div className="mt-2">
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-full space-y-2"
          >
            <div className="flex items-center justify-between space-x-4">
              <h3 className="text-xl text-gray-900 font-semibold hover:underline">
                {competition?.competitionName}
              </h3>
              <CollapsibleTrigger asChild>
                <ButtonUI variant="ghost" size="sm" className="w-9 p-0">
                  <ChevronsUpDown className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </ButtonUI>
              </CollapsibleTrigger>
            </div>
            <div className="rounded-md border px-4 py-3 font-mono text-sm">
              Hiển thị table hội đồng phản biện
            </div>
            <CollapsibleContent className="space-y-2">
              <div className="rounded-md border px-4 py-3 font-mono text-sm">
                Hiển thị table hội đồng phản biện A
              </div>
              <div className="rounded-md border px-4 py-3 font-mono text-sm">
                Hiển thị table hội đồng phản biện B
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </article>
    </Fragment>
  );
};
export {
  CompetitionCardForAdmin,
  CompetitionCardForAuthor,
  CompetitionCardAdminWithActionEstablishReviewCouncil,
};
export default CompetitionCard;
