"use client";

import { MoreVertical, PlusCircle, Search } from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { removeToken } from "@/store/api/AuthState";
import { useGetProfileQuery } from "@/store/api/profileApi";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import textGray from "../../public/images/grayText.svg";
import darkLogo from "../../public/images/logoDark.png";
import lightLogo from "../../public/images/logoLight.png";
import text from "../../public/images/text.svg";
import CommonButton from "./common/button/CommonButton";
import CommonBorder from "./common/custom/CommonBorder";
import CommonHeader from "./common/header/CommonHeader";
import DeleteDialog from "./delete-dialog";
import RenameDialog from "./rename-dialog";
import ShareDialog from "./share-dialog";
import SubscriptionDropdownItem from "./subscription-dialog";
export function AppSidebar() {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  const recentItems = [
    "What is ui ux design?",
    "Can you write me...",
    "Can you discus...",
    "Can you discus...",
    "Can you discus...",
    "Can you discus...",
  ];

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(removeToken());
    router.push("/login");
  };

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const { data: profile } = useGetProfileQuery();
  return (
    <>
      <Sidebar
        collapsible="offcanvas"
        className="bg-background text-foreground "
      >
        <SidebarHeader className="p-3">
          <SidebarGroup>
            <SidebarGroupContent>
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <div className="p-3 border border-border bg-card rounded-2xl">
                    <div className="flex items-start gap-3">
                      {mounted ? (
                        theme === "dark" ? (
                          <Image
                            src={darkLogo}
                            alt="Logo"
                            className="w-auto object-contain rounded-lg"
                            priority
                          />
                        ) : (
                          <Image
                            src={lightLogo}
                            alt="Logo"
                            className="w-auto object-contain"
                          />
                        )
                      ) : (
                        <div className="w-24 h-10 bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
                      )}
                    </div>

                    <div className="mt-2">
                      <p className="text-xs text-muted-foreground">
                        Lorem Ipsum is simply dummy text of the printing
                        industry.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarHeader>

        <SidebarContent className="flex flex-col gap-4 p-3  ">
          <SidebarGroup>
            <SidebarGroupContent>
              <div className=" flex flex-col gap-6">
                <CommonButton
                  size="lg"
                  className="w-full flex  items-center justify-center gap-2"
                >
                  New Query
                  <PlusCircle className="h-4 w-4" />
                </CommonButton>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search"
                    className="pl-8 bg-background border-border"
                  />
                </div>
              </div>

              <div className=" pt-6">
                <CommonHeader size="sm" className=" mb-2 text-[#DFE3E8]">
                  Recent
                </CommonHeader>

                <hr className=" border-[#454F5B] my-3" />
                <div className="space-y-1 max-h-44 overflow-y-hidden pb-5">
                  <div className="flex items-center gap-2">
                    <Image
                      src={text}
                      alt="Logo"
                      className="w-auto object-contain"
                    />
                    <CommonHeader className=" truncate">
                      {recentItems[0]}
                    </CommonHeader>
                  </div>
                  {recentItems.map((item, idx) => (
                    <div
                      key={idx}
                      className=" pl-2 flex items-center justify-between w-full transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          src={textGray}
                          alt="Logo"
                          className="w-auto object-contain"
                        />
                        <CommonHeader className=" !text-[#637381] truncate">
                          {item}
                        </CommonHeader>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 text-muted-foreground hover:text-foreground shrink-0">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-40">
                          <ShareDialog />
                          <RenameDialog />
                          <DeleteDialog />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
                <CommonButton
                  variant="secondary"
                  size="md"
                  className=" mt-5 w-full font-bold !py-3 !bg-[linear-gradient(0deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.2)_100%),linear-gradient(0deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.2)_100%),linear-gradient(0deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.2)_100%),#212B36]"
                >
                  See More
                </CommonButton>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-3 ">
          <CommonBorder size="sm" className="!rounded-2xl">
            <div className="flex justify-end">
              <CommonButton
                onClick={() => setOpen(true)}
                variant="secondary"
                size="md"
                className="!px-6  mb-3"
              >
                Upgrade
              </CommonButton>
            </div>
            <div className="mb-6">
              <CommonHeader size="lg">
                {profile?.data.fullName || " "}
              </CommonHeader>
              <CommonHeader>{profile?.data.email || " "}</CommonHeader>
            </div>
            <CommonButton
              onClick={handleLogout}
              variant="secondary"
              className=" w-full !py-3 !bg-white !text-[#161C24] !font-bold"
            >
              Logout
            </CommonButton>
          </CommonBorder>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>
      {open && <SubscriptionDropdownItem handleClose={handleClose} />}
    </>
  );
}
