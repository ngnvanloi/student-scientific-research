import { formatCurrencyVND, formatDate } from "@/helper/extension-function";
import { Avatar, List } from "antd";
import avatarMale from "../../assets/icon/icons8-writer-male-48.png";
import avatarFemale from "../../assets/icon/icons8-writer-female-48.png";
import { Acceptance } from "@/types/Acceptance";
interface IProps {
  acceptance: Acceptance | undefined;
}
const AcceptanceOverview = (props: IProps) => {
  const { acceptance } = props;
  return (
    <div className="flex flex-col gap-4 text-justify">
      <div className="">
        <div className="text-xl font-semibold uppercase text-center my-4">
          {acceptance?.name}
        </div>
      </div>
      <div className="">
        <h4 className="font-semibold text-base">Tổng quan đề tài</h4>
        <div className="">
          <div
            dangerouslySetInnerHTML={{
              __html: acceptance?.researchTopic.description ?? "",
            }}
          />
        </div>
      </div>
      <div className="">
        <h4 className="font-semibold text-base">Mục tiêu đề tài</h4>
        <div className="">
          <div
            dangerouslySetInnerHTML={{
              __html: acceptance?.researchTopic.target ?? "",
            }}
          />
        </div>
      </div>
      <div className="">
        <h4 className="font-semibold text-base">Kết quả đạt được</h4>
        <div className="">
          <div
            dangerouslySetInnerHTML={{
              __html: acceptance?.researchTopic.achievedResults ?? "",
            }}
          />
        </div>
      </div>
      {/* flex justify-between */}
      <div className="flex flex-col gap-2">
        <div className="">
          <p className="font-semibold text-base">
            Ngày đăng tải:{" "}
            <span className="font-normal">
              {formatDate(
                (acceptance?.researchTopic.dateUpLoad as string) || ""
              )}
            </span>
          </p>
        </div>
        <div className="">
          <p className="font-semibold text-base">
            Thời gian cần thực hiện:{" "}
            <span className="font-normal">
              {acceptance?.researchTopic.projectDuration} tháng
            </span>
          </p>
        </div>
        <div className="">
          <p className="font-semibold text-base">
            Kinh phí:{" "}
            <span className="font-normal">
              {formatCurrencyVND(acceptance?.researchTopic.budget || 0)}
            </span>
          </p>
        </div>
      </div>
      <div className="">
        <p className="font-semibold text-base">
          Giáo viên hướng dẫn:{" "}
          <span className="font-normal">
            {acceptance?.researchTopic.supervisor}
          </span>
        </p>
      </div>
      <div className="">
        <h4 className="font-semibold text-base">Danh sách tác giả</h4>
        <div className="">
          <List
            dataSource={acceptance?.researchTopic.author_ResearchTopics}
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
                href={acceptance?.researchTopic.reportFilePath}
                target="_blank"
                className="hover:cursor-pointer hover:text-blue-400"
              >
                File thuyết minh
              </a>
            </span>
          </div>
          {acceptance?.researchTopic.productFilePath ? (
            <div className="">
              <span>
                <a
                  href={acceptance?.researchTopic.productFilePath}
                  target="_blank"
                  className="hover:cursor-pointer hover:text-blue-400"
                >
                  File sản phẩm
                </a>
              </span>
            </div>
          ) : (
            ""
          )}
          <div className="">
            <span>
              <a
                href={acceptance?.researchTopic.budgetFilePath}
                target="_blank"
                className="hover:cursor-pointer hover:text-blue-400"
              >
                File dự trù kinh phí
              </a>
            </span>
          </div>
        </div>
      </div>
      {acceptance?.researchTopic.articleId ? (
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold text-base">Bài báo khoa học đính kèm</h4>
          <p className="border-l-2 border-blue-600 pl-2">
            {acceptance.researchTopic.articleName}
          </p>
          <a
            className="hover:underline hover:text-blue-500"
            href={`/article/${acceptance.researchTopic.articleId}`}
          >
            Tham khảo bài báo tại đây
          </a>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default AcceptanceOverview;
