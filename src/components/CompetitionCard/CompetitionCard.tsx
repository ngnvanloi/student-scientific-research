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
import { isCurrentDateInRange } from "@/helper/extension-function";

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
                  {new Date(competition?.dateStart || "").toLocaleString()}
                </span>
                <span className="flex items-center text-gray-500">
                  <CalendarDateRangeIcon width={"18px"} /> &nbsp;
                  {new Date(competition?.dateEnd || "").toLocaleString()}
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
                  } else if (isRegistrationPending(competition?.id)) {
                    return <p>Đang chờ phê duyệt</p>;
                  } else if (isRegistrationReject(competition?.id)) {
                    return (
                      <Button
                        variant="filled"
                        className=""
                        onClick={() => handleRegistrationForm(competition?.id)}
                      >
                        Thử đăng kí lại
                      </Button>
                    );
                  } else if (isRegistrationApproved(competition?.id)) {
                    return <p>Nộp bài</p>;
                  } else {
                    return <p>Cuộc thi hết hạn đăng kí</p>;
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
            {competition?.dateStart}
            {competition?.dateEnd}
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

export { CompetitionCardForAdmin };
export default CompetitionCard;
