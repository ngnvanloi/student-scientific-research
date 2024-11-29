"use client";
import { CooperationUnit } from "./CooperationUnit";
import { HomepageOverview } from "./HomepageOverview";
import { HomepageNotification } from "./HomepageNotification";
import { HomepageCarousel } from "./HomepageCarousel";
import { HomepageArticleList } from "./HomepageArticleList";
import { HomepageQuestionAndAnswer } from "./Q&A";
import { getSession, useSession } from "next-auth/react";
import { isValid } from "@/helper/extension-function";
import { useRouter } from "next/navigation";
import { useGetProfile } from "@/hooks-query/queries/use-get-user-profile";
import { useEffect } from "react";

const HomePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { data: userProfile } = useGetProfile();
  console.log("checking user profile: ", JSON.stringify(userProfile, null, 2));
  console.log("checking session: ", JSON.stringify(session?.user));
  // chuyển hướng
  useEffect(() => {
    if (userProfile?.data && session?.user?.roleName) {
      const redirectToProfileIfIncomplete = (rolePath: string) => {
        if (
          !isValid(userProfile?.data.numberPhone) ||
          !isValid(userProfile?.data.facultyId) ||
          !isValid(userProfile?.data.facultyName)
        ) {
          router.push(rolePath);
        }
        console.log("checking numberPhone: ", userProfile?.data.numberPhone); // "0889942612"
        console.log("checking facultyId: ", userProfile?.data.facultyId); // 1
        console.log("checking facultyName: ", userProfile?.data.facultyName); // "khoa cntt"
      };
      if (session?.user?.roleName) {
        switch (session.user.roleName) {
          case "reviewer":
            redirectToProfileIfIncomplete("/reviewer/my-profile");
            break;
          case "organizer":
            redirectToProfileIfIncomplete("/admin/my-profile");
            break;
          case "author":
            redirectToProfileIfIncomplete("/author/my-profile");
            break;
          default:
            break;
            router.push("/");
        }
      } else {
        console.log("Something went wrong in HomePage.tsx");
      }
    }
  }, [userProfile?.data, session?.user?.roleName]);
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
