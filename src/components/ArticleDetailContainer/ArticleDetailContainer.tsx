"use client";

import { useGetArticleDetail } from "@/hooks-query/queries/use-get-article-detail";
import PreviewPDFBookmark from "../PreviewPDF/PreviewPDFBookmark";
import PreviewPDF from "../PreviewPDF/PreviewPDF";
import { formatDate } from "@/helper/extension-function";
import { Avatar, List, Tag } from "antd";
import avatarMale from "../../assets/icon/icons8-writer-male-48.png";
import avatarFemale from "../../assets/icon/icons8-writer-female-48.png";
import { BookOutlined, CalendarOutlined, TagOutlined } from "@ant-design/icons";
interface IProps {
  articleID: number;
}

const ArticleDetailContainer = (props: IProps) => {
  const { articleID } = props;
  let { data: article, refetch: refetchData } = useGetArticleDetail(articleID);
  console.log("checking article details slug: ", article);
  return (
    <div className="flex border-b border-[#ccc] h-screen pb-3">
      <div className="basis-1/3 h-full">
        <PreviewPDFBookmark fileUrl={article?.data.filePath || ""} />
        {/* <div>PDF Card click to show more</div> */}
      </div>
      <div className="basis-2/3 flex flex-col gap-5 overflow-x-auto px-5">
        <div>
          <span className="font-bold">Từ khóa: </span>{" "}
          {article?.data.keyWord.split(",").map((item, idex) => {
            return (
              <Tag icon={<TagOutlined />} color="default" key={idex}>
                {item}
              </Tag>
            );
          })}
        </div>
        <div>
          <h2 className="font-bold uppercase text-2xl">
            {article?.data.title}
          </h2>
        </div>
        <div>
          <span className="font-bold">Lĩnh vực:</span>{" "}
          {article?.data.disciplineName}
        </div>
        <div>
          <span className="font-bold">Ngày đăng tải:</span>{" "}
          {formatDate(article?.data.dateUpload || "")}
        </div>
        <div>
          <h2 className="font-bold">Danh sách tác giả</h2>
          <List
            dataSource={article?.data.author_Articles}
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
        <div>
          <h2 className="font-bold">Nội dung bài báo</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: article?.data?.description ?? "",
            }}
            className="text-justify"
          />
        </div>
      </div>
    </div>
  );
};
export { ArticleDetailContainer };
