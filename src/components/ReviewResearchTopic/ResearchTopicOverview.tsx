import { formatCurrencyVND, formatDate } from "@/helper/extension-function";
import { ResearchProjectTopic } from "@/types/ResearchProjectTopic";
import { Avatar, List } from "antd";
import avatarMale from "../../assets/icon/icons8-writer-male-48.png";
import avatarFemale from "../../assets/icon/icons8-writer-female-48.png";
interface IProps {
  researchTopic: ResearchProjectTopic | undefined;
}
const ResearchTopicOverview = (props: IProps) => {
  const { researchTopic } = props;
  return (
    <div className="flex flex-col gap-4 text-justify">
      <div className="">
        {/* <h4 className="font-semibold text-base">Tên đề tài</h4> */}
        <div className="text-xl font-semibold uppercase text-center">
          {researchTopic?.nameTopic}
        </div>
      </div>
      <div className="">
        <h4 className="font-semibold text-base">Tổng quan đề tài</h4>
        <div className="">
          <div
            dangerouslySetInnerHTML={{
              __html: researchTopic?.description ?? "",
            }}
          />
        </div>
      </div>
      <div className="">
        <h4 className="font-semibold text-base">Mục tiêu đề tài</h4>
        <div className="">
          <div
            dangerouslySetInnerHTML={{
              __html: researchTopic?.target ?? "",
            }}
          />
        </div>
      </div>
      <div className="">
        <h4 className="font-semibold text-base">Kết quả đạt được</h4>
        <div className="">
          <div
            dangerouslySetInnerHTML={{
              __html: researchTopic?.achievedResults ?? "",
            }}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="">
          <p className="font-semibold text-base">
            Ngày đăng tải:{" "}
            <span className="font-normal">
              {formatDate((researchTopic?.dateUpLoad as string) || "")}
            </span>
          </p>
        </div>
        <div className="">
          <p className="font-semibold text-base">
            Thời gian cần thực hiện:{" "}
            <span className="font-normal">
              {researchTopic?.projectDuration} tháng
            </span>
          </p>
        </div>
        <div className="">
          <p className="font-semibold text-base">
            Kinh phí:{" "}
            <span className="font-normal">
              {formatCurrencyVND(researchTopic?.budget || 0)}
            </span>
          </p>
        </div>
      </div>
      <div className="">
        <p className="font-semibold text-base">
          Giáo viên hướng dẫn:{" "}
          <span className="font-normal">{researchTopic?.supervisor}</span>
        </p>
      </div>
      <div className="">
        <h4 className="font-semibold text-base">Danh sách tác giả</h4>
        <div className="">
          <List
            dataSource={researchTopic?.author_ResearchTopics}
            className="max-w-[500px]"
            renderItem={(item) => (
              <List.Item key={item.author.email}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={
                        item.author.sex == "Nữ"
                          ? avatarFemale.src
                          : avatarMale.src
                      }
                    />
                  }
                  title={item.author.name}
                  description={item.author.email}
                />
                <div>{item.roleName}</div>
              </List.Item>
            )}
          />
        </div>
      </div>
      <div className="">
        <h4 className="font-semibold text-base">Các tệp đính kèm</h4>
        <div className="">
          <div className="">
            <span>
              <a
                href={researchTopic?.reportFilePath}
                target="_blank"
                className="hover:cursor-pointer hover:text-blue-400"
              >
                File thuyết minh
              </a>
            </span>
          </div>
          <div className="">
            <span>
              <a
                href={researchTopic?.productFilePath}
                target="_blank"
                className="hover:cursor-pointer hover:text-blue-400"
              >
                File sản phẩm
              </a>
            </span>
          </div>
          <div className="">
            <span>
              <a
                href={researchTopic?.budgetFilePath}
                target="_blank"
                className="hover:cursor-pointer hover:text-blue-400"
              >
                File tính tiền công
              </a>
            </span>
          </div>
        </div>
      </div>
      <div className="">
        <h4 className="font-semibold text-base">Bài báo khoa học đính kèm</h4>
        <div className=""></div>
      </div>
    </div>
  );
};
export default ResearchTopicOverview;
