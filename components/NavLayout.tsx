"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, Search, Settings, User2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaBalanceScale, FaUsers } from "react-icons/fa";
import { GrTask } from "react-icons/gr";
import { IoIosNotificationsOutline } from "react-icons/io";
import { LuClock8 } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import { SlBriefcase } from "react-icons/sl";
import { TbMenuDeep } from "react-icons/tb";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { usePathname } from "next/navigation";
import React from "react";

const isActiveStyles: string =
  "bg-white text-[#df5d29] p-4 rounded-full lg:w-[90%] md:w-fit w-[90%] max-w-full flex justify-start items-center gap-4";

const isNotActiveStyles: string =
  "text-[#ddd] p-4 rounded-full w-fit hover:text-[#fff] flex justify-start items-center gap-4";

interface NavlayoutProps {
  children: React.ReactNode;
  user: UserProps| null
}

export default function NavLayout({ children, user }: NavlayoutProps) {
  const pathname = usePathname();
  console.log({ user });
  return (
    <div className="w-screen h-screen grid lg:grid-cols-[15%_85%] md:grid-cols-[10%_90%] grid-cols-1 overflow-hidden">
      <div className="bg-[#060606] p-4 overflow-x-hidden overflow-y-scroll no-scrollbar lg:block md:block hidden">
        <div className="h-[10%] flex items-start justify-start flex-col sticky top-0 z-50 bg-inherit">
          <div className="flex gap-2 justify-start items-center bg-inherit">
            <Image width={50} height={50} src="/logo-cocobod.png" alt="logo" />
            <div className="text-white lg:flex md:hidden flex flex-col items-start justify-center">
              <span className="text-[clamp(0.5rem,0.8vw,1rem)] whitespace-nowrap">
                Ghana Cocoa Board
              </span>
              <span className="text-[clamp(0.5rem,0.8vw,1rem)] whitespace-nowrap text-gray-400">
                welfare Application
              </span>
            </div>
          </div>
          {/* <div className="w-full">
            <button className="bg-white text-black lg:p-[0.5rem] md:p-2 p-1 rounded-full lg:w-[90%] md:w-fit w-full hover:bg-[#d4cdcd] flex justify-start items-center gap-2">
              <div className="flex-[0.17]">
                <FaMoneyCheckDollar size={25} className="text-[#df5d29] " />
              </div>
              <span className="whitespace-normal text-left flex-1 lg:block md:hidden block">
                Request Loan
              </span>
            </button>
          </div> */}
        </div>

        <div className="py-16">
          <nav className="flex flex-col w-full gap-2">
            <Link
              href="/dashboard"
              className={
                pathname === "/dashboard" ? isActiveStyles : isNotActiveStyles
              }
            >
              <RxDashboard size={20} className="" />
              <span className="lg:inline-block md:hidden inline-block ">
                Dashboard
              </span>
            </Link>
            <Link
              href="/request-loan"
              className={
                pathname === "/request-loan"
                  ? isActiveStyles
                  : isNotActiveStyles
              }
            >
              <SlBriefcase size={20} className="" />
              <span className="lg:inline-block md:hidden inline-block">
                Req. loan
              </span>
            </Link>
            <Link
              href="/department-approval"
              className={
                pathname === "/department-approval"
                  ? isActiveStyles
                  : isNotActiveStyles
              }
            >
              <GrTask size={20} className="" />
              <span className="lg:inline-block md:hidden inline-block">
                Dep. approval
              </span>
            </Link>
            <Link
              href="/time-log"
              className={
                pathname === "/time-log" ? isActiveStyles : isNotActiveStyles
              }
            >
              <LuClock8 size={20} className="" />
              <span className="lg:inline-block md:hidden inline-block">
                Time log
              </span>
            </Link>
            <Link
              href="/resource-mgt"
              className={
                pathname === "/resource-mgt"
                  ? isActiveStyles
                  : isNotActiveStyles
              }
            >
              <FaBalanceScale size={20} className="" />
              <span className="lg:inline-block md:hidden inline-block">
                Resource mgt
              </span>
            </Link>
            <Link
              href="/users"
              className={
                pathname === "/users" ? isActiveStyles : isNotActiveStyles
              }
            >
              <FaUsers size={20} className="" />
              <span className="lg:inline-block md:hidden inline-block">
                Users
              </span>
            </Link>
            <Link
              href="/configurations"
              className={
                pathname === "/configurations"
                  ? isActiveStyles
                  : isNotActiveStyles
              }
            >
              <Settings size={20} className="" />
              <span className="lg:inline-block md:hidden inline-block">
                Configurations
              </span>
            </Link>
          </nav>
        </div>
      </div>
      <div className="bg-[#ebdfd8] overflow-x-hidden overflow-y-scroll no-scrollbar">
        <div className="w-full border-b border-b-[#d3b8aa]/50 sticky top-0 z-[99] bg-inherit50 bg-inherit">
          <div className="w-full h-full flex lg:justify-between md:justify-around justify-between items-center lg:p-8 md:p-4 p-2">
            <div className="lg:block md:block hidden">
              <h1 className="lg:text-2xl md:text-2xl text-sm font-medium- text-[#524946] capitalize">
                {pathname.replaceAll(/[/\-]/g, " ")}
              </h1>
            </div>
            <div className="flex justify-around items-center gap-2 lg:w-auto md:w-auto w-full">
              <div className="bg-white p-1 rounded-3xl lg:w-[25rem] md:w-[20rem] w-[12rem]">
                <form
                  role="search"
                  className="flex items-center justify-center"
                >
                  <Button
                    size="icon"
                    className=" text-gray-400 text-lg bg-tansparent hover:bg-transparent"
                  >
                    <Search className="text-[#524946] !w-[1.3rem] !h-[1.3rem]" />
                  </Button>
                  <input
                    className="w-full placeholder:text-sm placeholder:font-light focus:outline-none outline-none text-base"
                    type="text"
                    placeholder="Search here.."
                  />
                </form>
              </div>
              <Badge className="bg-white rounded-full w-10 h-10 grid place-items-center hover:bg-white p-2">
                <IoIosNotificationsOutline className="text-[#524946] h-[1.3rem] w-[1.3rem]" />
              </Badge>
              <div className="lg:flex md:flex hidden items-center justify-center bg-white p-2 gap-2 rounded-3xl">
                <div className="w-8 h-8 rounded-full bg-[#c9bab2] grid  place-items-center">
                  <User2Icon />
                </div>
                <div className="flex flex-col justify-start items-start">
                  <span className="text-xs">{user?.name}</span>
                  <span className="text-xs text-gray-400">
                    {user?.signature?.member?.user?.designation?.name}
                  </span>
                </div>
                <Button className="w-8 h-8 hover:bg-transparent bg-white grid place-items-center rounded-full ">
                  <ChevronDown className="text-[#524946]" />
                </Button>
              </div>

              <Sheet>
                <SheetTrigger asChild>
                  <span className="lg:hidden md:hidden flex items-center justify-center text-[#df5d29]">
                    <TbMenuDeep size={30} />
                  </span>
                </SheetTrigger>
                <SheetContent
                  className="z-[2000] bg-black text-[#df5d29] flex flex-col justify-start"
                  side="left"
                >
                  <SheetHeader>
                    <SheetTitle className="sr-only">Sidebar</SheetTitle>
                    <SheetDescription className="sr-only">
                      Sidebar navigation links
                    </SheetDescription>
                    <div className="flex gap-2 justify-start items-center bg-inherit">
                      <Image
                        width={50}
                        height={50}
                        src="/logo-cocobod.png"
                        alt="logo"
                      />
                      <div className="text-white flex flex-col items-start justify-center">
                        <span className="text-xs whitespace-nowrap">
                          Ghana Cocoa Board
                        </span>
                        <span className="text-xs whitespace-nowrap text-white/75">
                          welfare Application
                        </span>
                      </div>
                    </div>
                  </SheetHeader>
                  <div className="mt-16 flex flex-col justify-between bg-red-500">
                    <nav className="flex flex-col w-full gap-2">
                      <Link
                        href="/"
                        className={
                          pathname === "/dashboard"
                            ? isActiveStyles
                            : isNotActiveStyles
                        }
                      >
                        <RxDashboard size={20} className="" />
                        <span className="lg:inline-block md:hidden inline-block ">
                          Dashboard
                        </span>
                      </Link>
                      <Link
                        href="/projects"
                        className={
                          pathname === "/projects"
                            ? isActiveStyles
                            : isNotActiveStyles
                        }
                      >
                        <SlBriefcase size={20} className="" />
                        <span className="lg:inline-block md:hidden inline-block">
                          Projects
                        </span>
                      </Link>
                      <Link
                        href="/tasks"
                        className={
                          pathname === "/tasks"
                            ? isActiveStyles
                            : isNotActiveStyles
                        }
                      >
                        <GrTask size={20} className="" />
                        <span className="lg:inline-block md:hidden inline-block">
                          Tasks
                        </span>
                      </Link>
                      <Link
                        href="/time-log"
                        className={
                          pathname === "/time-log"
                            ? isActiveStyles
                            : isNotActiveStyles
                        }
                      >
                        <LuClock8 size={20} className="" />
                        <span className="lg:inline-block md:hidden inline-block">
                          Time log
                        </span>
                      </Link>
                      <Link
                        href="/resource-mgt"
                        className={
                          pathname === "/resource-mgt"
                            ? isActiveStyles
                            : isNotActiveStyles
                        }
                      >
                        <FaBalanceScale size={20} className="" />
                        <span className="lg:inline-block md:hidden inline-block">
                          Resource mgt
                        </span>
                      </Link>
                      <Link
                        href="/users"
                        className={
                          pathname === "/users"
                            ? isActiveStyles
                            : isNotActiveStyles
                        }
                      >
                        <FaUsers size={20} className="" />
                        <span className="lg:inline-block md:hidden inline-block">
                          Users
                        </span>
                      </Link>
                      <Link
                        href="/configurations"
                        className={
                          pathname === "/configurations"
                            ? isActiveStyles
                            : isNotActiveStyles
                        }
                      >
                        <Settings size={20} className="" />
                        <span className="lg:inline-block md:hidden inline-block">
                          Configurations
                        </span>
                      </Link>
                    </nav>
                  </div>
                  <SheetFooter className="justify-self-end">
                    <SheetClose asChild>
                      <Button>Logout</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
        <div className="lg:p-8 md:p-4 p-2">{children}</div>
      </div>
    </div>
  );
}
