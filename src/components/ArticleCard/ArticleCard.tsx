"use client";

import { Article } from "@/types/Article";
import iconPDF from "../../assets/img/pdf-iconn.jpg";
import { formatDate } from "@/helper/extension-function";
import { Dropdown, MenuProps, Space, Tag } from "antd";
import { DownOutlined, TagOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ModalDeleteArticle } from "../Modal/ModalDeleteArticle";
import { ArticleWithContributors } from "@/types/ArticleWithContributor";
import { FolderArrowDownIcon } from "@heroicons/react/24/outline";
interface IPropsAuthorArticle {
  articleItem: Article;
  isAcceptedForPublication: boolean;
}

const ArticleCardForAuthor = (props: IPropsAuthorArticle) => {
  const { articleItem, isAcceptedForPublication } = props;
  const [isModalDelOpen, setModelDelOpen] = useState<boolean>(false);
  const [isModalUpdateOpen, setModelUpdateOpen] = useState<boolean>(false);

  // function
  const handleClickUpdateButton = (e: any, acticleID: number) => {
    e.stopPropagation();
    alert("update");
    setModelUpdateOpen(true);
  };

  const handleClickDeleteButton = (e: any) => {
    e.stopPropagation();
    setModelDelOpen(true);
  };
  return (
    <div className="w-full mx-auto px-4 md:px-8 outline outline-1 outline-[#ccc] p-4 rounded-md duration-150 hover:shadow-lg">
      <div className="w-full mx-auto group sm:max-w-sm">
        <div className="flex items-center justify-center">
          <img
            src={iconPDF.src}
            loading="lazy"
            alt={articleItem.title}
            className="h-[135px] rounded-lg"
          />
        </div>
        <div className="mt-3 space-y-2">
          <span className="block text-indigo-600 text-sm">
            {formatDate(articleItem.dateUpload)}
          </span>
          <h3 className="text-lg text-gray-800 duration-150 group-hover:text-indigo-600 font-semibold truncate max-h-[300px]">
            {articleItem.title}
          </h3>
          <p className="text-gray-600 text-sm duration-150 group-hover:text-gray-800">
            {/* <div
                dangerouslySetInnerHTML={{
                  __html: articleItem.description ?? "",
                }}
              /> */}
          </p>
          {isAcceptedForPublication === true ? (
            <Tag color="cyan-inverse" key={"public"}>
              Đã công bố
            </Tag>
          ) : (
            <div className="flex justify-between items-center align-middle">
              <Tag color="gold-inverse" key={"unpublic"}>
                Chưa công bố
              </Tag>
              <div>
                {(() => {
                  const items: MenuProps["items"] = [
                    {
                      key: "1",
                      label: (
                        <p
                          className="link-info"
                          onClick={(e) =>
                            handleClickUpdateButton(e, articleItem.articleId)
                          }
                        >
                          Update
                        </p>
                      ),
                    },
                    {
                      key: "2",
                      label: (
                        <a
                          className="link-danger"
                          onClick={(e) => handleClickDeleteButton(e)}
                        >
                          Delete
                        </a>
                      ),
                    },
                  ];
                  return (
                    <Dropdown menu={{ items }}>
                      <p
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        <Space>
                          Chỉnh sửa
                          <DownOutlined />
                        </Space>
                      </p>
                    </Dropdown>
                  );
                })()}
              </div>
            </div>
          )}
          <ModalDeleteArticle
            isOpen={isModalDelOpen}
            setIsOpen={setModelDelOpen}
            articleID={articleItem.articleId}
          />
        </div>
      </div>
    </div>
  );
};

interface IPropsGuestArticle {
  articleItem: ArticleWithContributors;
}
const ArticleCardForGuest = (props: IPropsGuestArticle) => {
  const { articleItem } = props;
  // get danh sách đồng tác giả
  return (
    <a
      key={articleItem.id}
      href={`/article/${articleItem.id}`}
      className="flex justify-between gap-x-6 py-5 border-b border-[#ccc] hover:shadow-md p-3 hover:cursor-pointer mt-3"
    >
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-sm/6 font-semibold text-gray-900">
            {articleItem.title}
          </p>
          <p className="mt-1 truncate text-xs/5 text-gray-500">
            {formatDate(articleItem.dateUpload)}
          </p>
          <p className="mt-1 truncate text-xs/5 text-gray-500">
            {articleItem.coAuthors?.map((author) => author.name).join(", ")}
          </p>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="text-sm/6 text-gray-900">
          {articleItem?.keyWord.split(",").map((item, idex) => {
            return (
              <Tag icon={<TagOutlined />} color="default">
                {item}
              </Tag>
            );
          })}
        </p>
        <p className="mt-1 text-xs/5 text-gray-500">
          {articleItem.disciplineName}
        </p>
        <a
          className="hover:text-blue-500 mt-2"
          href={articleItem.filePath}
          target="_blank"
        >
          <FolderArrowDownIcon width={24} />
        </a>
      </div>
    </a>
  );
};
export { ArticleCardForAuthor, ArticleCardForGuest };
