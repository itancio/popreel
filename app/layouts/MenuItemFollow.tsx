import { MenuItemFollowCompTypes } from "@/app/types";
import Link from "next/link";
import Image from "next/image";
export default function MenuItemFollow({ user }: MenuItemFollowCompTypes) {
  console.log(user);
  return (
    <>
      <Link
        href={`/profile/${user?.id}`}
        className="flex items-center hover:bg-gray-100 rounded-md w-full py-1.5 px-2"
      >
        <Image
          alt={`${user?.name} Profile`}
          className="rounded-full lg:mx-0 mx-auto"
          width={35}
          height={35}
          src={user?.image}
        />
      </Link>
    </>
  );
}
