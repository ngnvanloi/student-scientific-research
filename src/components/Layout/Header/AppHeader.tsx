"use client";
import iconHUIT from "../../../assets/img/logo-huit-h.png";
import iconHUIT2 from "../../../assets/img/logo-huit-v.jpeg";
import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { setAuthToken } from "@/web-configs/community-api";
import { NotificationBadge } from "@/components/ShowNotification/NotificationBadge";
import { MyAccount } from "../MyAccount/MyAccount";
// import { useApplicationGlobalContext } from "@/providers/app-global-context";

export default function AppHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  const [currentTab, setCurrentTab] = useState("home");
  // const session = useApplicationGlobalContext();
  // console.log("check session in AppHeader: ", JSON.stringify(session, null, 2));
  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img alt="" src={iconHUIT.src} className="h-10 w-auto" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Link
            href="/"
            className={`text-sm font-semibold leading-6 text-gray-900 ${currentTab === "home" ? "border-b-2 border-b-blue-900 text-blue-900" : ""}`}
            onClick={() => setCurrentTab("home")}
          >
            Trang chủ
          </Link>

          <Link
            href="/posts"
            className={`text-sm font-semibold leading-6 text-gray-900 ${currentTab === "post" ? "border-b-2 border-b-blue-900 text-blue-900" : ""}`}
            onClick={() => setCurrentTab("post")}
          >
            Bài viết
          </Link>
          <Link
            href="/competitions"
            className={`text-sm font-semibold leading-6 text-gray-900 ${currentTab === "competition" ? "border-b-2 border-b-blue-900 text-blue-900" : ""}`}
            onClick={() => setCurrentTab("competition")}
          >
            Cuộc thi
          </Link>
          <Link
            href="/article"
            className={`text-sm font-semibold leading-6 text-gray-900 ${currentTab === "article" ? "border-b-2 border-b-blue-900 text-blue-900" : ""}`}
            onClick={() => setCurrentTab("article")}
          >
            Bài báo khoa học
          </Link>
          <Link
            href="/"
            className={`text-sm font-semibold leading-6 text-gray-900 ${currentTab === "topic" ? "border-b-2 border-b-blue-900 text-blue-900" : ""}`}
            onClick={() => setCurrentTab("topic")}
          >
            Đề tài khoa học
          </Link>
        </PopoverGroup>

        {!session?.user ? (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end ">
            <Link
              href="/login"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Đăng nhập <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        ) : (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <MyAccount userName={session?.user?.name} />
            &nbsp;
            <NotificationBadge />
            &nbsp;
          </div>
        )}
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">HUIT</span>
              <img alt="" src={iconHUIT2.src} className="h-12 w-auto" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Trang chủ
                </a>
                <a
                  href="/posts"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Bài viết
                </a>
                <a
                  href="/competitions"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Cuộc thi
                </a>
                <a
                  href="/article"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Bài báo khoa học
                </a>
                <a
                  href="/"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Đề tài khoa học
                </a>
              </div>
              <div className="py-6">
                {!session?.user ? (
                  <div className="flex lg:justify-end">
                    <Link
                      href="/login"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Đăng nhập <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                ) : (
                  <div className="flex lg:justify-end">
                    <MyAccount userName={session?.user?.name} />
                    &nbsp;
                    <NotificationBadge />
                    &nbsp;
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
