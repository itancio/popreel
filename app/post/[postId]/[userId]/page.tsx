"use client";

import Comments from "@/app/components/post/Comments";
import CommentsHeader from "@/app/components/post/CommentsHeader";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useRouter } from "next/navigation";
import ClientOnly from "@/app/components/ClientOnly";
import { PostPageTypes } from "@/app/types";
import { usePostStore } from "@/app/stores/post";
import { useLikeStore } from "@/app/stores/like";
import { useCommentStore } from "@/app/stores/comment";
import createBucketUrl from "@/app/hooks/createBucketUrl";
import Image from "next/image";

export default function Post({ params }: PostPageTypes) {
  const { postById, postsByUser, setPostById, setPostsByUser } = usePostStore();
  const { setLikesByPost } = useLikeStore();
  const { setCommentsByPost } = useCommentStore();
  const [postId, setPostId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    async function resolve() {
      try {
        const resolvedParams = await params;
        if (resolvedParams?.userId && resolvedParams?.postId) {
          setUserId(resolvedParams.userId);
          setPostId(resolvedParams.postId);
        }
      } catch (error) {
        console.error("Error resolving params in POST:", error);
      }
    }

    resolve();
  }, [params]);

  useEffect(() => {
    setPostById(postId);
    setCommentsByPost(postId);
    setLikesByPost(postId);
    setPostsByUser(userId);
  }, [
    postId,
    userId,
    setPostById,
    setCommentsByPost,
    setLikesByPost,
    setPostsByUser,
  ]);

  const loopThroughPostsUp = () => {
    postsByUser.forEach((post) => {
      if (post.id > params.postId) {
        router.push(`/post/${post.id}/${params.userId}`);
      }
    });
  };

  const loopThroughPostsDown = () => {
    postsByUser.forEach((post) => {
      if (post.id < params.postId) {
        router.push(`/post/${post.id}/${params.userId}`);
      }
    });
  };

  return (
    <>
      <div
        id="PostPage"
        className="lg:flex justify-between w-full h-screen bg-black overflow-auto"
      >
        <div className="lg:w-[calc(100%-540px)] h-full relative">
          <Link
            href={`/profile/${userId}`}
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
            alt="profile image"
            className="absolute z-20 top-[18px] left-[70px] rounded-full lg:mx-0 mx-auto"
            width={45}
            height={45}
            src="/images/tiktok-logo.png"
          />

          <ClientOnly>
            {postById?.video_url ? (
              <video
                className="fixed object-cover w-full my-auto z-[0] h-screen"
                src={createBucketUrl(postById?.video_url)}
              />
            ) : null}

            <div className="bg-black bg-opacity-70 lg:min-w-[480px] z-10 relative">
              {postById?.video_url ? (
                <video
                  autoPlay
                  controls
                  loop
                  muted
                  className="h-screen mx-auto"
                  src={createBucketUrl(postById.video_url)}
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
            {postById ? (
              <CommentsHeader post={postById} params={params} />
            ) : null}
          </ClientOnly>
          <Comments params={params} />
        </div>
      </div>
    </>
  );
}
