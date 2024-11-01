import { getSession, signOut, useSession } from "next-auth/react";
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
import { redirect, useRouter } from "next/navigation";
import { auth } from "@/auth";

interface IProps {
  userName: string | any;
}
export function MyAccount(props: IProps) {
  const { userName } = props;
  const router = useRouter();
  // LOGIC
  const handleRedirectToMyWorkSpace = async () => {
    const session = await getSession();
    // alert("check roleName:" + session?.user?.roleName);
    if (session?.user?.roleName === "author") {
      router.push("/author");
    } else if (session?.user?.roleName === "organizer") {
      router.push("/admin");
    } else if (session?.user?.roleName === "supperadmin") {
      router.push("/super-admin");
    }
  };

  // UI
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
          <DropdownMenuItem className="hover:cursor-pointer">
            <UserCircleIcon width={18} /> &nbsp;
            <p
              className="text-black"
              onClick={() => handleRedirectToMyWorkSpace()}
            >
              Trang cá nhân
            </p>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ArrowRightStartOnRectangleIcon width={18} /> &nbsp;
            <Link
              href=""
              className=" text-black"
              onClick={() => {
                setAuthToken(undefined);
                signOut();
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
