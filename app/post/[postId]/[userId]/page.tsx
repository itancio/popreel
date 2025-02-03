"use client";

import { PostPageTypes } from "@/app/types";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import Image from "next/image";
import ClientOnly from "@/app/components/ClientOnly";
import CommentsHeader from "@/app/components/post/CommentsHeader";
import Comments from "@/app/components/post/Comments";

const postById = {
  id: "123",
  user_id: "456",
  video_url: "/beach.mp4",
  text: "this is some text",
  created_at: "2022-01-01T00:00:00Z",
  profile: {
    user_id: "456",
    name: "User 1",
    image: "https://placehold.co/400",
  },
};
export default function Post({ params }: PostPageTypes) {
  const loopThroughPostsUp = () => {
    console.log("Post");
  };

  const loopThroughPostsDown = () => {
    console.log("Post");
  };

  return (
    <>
      <div
        id="PostPage"
        className="lg:flex justify-between w-full h-screen bg-black overflow-auto"
      >
        <div className="lg:w-[calc(100%-540px)] h-full relative">
          <Link
            href={`/profile/`}
            className="absolute text-white z-20 m-5 rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
          >
            <AiOutlineClose size="27" />
          </Link>

          <div>
            <button
              onClick={() => loopThroughPostsUp()}
              className="absolute z-20 right-4 top-4 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
            >
              <BiChevronUp size="30" color="#FFFFFF" />
            </button>

            <button
              onClick={() => loopThroughPostsDown()}
              className="absolute z-20 right-4 top-20 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
            >
              <BiChevronDown size="30" color="#FFFFFF" />
            </button>
          </div>

          <Image
            alt="images"
            className="absolute z-20 top-[18px] left-[70px] rounded-full lg:mx-0 mx-auto"
            width={45}
            height={45}
            src="/images/tiktok.png"
          />

          <ClientOnly>
            {true ? (
              <video
                className="fixed object-cover w-full my-auto z-[0] h-screen"
                src="/tokyo.mp4"
              />
            ) : null}

            <div className="bg-black bg-opacity-70 lg:min-w-[480px] z-10 relative">
              {true ? (
                <video
                  autoPlay
                  controls
                  loop
                  muted
                  className="h-screen mx-auto"
                  src="/tokyo.mp4"
                />
              ) : null}
            </div>
          </ClientOnly>
        </div>

        <div
          id="InfoSection"
          className="lg:max-w-[550px] relative w-full h-full bg-white"
        >
          <div className="py-7" />

          <ClientOnly>
            {true ? <CommentsHeader post={postById} params={params} /> : null}
          </ClientOnly>

          <Comments params={params} />
        </div>
      </div>
    </>
  );
}
