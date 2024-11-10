"use client";

import { Article } from "@/types/Article";
import iconPDF from "../../assets/img/pdf-iconn.jpg";
import { formatDate } from "@/helper/extension-function";
import { Button, Dropdown, MenuProps, Space, Tag } from "antd";
import { DownOutlined, TagOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ModalDeleteArticle } from "../Modal/ModalDeleteArticle";
import { ArticleWithContributors } from "@/types/ArticleWithContributor";
import { FolderArrowDownIcon } from "@heroicons/react/24/outline";
import { ModalShowArticleDetails } from "../Modal/ModalDetailArticle";
import { ModalApprovalArticle } from "../Modal/ModalApprovalArticle";
import { useRouter } from "next/navigation";
import { ModalUpdateArticle } from "../Modal/ModalUpdateArticle";

interface IPropsAuthorArticle {
  articleItem: Article;
  isAcceptedForPublication: boolean;
}

const ArticleCardForAuthor = (props: IPropsAuthorArticle) => {
  const { articleItem, isAcceptedForPublication } = props;
  const [isModalDelOpen, setModelDelOpen] = useState<boolean>(false);
  const [isModalUpdateOpen, setModelUpdateOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  // function
  const handleClickUpdateButton = (e: any, acticleID: number) => {
    e.stopPropagation();
    setModelUpdateOpen(true);
  };

  const handleClickDeleteButton = (e: any) => {
    e.stopPropagation();
    setModelDelOpen(true);
  };
  const handleShowDetailArticle = () => {
    if (isAcceptedForPublication === true) {
      router.push(`/article/${articleItem.articleId}`);
    } else {
      setIsOpen(true);
    }
  };
  return (
    <div className="w-full mx-auto px-4 md:px-8 outline outline-1 outline-[#ccc] p-4 rounded-md duration-150 hover:shadow-lg hover:cursor-pointer">
      <div className="w-full mx-auto group sm:max-w-sm">
        <div onClick={() => handleShowDetailArticle()}>
          <div className="flex items-center justify-center">
            <img
              src={iconPDF.src}
              loading="lazy"
              alt={articleItem.title}
              className="h-[135px] rounded-lg"
            />
          </div>
          <div className="mt-3">
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
          </div>
        </div>
        <div className="mt-3 space-y-2">
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
          <ModalShowArticleDetails
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            articleID={articleItem.articleId}
          />
          <ModalUpdateArticle
            isOpen={isModalUpdateOpen}
            setIsOpen={setModelUpdateOpen}
            article={articleItem}
          />
        </div>
      </div>
    </div>
  );
};

interface IProps {
  articleItem: ArticleWithContributors;
}
const ArticleCardForGuest = (props: IProps) => {
  const { articleItem } = props;
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

const ArticleCardForAdmin = (props: IProps) => {
  const { articleItem } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAppOpen, setIsAppOpen] = useState<boolean>(false);
  const handleShowArticleDetail = () => {
    setIsOpen(true);
  };
  const handleShowModalApproval = () => {
    // Open modal for approval
    setIsAppOpen(true);
  };
  return (
    <a
      key={articleItem.id}
      className="flex justify-between gap-x-6 py-5 border-b border-[#ccc] hover:shadow-md p-3 hover:cursor-pointer mt-3"
    >
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex flex-col gap-1">
          <p className="text-lg font-semibold text-gray-900">
            {articleItem.title}
          </p>
          <p className="truncate text-xs/5 text-gray-500">
            {articleItem.coAuthors?.map((author) => author.name).join(", ")}
          </p>
          <a
            className="text-blue-500 mt-2 hover:underline"
            onClick={() => handleShowArticleDetail()}
          >
            Xem chi tiết bài báo ở đây
            <ModalShowArticleDetails
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              articleID={articleItem.id}
            />
          </a>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <Button variant="filled" onClick={() => handleShowModalApproval()}>
          Approval
          <ModalApprovalArticle
            isOpen={isAppOpen}
            setIsOpen={setIsAppOpen}
            articleID={articleItem.id}
          />
        </Button>
      </div>
    </a>
  );
};
export { ArticleCardForAuthor, ArticleCardForGuest, ArticleCardForAdmin };
