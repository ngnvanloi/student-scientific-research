"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import imgNotiTypeArticle from "../../assets/icon/icons8-article-100.png";
import imgNotiTypeRegis from "../../assets/icon/icons8-regis-100.png";
import imgNotiTypeAssignment from "../../assets/icon/icons8-task-100.png";
import imgNotiTypeReview from "../../assets/icon/icons8-communication-100.png";
import imgNotiTypeTopic from "../../assets/icon/icons8-submit-document-100.png";

import {
  ArchiveBoxXMarkIcon,
  EllipsisHorizontalIcon,
  EnvelopeIcon,
  EnvelopeOpenIcon,
} from "@heroicons/react/24/outline";
import { Notification } from "@/types/Notification";
import { formatDate } from "@/helper/extension-function";
import {
  ParamsMarkAsReadNoti,
  useMarkAsReadOrUnreadMutation,
} from "@/hooks-query/mutations/use-update-markasread-notification-mutation";
import { useDeleteNotificationMutation } from "@/hooks-query/mutations/use-delete-notification-mutation";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IProps {
  notification: Notification;
  isChanged: boolean;
  setIsChanged: React.Dispatch<React.SetStateAction<boolean>>;
}
const NotificationCard = (props: IProps) => {
  const { notification, isChanged, setIsChanged } = props;
  const markAsReadMutation = useMarkAsReadOrUnreadMutation();
  const deleteNotification = useDeleteNotificationMutation();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const router = useRouter();
  // LOGIC
  const handleMarkAsRead = () => {
    // TODO: Mark notification as read
    const bodyRequest: ParamsMarkAsReadNoti = {
      status: true,
    };
    markAsReadMutation.mutate(
      { id: notification.id, requestbody: bodyRequest },
      {
        onSuccess: () => {
          // alert("Đánh dấu đã đọc thành công");
          setIsChanged(!isChanged);
        },
        onError: (error) => {
          console.error("Lỗi khi đánh dấu đã đọc:", error);
        },
      }
    );
  };
  const handleMarkAsUnread = () => {
    // TODO: Mark notification as unread
    const bodyRequest: ParamsMarkAsReadNoti = {
      status: false,
    };
    markAsReadMutation.mutate(
      { id: notification.id, requestbody: bodyRequest },
      {
        onSuccess: () => {
          // alert("Đánh dấu chưa đọc thành công");
          setIsChanged(!isChanged);
        },
        onError: (error) => {
          console.error("Lỗi khi đánh dấu chưa đọc:", error);
        },
      }
    );
  };
  const handleDeleteNoti = () => {
    // TODO: Delete notification
    deleteNotification.mutate(notification.id, {
      onSuccess: () => {
        // alert("Delete thông báo thành công");
        setIsChanged(!isChanged);
      },
      onError: (error) => {
        console.error("Lỗi khi xóa thông báo:", error);
      },
    });
  };

  const handleShowDetailsNoti = async () => {
    const session = await getSession();
    // TODO: Show details notification | redirect to ...
    // REDIRECT TO ARTICLE
    if (notification.notificationTypeId === 1) {
      if (session?.user?.roleName === "author") {
        router.push("/author/my-article");
        handleMarkAsRead();
      }
      if (session?.user?.roleName === "superadmin") {
        router.push("/super-admin/pending-approval-article");
        handleMarkAsRead();
      }
    }
    // REDICRECT TO TOPIC
    else if (notification.notificationTypeId === 2) {
      if (session?.user?.roleName === "author") {
        router.push("/author/research-topic-awaiting-review");
        handleMarkAsRead();
      }
      if (session?.user?.roleName === "organizer") {
        router.push("/admin/project-reviewer-assignment");
        handleMarkAsRead();
      }
    }
    // REDIRECT TO REVIEWER
    else if (notification.notificationTypeId === 3) {
      if (session?.user?.roleName === "author") {
        router.push(
          `/author/research-topic-awaiting-review/${notification.targetId}`
        );
        handleMarkAsRead();
      }
      if (session?.user?.roleName === "reviewer") {
        router.push(
          `/reviewer/research-topic-awaiting-review/${notification.targetId}`
        );
        handleMarkAsRead();
      }
    }
    // REDIRECT TO REGISTER (ĐĂNG KÍ ĐỀ TÀI)
    else if (notification.notificationTypeId === 4) {
      if (session?.user?.roleName === "author") {
        router.push("/author/submit-research-project");
        handleMarkAsRead();
      }
      if (session?.user?.roleName === "organizer") {
        router.push("/admin/pending-approval-research-topic");
        handleMarkAsRead();
      }
    }
    // REDIRECT TO PHÂN CÔNG PHẢN BIỆN (chưa cần)
    else if (notification.notificationTypeId === 5) {
      if (session?.user?.roleName === "reviewer") {
        router.push("/reviewer/");
        handleMarkAsRead();
      }
      if (session?.user?.roleName === "organizer") {
        router.push("/admin/");
        handleMarkAsRead();
      }
    }
  };

  // UI
  return (
    <div
      className={`flex gap-2 mt-2 p-2  outline-slate-300 border hover:cursor-pointer hover:shadow-md ${notification.status === false ? "bg-gray-200" : ""}`}
    >
      {/* <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" /> */}
      <div className="">
        {(() => {
          if (notification.notificationTypeId === 1) {
            return <img src={imgNotiTypeArticle.src} width={30} />;
          } else if (notification.notificationTypeId === 2) {
            return <img src={imgNotiTypeTopic.src} width={30} />;
          } else if (notification.notificationTypeId === 3) {
            return <img src={imgNotiTypeReview.src} width={30} />;
          } else if (notification.notificationTypeId === 4) {
            return <img src={imgNotiTypeRegis.src} width={30} />;
          } else if (notification.notificationTypeId === 5) {
            return <img src={imgNotiTypeAssignment.src} width={30} />;
          }
        })()}
      </div>
      <div className="flex-1" onClick={() => handleShowDetailsNoti()}>
        <p className="text-sm font-medium leading-none">
          {formatDate(notification.notificationDate)}
        </p>
        <p
          className={`text-sm text-muted-foreground overflow-hidden ${
            isExpanded ? "" : "max-h-[100px] overflow-hidden line-clamp-5"
          }`}
        >
          {notification.notificationContent}
        </p>
        {notification.notificationContent.length > 50 && (
          <button
            onClick={toggleExpand}
            className="text-blue-500 hover:text-blue-700 text-sm focus:outline-none"
          >
            {isExpanded ? "Thu gọn" : "Xem thêm"}
          </button>
        )}
      </div>
      <div className="">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <EllipsisHorizontalIcon width={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => handleMarkAsRead()}>
                <EnvelopeOpenIcon width={14} /> &nbsp;
                <span>Đánh dấu đã đọc</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMarkAsUnread()}>
                <EnvelopeIcon width={14} /> &nbsp;
                <span>Đánh dấu chưa đọc</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDeleteNoti()}>
                <ArchiveBoxXMarkIcon width={14} /> &nbsp;
                <span>Xóa thông báo này</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export { NotificationCard };
