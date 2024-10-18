import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import postIcon from "../../assets/icon/icons8-bell-96.png";
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
                {/* {props.post?.organizerID} */}
                Khoa Công nghệ thông tin
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
              {new Date(props.post?.dateUpload || "").toLocaleDateString()}
            </span>
          </div>
        </a>
      </li>
    </ul>
  </section>
);
export default PostCard;
