"use client";

import { Article } from "@/types/Article";
import iconPDF from "../../assets/img/pdf-iconn.jpg";
import { formatDate } from "@/helper/extension-function";
import { Tag } from "antd";
interface IPropsAuthorArticle {
  articleItem: Article;
}
const ArticleCardForAuthor = (props: IPropsAuthorArticle) => {
  const { articleItem } = props;
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 outline outline-1 outline-[#ccc] p-4 rounded-md duration-150 hover:shadow-lg">
      <div className="w-full mx-auto group sm:max-w-sm">
        <img
          src={iconPDF.src}
          loading="lazy"
          alt={articleItem.title}
          className="h-[155px] rounded-lg"
        />
        <div className="mt-3 space-y-2">
          <span className="block text-indigo-600 text-sm">
            {formatDate(articleItem.dateUpload)}
          </span>
          <h3 className="text-lg text-gray-800 duration-150 group-hover:text-indigo-600 font-semibold">
            {articleItem.title}
          </h3>
          <p className="text-gray-600 text-sm duration-150 group-hover:text-gray-800">
            {/* <div
                dangerouslySetInnerHTML={{
                  __html: articleItem.description ?? "",
                }}
              /> */}
          </p>
          <Tag color="cyan-inverse" key={"public"}>
            Đã public
          </Tag>
        </div>
      </div>
    </div>
  );
};

export { ArticleCardForAuthor };
