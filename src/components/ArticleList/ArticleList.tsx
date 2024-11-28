"use client";
import { ArticleCardForAuthor } from "../ArticleCard/ArticleCard";
import { Divider } from "antd";
import { useEffect, useState } from "react";
import { ArticleManagementContext } from "../UseContextProvider/ArticleManagementContext";
import {
  ParamsGetAllArticleForAuthorWithFilter,
  useGetAllArticleForAuthorWithFilter,
} from "@/hooks-query/queries/use-get-article-for-author-with-filter";
import { ArticleWithContributors } from "@/types/ArticleWithContributor";
import FormSelect from "../FormCard/FormSelectField";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TFormFilter } from "../FormCard/FormInputsData";
import { FormFilterSchema } from "../FormCard/ZodSchema";

const roleNames = [
  { id: "author", name: "Tác giả chính" },
  { id: "co-author", name: "Đồng tác giả" },
];
const ArticleListContainerForAuthor = () => {
  const [isChange, setIsChange] = useState<boolean>(false);

  let params: ParamsGetAllArticleForAuthorWithFilter = {
    index: 1,
    pageSize: 100,
    acceptedForPublicationStatus: 3,
    roleName: "author",
  };
  const { data: listArticle, refetch } =
    useGetAllArticleForAuthorWithFilter(params);

  console.log(
    "checking list article for author: ",
    JSON.stringify(listArticle, null, 2)
  );

  // Lọc các bài báo dựa trên trạng thái phê duyệt
  let pendingArticles: ArticleWithContributors[] | undefined =
    listArticle?.data.items.filter(
      (article) => article.acceptedForPublicationStatus === 0
    );

  let approvedArticles: ArticleWithContributors[] | undefined =
    listArticle?.data.items.filter(
      (article) => article.acceptedForPublicationStatus === 1
    );

  let rejectedArticles: ArticleWithContributors[] | undefined =
    listArticle?.data.items.filter(
      (article) => article.acceptedForPublicationStatus === 2
    );

  // refetch data
  useEffect(() => {
    refetch();
  }, [isChange]);
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    control,
  } = useForm<TFormFilter>({
    resolver: zodResolver(FormFilterSchema),
  });
  // Sử dụng useWatch để theo dõi sự thay đổi của roleName
  let selectedRoleName = useWatch({
    control,
    name: "roleName",
  });

  // fetch danh sách đề tài theo selectedRoleName
  useEffect(() => {
    if (selectedRoleName) {
      params.roleName = selectedRoleName;
      refetch();
    }
  }, [selectedRoleName, refetch]);

  // render UI
  return (
    <div>
      <div>
        <FormSelect
          name="roleName"
          items={roleNames || []}
          register={register}
          error={errors.roleName}
          label="Chọn vai trò tham gia"
          className="w-[300px] appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2"
        />
      </div>
      <ArticleManagementContext.Provider value={{ isChange, setIsChange }}>
        <div>
          <Divider style={{ borderColor: "#383838" }} orientation="left">
            Đã công bố
          </Divider>
          <div className="grid gap-x-5 gap-y-5 m:grid-cols-2 lg:grid-cols-3">
            {approvedArticles?.map((article, index) => {
              return (
                <ArticleCardForAuthor
                  key={index}
                  articleItem={article}
                  isAcceptedForPublication={1}
                />
              );
            })}
          </div>
          <Divider style={{ borderColor: "#383838" }} orientation="left">
            Chờ phê duyệt
          </Divider>
          <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 mt-5">
            {pendingArticles?.map((article, index) => {
              return (
                <ArticleCardForAuthor
                  key={index}
                  articleItem={article}
                  isAcceptedForPublication={0}
                />
              );
            })}
          </div>
          <Divider style={{ borderColor: "#383838" }} orientation="left">
            Từ chối
          </Divider>
          <div className="grid gap-x-5 gap-y-5 m:grid-cols-2 lg:grid-cols-3">
            {rejectedArticles?.map((article, index) => {
              return (
                <ArticleCardForAuthor
                  key={index}
                  articleItem={article}
                  isAcceptedForPublication={2}
                />
              );
            })}
          </div>
        </div>
      </ArticleManagementContext.Provider>
    </div>
  );
};

export { ArticleListContainerForAuthor };
