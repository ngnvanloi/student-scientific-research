"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MailOutlined, SendOutlined } from "@ant-design/icons";
import { BackupDatabase } from "./BackupDatabase";
import {
  ArchiveBoxArrowDownIcon,
  CloudArrowUpIcon,
} from "@heroicons/react/24/outline";
import { RestoreDatabase } from "./RestoreDatabase";

const BackupRestoreDatabase = () => {
  return (
    <Tabs defaultValue="backup" className="flex w-full max-w-[900px]">
      {/* Sidebar Tabs List */}
      <TabsList className="flex flex-col w-[200px] border-r h-full">
        <TabsTrigger
          value="restore"
          className="justify-start w-full h-10 items-center gap-1"
        >
          <CloudArrowUpIcon width={20} />
          Sao lưu cơ sở dữ liệu
        </TabsTrigger>
        <TabsTrigger
          value="backup"
          className="justify-start w-full h-10 items-center gap-1"
        >
          <ArchiveBoxArrowDownIcon width={20} />
          Phục hồi cơ sở dữ liệu
        </TabsTrigger>
      </TabsList>

      {/* Tabs Content */}
      <div className="ml-3 flex-1">
        <TabsContent value="restore" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Sao lưu cơ sở dữ liệu</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="">
              <BackupDatabase />
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="backup" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Phục hồi cơ sở dữ liệu</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="">
              <RestoreDatabase />
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </TabsContent>
      </div>
    </Tabs>
  );
};
export { BackupRestoreDatabase };
