"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import imgNotiType from "../../assets/icon/icons8-article-100.png";
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

interface IProps {
  notification: Notification;
  isChanged: boolean;
  setIsChanged: React.Dispatch<React.SetStateAction<boolean>>;
}
const NotificationCard = (props: IProps) => {
  const { notification, isChanged, setIsChanged } = props;
  const markAsReadMutation = useMarkAsReadOrUnreadMutation();
  const deleteNotification = useDeleteNotificationMutation();

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
          alert("Đánh dấu đã đọc thành công");
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
          alert("Đánh dấu chưa đọc thành công");
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
        alert("Delete thông báo thành công");
        setIsChanged(!isChanged);
      },
      onError: (error) => {
        console.error("Lỗi khi xóa thông báo:", error);
      },
    });
  };

  // UI
  return (
    <div
      className={`flex gap-2 mt-2 p-2  outline-slate-300 border hover:cursor-pointer hover:shadow-md ${notification.status === false ? "bg-gray-200" : ""}`}
    >
      {/* <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" /> */}
      <div className="">
        <img src={imgNotiType.src} width={30} />
      </div>
      <div className=" flex-1">
        <p className="text-sm font-medium leading-none">
          {formatDate(notification.notificationDate)}
        </p>
        <p className="text-sm text-muted-foreground">
          {notification.notificationContent}
        </p>
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
