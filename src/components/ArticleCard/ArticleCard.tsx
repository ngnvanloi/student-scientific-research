"use client";

import { Article } from "@/types/Article";
import iconPDF from "../../assets/img/pdf-iconn.jpg";
import { formatDate } from "@/helper/extension-function";
import { Dropdown, MenuProps, Space, Tag } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ModalDeleteArticle } from "../Modal/ModalDeleteArticle";
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

export { ArticleCardForAuthor };
