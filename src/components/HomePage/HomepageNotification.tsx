import { Fragment } from "react";
import { PostListForHomepage } from "../PostList/PostList";

const HomepageNotification = () => {
  return (
    <Fragment>
      <div className="flex justify-between">
        <p className="font-bold uppercase text-lg mb-3">Thông báo mới nhất</p>
        <a href="/posts" className="text-blue-500 hover:underline">
          Xem thêm
        </a>
      </div>
      <div>
        <PostListForHomepage />
      </div>
    </Fragment>
  );
};
export { HomepageNotification };
