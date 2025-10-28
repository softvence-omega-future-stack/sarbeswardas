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
import { useDebounce } from "@/lib/useDebounce";
import { useGetAllSessionQuery } from "@/store/api/AIApi";
import { removeToken } from "@/store/api/AuthState";
import { newQuery, setSelectedSessionId } from "@/store/api/chatSlice";
import { useGetProfileQuery } from "@/store/api/profileApi";
import { AppDispatch } from "@/store/store";
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
import SubscriptionDropdownItem from "./subscription-dialog";

export function AppSidebar() {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const { data: allSessions } = useGetAllSessionQuery();
  const recentItems = allSessions?.data?.sessions ?? [];
  const [expanded, setExpanded] = React.useState(false);

  const [searchQuery, setSearchQuery] = React.useState("");
  const debouncedSearch = useDebounce(searchQuery, 400);

  const filteredItems = recentItems.filter((item) =>
    item.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const visibleItems = expanded ? filteredItems : filteredItems.slice(0, 3);
  const handleToggle = () => setExpanded(!expanded);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(removeToken());
    router.push("/login");
  };

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const { data: profile } = useGetProfileQuery();
  const newChat: AppDispatch = useDispatch();

  const handleNewQuery = () => {
    newChat(newQuery());
  };

  const selectedSessionId = React.useRef<string>("");

  React.useEffect(() => {
    const stored = localStorage.getItem("selectedSessionId");
    if (stored) {
      selectedSessionId.current = stored;
      dispatch(setSelectedSessionId(stored));
    }
  }, [dispatch]);

  const handleSingleSession = (sessionId: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedSessionId", sessionId);
    }
    dispatch(setSelectedSessionId(sessionId));
    selectedSessionId.current = sessionId;
  };
  return (
    <>
      <Sidebar
        collapsible="offcanvas"
        className="bg-background text-foreground"
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
                  </div>
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarHeader>

        <SidebarContent className="flex flex-col gap-4 p-3">
          <SidebarGroup>
            <SidebarGroupContent>
              <div className="flex flex-col gap-6">
                <CommonButton
                  onClick={handleNewQuery}
                  size="lg"
                  className="w-full flex items-center justify-center gap-2"
                >
                  New Query
                  <PlusCircle className="h-4 w-4" />
                </CommonButton>

                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search"
                    className="pl-8 bg-background border-border"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-6">
                <CommonHeader size="sm" className="mb-2 text-[#DFE3E8]">
                  Recent
                </CommonHeader>

                <hr className="border-[#454F5B] my-3" />

                <div
                  className={`space-y-1 pb-5 ${
                    !expanded ? "max-h-44 overflow-y-hidden" : ""
                  }`}
                >
                  {visibleItems.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Image
                        src={text}
                        alt="Logo"
                        className="w-auto object-contain"
                      />
                      <CommonHeader
                        onClick={() =>
                          handleSingleSession(visibleItems[0].sessionId)
                        }
                        className="w-full line-clamp-1 cursor-pointer"
                      >
                        {visibleItems[0].title}
                      </CommonHeader>
                    </div>
                  )}

                  {visibleItems.slice(1).map((item) => (
                    <div
                      key={item.sessionId}
                      className="pl-2 flex items-center justify-between w-full transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          src={textGray}
                          alt="Logo"
                          className="w-auto object-contain"
                        />
                        <CommonHeader
                          onClick={() => handleSingleSession(item.sessionId)}
                          className="!text-[#637381] w-full line-clamp-1 cursor-pointer"
                        >
                          {item.title}
                        </CommonHeader>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 text-muted-foreground hover:text-foreground shrink-0 cursor-pointer">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-40">
                          <RenameDialog sessionId={item.sessionId} />
                          <DeleteDialog sessionId={item.sessionId} />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>

                {recentItems.length > 3 && (
                  <CommonButton
                    variant="secondary"
                    size="md"
                    className="mt-5 w-full font-bold !py-3 !bg-[linear-gradient(0deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.2)_100%),linear-gradient(0deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.2)_100%),linear-gradient(0deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.2)_100%),#212B36]"
                    onClick={handleToggle}
                  >
                    {expanded ? "See Less" : "See More"}
                  </CommonButton>
                )}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-3">
          <CommonBorder size="sm" className="!rounded-2xl">
            <div className="flex justify-end">
              <CommonButton
                onClick={() => setOpen(true)}
                variant="secondary"
                size="md"
                className="!px-6 mb-3"
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
              className="w-full !py-3 !bg-white !text-[#161C24] !font-bold"
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
