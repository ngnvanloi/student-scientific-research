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
import { SendingMessage } from "./SendingMessage";
import { MailOutlined, SendOutlined } from "@ant-design/icons";
import { EnvelopeIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";

export function MailBoxContainer() {
  return (
    <Tabs defaultValue="send" className="flex w-full max-w-[900px]">
      {/* Sidebar Tabs List */}
      <TabsList className="flex flex-col w-[200px] border-r h-full">
        <TabsTrigger
          value="mailbox"
          className="justify-start w-full h-10 items-center gap-1"
        >
          <EnvelopeIcon width={20} />
          Hộp thư của tôi
        </TabsTrigger>
        <TabsTrigger
          value="send"
          className="justify-start w-full h-10 items-center gap-1"
        >
          <PaperAirplaneIcon width={20} />
          Gửi email
        </TabsTrigger>
      </TabsList>

      {/* Tabs Content */}
      <div className="ml-3 flex-1">
        <TabsContent value="mailbox" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Hộp thư của tôi</CardTitle>
              <CardDescription>
                Make changes to your mailbox here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="">Mailbox</CardContent>
            <CardFooter></CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="send" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Gửi email</CardTitle>
              <CardDescription>Gửi email với trợ lý AI của bạn</CardDescription>
            </CardHeader>
            <CardContent className="">
              <SendingMessage />
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </TabsContent>
      </div>
    </Tabs>
  );
}
