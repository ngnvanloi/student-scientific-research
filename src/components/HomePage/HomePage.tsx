import { CooperationUnit } from "./CooperationUnit";
import { HomepageOverview } from "./HomepageOverview";
import { HomepageNotification } from "./HomepageNotification";
import { HomepageCarousel } from "./HomepageCarousel";
import { HomepageArticleList } from "./HomepageArticleList";
import { HomepageQuestionAndAnswer } from "./Q&A";

const HomePage = () => {
  return (
    <div className="flex gap-1">
      <div className="basis-2/3 gap-1 flex flex-col">
        <div className="h-[480px]">
          <HomepageCarousel />
        </div>
        <div className="px-4 py-5 border">
          <HomepageOverview />
        </div>
        <div className="px-4 py-5 border">
          <div className="flex justify-between">
            <p className="font-bold uppercase text-2xl mb-3">
              Bài báo khoa học
            </p>
            <a href="/article" className="text-blue-500 hover:underline">
              Xem thêm
            </a>
          </div>
          <HomepageArticleList />
        </div>
      </div>
      <div className="basis-1/3 flex flex-col gap-1">
        <div className="border px-4 py-5">
          <HomepageNotification />
        </div>
        <div className="px-4 py-5 border">
          <p className="font-bold uppercase text-lg mb-3">Hướng dẫn</p>
        </div>
        <div className="px-4 py-5 border">
          <p className="font-bold uppercase text-lg mb-3">Các đơn vị hợp tác</p>
          <CooperationUnit />
        </div>
        <div className="px-4 py-5 border">
          <p className="font-bold uppercase text-lg mb-3">Q&A</p>
          <HomepageQuestionAndAnswer />
        </div>
      </div>
    </div>
  );
};
export { HomePage };
