"use client";
import { Check } from "lucide-react";
import iconNoti from "../../assets/icon/icons8-notification-48.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NotificationCard } from "./NotificationCard";
import { Fragment, useEffect, useState } from "react";
import { Avatar, Badge } from "antd";
import { ScrollArea } from "../ui/scroll-area";
import { useGetListNotification } from "@/hooks-query/queries/use-get-notifications";
import { countUnreadNotifications } from "@/helper/extension-function";

export function NotificationBadge() {
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const { data: listNotification, refetch } = useGetListNotification();
  // console.log(
  //   "==== checking list notification: ",
  //   JSON.stringify(listNotification, null, 2)
  // );
  useEffect(() => {
    refetch();
  }, [isChanged]);
  return (
    <Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Badge
            className="hover:cursor-pointer"
            count={
              listNotification?.data
                ? countUnreadNotifications(listNotification.data)
                : 0
            }
            size="small"
          >
            <Avatar src={iconNoti.src} size={20} />
          </Badge>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[360px]">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Thông báo</CardTitle>
              <CardDescription>
                Bạn có{" "}
                {listNotification?.data
                  ? countUnreadNotifications(listNotification.data)
                  : 0}{" "}
                thông báo chưa đọc
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <ScrollArea className="max-h-72 w-full">
                {listNotification?.data.map((notification, index) => (
                  <NotificationCard
                    key={index}
                    notification={notification}
                    setIsChanged={setIsChanged}
                    isChanged={isChanged}
                  />
                ))}
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-[#03509d]">
                <Check className="mr-2 h-4 w-4" /> Mark all as read
              </Button>
              {/* <p className="text-center">You reach the end of the world !</p> */}
            </CardFooter>
          </Card>
        </DropdownMenuContent>
      </DropdownMenu>
    </Fragment>
  );
}
