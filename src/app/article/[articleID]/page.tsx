import { ArticleDetailContainer } from "@/components/ArticleDetailContainer/ArticleDetailContainer";
const ArticleDetailPage = ({
  params,
}: {
  params: {
    articleID: number;
  };
}) => {
  return (
    <div className="mt-4">
      <ArticleDetailContainer articleID={params.articleID} />
    </div>
  );
};
export default ArticleDetailPage;
