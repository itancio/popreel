"use client";

import Image from "next/image";
import { BiUser } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";

export default function DropdownMenu() {
  return (
    <div className="flex items-center">
      <div className="relative">
        <button className="mt-1 border border-gray-200 rounded-full">
          <Image
            alt="placeholder"
            className="rounded-full w-[35px] h-[35px]"
            height={40}
            width={40}
            src="https://placehold.co/400"
          />
        </button>

        <div className="absolute bg-white rounded-lg py-1.5 w-[200px] shadow-xl border top-[40px] right-0">
          <button
            onClick={() => {}}
            className="flex items-center w-full justify-start py-3 px-2 hover:bg-gray-100 cursor-pointer"
          >
            <BiUser size="20" />
            <span className="pl-2 font-semibold text-sm">Profile</span>
          </button>
          <button
            onClick={async () => {}}
            className="flex items-center justify-start w-full py-3 px-1.5 hover:bg-gray-100 border-t cursor-pointer"
          >
            <FiLogOut size={20} />
            <span className="pl-2 font-semibold text-sm">Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
