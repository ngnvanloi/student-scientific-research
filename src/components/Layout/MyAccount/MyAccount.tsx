import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setAuthToken } from "@/web-configs/community-api";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

interface IProps {
  userName: string | any;
}
export function MyAccount(props: IProps) {
  const { userName } = props;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="text-sm font-semibold leading-6 text-gray-900 hover:cursor-pointer flex gap-1 hover:underline">
          {userName}
          <ChevronDownIcon width={18} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserCircleIcon width={18} /> &nbsp;
            <p className="text-black">Trang cá nhân</p>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ArrowRightStartOnRectangleIcon width={18} /> &nbsp;
            <Link
              href=""
              className=" text-black"
              onClick={() => {
                signOut();
                setAuthToken(undefined);
              }}
            >
              Đăng xuất
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
