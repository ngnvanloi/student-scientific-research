import { CalendarDaysIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import postIcon from "../../assets/icon/icons8-bell-96.png";
import { Button, Card, Dropdown, MenuProps, Popover, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { formatDate } from "@/helper/extension-function";
interface IProps {
  post: Post | undefined;
}
const prefixPath: string = "/posts/";

const PostCard = (props: IProps) => (
  <section className="mt-2">
    <ul className="divide-y space-y-3">
      <li
        key={props.post?.id}
        className="px-4 py-5 duration-150 hover:border-white hover:rounded-xl hover:bg-gray-50"
      >
        <a href={`${prefixPath}${props.post?.id}`} className="space-y-3">
          <div className="flex items-center gap-x-3">
            <div className="bg-white w-14 h-14 border rounded-full flex items-center justify-center">
              <img src={postIcon.src} alt="post-icon" width="48px" />
            </div>
            <div>
              <span className="block text-sm text-indigo-600 font-medium">
                {props.post?.organizerName}
              </span>
              <h3 className="text-base text-gray-800 font-semibold mt-1">
                {props.post?.title}
              </h3>
            </div>
          </div>
          <div className="text-gray-600 sm:text-sm truncate h-5">
            {/* {item.content} */}
            <div
              dangerouslySetInnerHTML={{ __html: props.post?.content ?? "" }}
            />
          </div>
          <div className="text-sm text-gray-600 flex items-center gap-6">
            <span className="flex items-center gap-2">
              <CalendarDaysIcon width={"16px"} />
              {props.post?.dateUpLoad}
            </span>
          </div>
        </a>
      </li>
    </ul>
  </section>
);

interface IProps {
  post: Post | undefined;
}
const PostCardForAdmin = (props: IProps) => {
  const { post } = props;

  return (
    <article
      className="mt-5 hover:shadow-lg hover:border transition duration-300 py-4 px-5 hover:rounded-md"
      key={`post${post?.id}`}
    >
      <a href={`/posts/${post?.id}`}>
        <span className="block text-gray-400 text-sm">{post?.dateUpLoad}</span>
        <div className="mt-2">
          <h3 className="text-xl text-gray-900 font-semibold hover:underline">
            {post?.title}
          </h3>
          {/* <p className="text-gray-400 mt-1 leading-relaxed truncate w-48 max-h-60 text-ellipsis">
            <div dangerouslySetInnerHTML={{ __html: post?.content ?? "" }} />
          </p> */}
        </div>
      </a>
    </article>
  );
};

const PostCardForHomepage = (props: IProps) => {
  const { post } = props;
  return (
    <a className=" hover:cursor-pointer" href={`/posts/${post?.id}`}>
      <h3 className="text-base text-gray-800 font-semibold mt-1 hover:text-blue-500 hover:underline">
        {props.post?.title}
      </h3>
      <div className="text-sm text-gray-600 flex items-center gap-6 mt-2">
        <span className="flex items-center gap-2">
          <CalendarDaysIcon width={"16px"} />
          {formatDate(props.post?.dateUpLoad || "")}
        </span>
      </div>
    </a>
  );
};
export { PostCardForAdmin, PostCardForHomepage };
export default PostCard;
