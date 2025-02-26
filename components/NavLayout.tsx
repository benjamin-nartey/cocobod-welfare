"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, Plus, Search, Settings, User2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaBalanceScale, FaUsers } from "react-icons/fa";
import { GrTask } from "react-icons/gr";
import { IoIosNotificationsOutline } from "react-icons/io";
import { LuClock8 } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import { SlBriefcase } from "react-icons/sl";

import { usePathname } from "next/navigation";
import React from "react";

const isActiveStyles: string =
  "bg-white text-[#df5d29] p-4 rounded-full lg:w-[90%] md:w-fit w-[90%] max-w-full flex justify-start items-center gap-4";

const isNotActiveStyles: string =
  "text-[#ddd] p-4 rounded-full w-fit hover:text-[#fff] flex justify-start items-center gap-4";

interface NavLayoutProps {
  children: React.ReactNode;
}

export default function NavLayout({ children }: NavLayoutProps) {
  const pathname = usePathname();
  return (
    <div className="w-screen h-screen grid lg:grid-cols-[15%_85%] md:grid-cols-[10%_90%] grid-cols-1 overflow-hidden">
      <div className="bg-[#060606] p-4 overflow-x-hidden overflow-y-scroll no-scrollbar lg:block md:block hidden">
        <div className="h-[30%] flex items-start justify-around flex-col sticky top-0 z-50 bg-inherit">
          <div className="flex gap-2 justify-start items-center bg-inherit">
            <Image width={50} height={50} src="/logo-cocobod.png" alt="logo" />
            <div className="text-white lg:flex md:hidden flex flex-col items-start justify-center">
              <span className="text-[clamp(0.5rem,0.8vw,1rem)] whitespace-nowrap">
                Ghana Cocoa Board
              </span>
              <span className="text-[clamp(0.5rem,0.8vw,1rem)] whitespace-nowrap text-gray-400">
                Warefare Application
              </span>
            </div>
          </div>
          <div className="w-full">
            <button className="bg-white text-black lg:p-[0.5rem] md:p-2 p-1 rounded-full lg:w-[90%] md:w-fit w-full hover:bg-[#d4cdcd] flex justify-start items-center gap-2">
              <div className="flex-[0.17]">
                <Plus
                  size={25}
                  className="text-white bg-[#df5d29] rounded-full"
                />
              </div>
              <span className="whitespace-normal text-left flex-1 lg:block md:hidden block">
                Create New Project
              </span>
            </button>
          </div>
        </div>

        <div className="py-16">
          <nav className="flex flex-col w-full gap-2">
            <Link
              href="/"
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
              href="/projects"
              className={
                pathname === "/projects" ? isActiveStyles : isNotActiveStyles
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
                pathname === "/tasks" ? isActiveStyles : isNotActiveStyles
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
        <div className="w-full border-b border-b-[#d3b8aa]/50 sticky top-0 50 bg-inherit50 bg-inherit">
          <div className="w-full h-full flex justify-between items-center lg:p-8 md:p-4 p-2">
            <div className="">
              <h1 className="text-2xl font-medium- text-[#524946]">
                Dashboard
              </h1>
            </div>
            <div className="flex justify-center items-center gap-2">
              <div className="bg-white p-1 rounded-3xl w-[25rem]">
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
              <div className="flex items-center justify-center bg-white p-2 gap-2 rounded-3xl">
                <div className="w-8 h-8 rounded-full bg-[#c9bab2] grid  place-items-center">
                  <User2Icon />
                </div>
                <div className="flex flex-col justify-start items-start">
                  <span className="text-xs">Benjamin Nartey</span>
                  <span className="text-xs text-gray-400">Lead Instructor</span>
                </div>
                <Button className="w-8 h-8 hover:bg-transparent bg-white grid place-items-center rounded-full ">
                  <ChevronDown className="text-[#524946]" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:p-8 md:p-4 p-2">{children}</div>
      </div>
    </div>
  );
}
