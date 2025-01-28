import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import DropdownMenu from "./DropdownMenu";

export default function TopNav() {
  const pathname = usePathname();

  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleSearchName = (event: { target: { value: string } }) => {
    console.log(event.target.value);
  };

  const goTo = () => {
    console.log("TODO: Implement later");
  };

  return (
    <>
      <div
        id="TopNav"
        className="fixed bg-white z-30 flex items-center w-full border-b h-[60px]"
      >
        <div
          className={`flex items-center justify-between gap-6 w-full px-4 mx-auto ${
            pathname === "/" ? "max-w-[1150px]" : ""
          }`}
        >
          {/* Logo Area */}
          <Link href="/">
            <Image
              alt="Popreel logo"
              className="min-w-[115px] w-[115px]"
              src="/images/popreel-logo.gif"
              width={96}
              height={96}
            />
          </Link>
          {/* Search Area */}
          <div className="relative hidden md:flex items-center justify-end bg-[#F1F1F2] p-1 rounded-full max-w-[430px] w-full">
            <input
              type="text"
              className="w-full pl-3 my-2 bg-transparent placeholder-[#838383] text-[15px] focus:outline-none"
              placeholder="Search accounts"
              onChange={handleSearchName}
            />

            {/* Dropdown Section */}
            <div className="absolute bg-white max-w-[910px] h-auto w-full z-20 left-0 top-12 border p-1">
              <div className="p-1">
                <Link
                  href={`/profile/johnreel`}
                  className="flex items-center justify-between w-full cursor-pointer hover:bg-[#EC8523] p-1 px-2 hover:text-white"
                >
                  <div className="flex items-center">
                    <Image
                      alt="John Reel"
                      className="rounded-md"
                      width={40}
                      height={40}
                      src="https://placehold.co/400"
                    />
                    <div className="truncate ml-2">John Reel</div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Search Icon Section */}
            <div className="px-3 py-1 flex items-center border-l border-l-gray-300">
              <BiSearch color="#A1A2A7" size="22" />
            </div>
          </div>
          {/* Upload Section */}
          <div className="flex items-center gap-3 ">
            <button
              onClick={() => goTo()}
              className="flex items-center border rounded-sm py-[6px] hover:bg-gray-100 pl-1.5"
            >
              <AiOutlinePlus color="#000000" size="22" />
              <span className="px-2 font-medium text-[15px]">Upload</span>
            </button>
          </div>
          {/* Login Section */}
          {true ? (
            <div className="flex items-center">
              <button
                onClick={() => setIsLoginOpen(true)}
                className="flex items-center bg-[#EC8523] text-white border rounded-md px-3 py-[6px]"
              >
                <span className="whitespace-nowrap mx-4 font-medium text-[15px]">
                  Log in
                </span>
              </button>
              <BsThreeDotsVertical color="#161724" size="25" />
            </div>
          ) : (
            <DropdownMenu />
          )}
        </div>
      </div>
    </>
  );
}
