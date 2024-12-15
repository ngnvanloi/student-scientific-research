import { TrackTheStatusOfProjectReview } from "@/components/TrackTheStatusOfProjectReview/TrackTheStatusOfProjectReview";
import { auth } from "@/auth";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  const session = await auth();
  const userName = session?.user?.name || "Quản Trị Viên";

  return {
    title: `${userName} - Trang Theo Dõi Tình Trạng Phản Biện Đề Tài`,
    description: "Ban tổ chức cuộc thi nghiên cứu khoa học của nhà trường.",
  };
}
const TrackTheStatusOfProjectReviewPage = () => {
  return (
    <div>
      <TrackTheStatusOfProjectReview />
    </div>
  );
};

export default TrackTheStatusOfProjectReviewPage;
