import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArticleWithContributors } from "@/types/ArticleWithContributor";
import imgLogo from "../../../assets/icon/icons8-foxit-reader-100.png";
interface IProps {
  listArticle: ArticleWithContributors[] | undefined;
}
export function RecentArticle(props: IProps) {
  const { listArticle } = props;
  return (
    <div className="space-y-8">
      {listArticle?.map((item, index) => {
        return (
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src={imgLogo.src} alt="Avatar" />
              <AvatarFallback>PDF</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1 hover:text-blue-700">
              <a
                className="text-sm font-medium leading-2"
                href={`/article/${item.id}`}
              >
                {item.title}
              </a>
              <p className="text-sm text-muted-foreground">
                {item.author_Articles
                  .map((item) => {
                    return item.author.name;
                  })
                  .join(", ")}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
