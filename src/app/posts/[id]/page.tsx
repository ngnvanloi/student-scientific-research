"use client";
import Link from "next/link";
import { useGetPostDetail } from "@/hooks-query/queries/use-get-post";
import {
  CalendarDateRangeIcon,
  ChevronLeftIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";
import avatar from "../../../assets/icon/icons8-boss-64.png";
import "../../../assets/styles/post.page.css";
import PreviewPDF from "@/components/PreviewPDF/PreviewPDF";
import PreviewPDFBookmark from "@/components/PreviewPDF/PreviewPDFBookmark";
import { useEffect } from "react";
const BlogDetailPage = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  let { data: post, refetch: refetchData } = useGetPostDetail(id);
  console.log("checking post details: ", JSON.stringify(post, null, 2));
  useEffect(() => {
    document.title = `${post?.data.title}`;
  }, [post]);
  return (
    <>
      <Link
        href="/posts"
        className="hover:underline hover:text-blue-500 flex gap-2"
      >
        <ChevronLeftIcon width={18} />
        Back
      </Link>

      {/* tiêu đề */}
      <div className="mt-4">
        <h3 className="font-bold uppercase text-2xl">{post?.data?.title}</h3>
      </div>
      {/* tác giả, ngày đăng */}
      <div className="flex gap-10 my-5">
        <div className="flex gap-5 items-center">
          <div className="rounded-full outline w-9 h-9 flex items-center justify-center p-1 outline-1 outline-slate-400">
            <img
              src={avatar.src}
              alt="avatar host"
              width={32}
              className="rounded"
            />
          </div>
          <p className="">
            Người đăng: <strong>{post?.data?.organizerName}</strong>
          </p>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <CalendarDateRangeIcon width={24} />
          <p>{post?.data.dateUpLoad}</p>
        </div>
      </div>
      {/* Nội dung */}
      <div className="mt-10">
        <div className="post-content">
          <div
            dangerouslySetInnerHTML={{ __html: post?.data?.content ?? "" }}
            className="innerHTML"
          />
        </div>
      </div>
      {/* file đính kèm */}
      {post?.data.filePath ? (
        <div>
          <div className="flex gap-3">
            <PaperClipIcon width={24} />
            <p className="underline my-5">Văn bản đính kèm</p>
          </div>
          <div className="w-[70%] h-[800px] block m-auto">
            <PreviewPDFBookmark fileUrl={post?.data.filePath || ""} />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default BlogDetailPage;
