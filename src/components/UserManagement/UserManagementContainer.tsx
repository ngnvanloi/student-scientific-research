import { Button } from "@/components/ui/button";
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
import { UserManagement } from "./UserManagement";
import { UserGroupIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { SignUpForm } from "./FormSignUp";
const UserManagementContainer = () => {
  return (
    <div>
      <Tabs defaultValue="send" className="flex w-full">
        {/* Sidebar Tabs List */}
        <TabsList className="flex flex-col w-[200px] border-r h-full">
          <TabsTrigger
            value="mailbox"
            className="justify-start w-full h-10 items-center gap-1"
          >
            <UserPlusIcon width={20} />
            Tài khoản ban tổ chức
          </TabsTrigger>
          <TabsTrigger
            value="send"
            className="justify-start w-full h-10 items-center gap-1"
          >
            <UserGroupIcon width={20} />
            Quản trị tài khoản
          </TabsTrigger>
        </TabsList>

        {/* Tabs Content */}
        <div className="ml-3 flex-1">
          <TabsContent value="mailbox" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Tài khoản ban tổ chức</CardTitle>
                <CardDescription>Tạo tài khoản cho ban tổ chức</CardDescription>
              </CardHeader>
              <CardContent className="">
                <SignUpForm />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="send" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Quản trị tài khoản người dùng</CardTitle>
                <CardDescription>
                  Tại đây bạn có thể thống kê số lượng người dùng, vô hiệu hóa
                  và xóa tài khoản
                </CardDescription>
              </CardHeader>
              <CardContent className="">
                <UserManagement />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
export { UserManagementContainer };
