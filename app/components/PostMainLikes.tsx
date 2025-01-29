import { Like, PostMainLikesCompTypes } from "@/app/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";
import { FaCommentDots, FaShare } from "react-icons/fa";
import { Comment } from "@/app/types";

export default function PostMainLikes({ post }: PostMainLikesCompTypes) {
  const router = useRouter();
  const [hasClickedLike] = useState<boolean>(false);
  const [userLiked] = useState<boolean>(false);
  const [likes] = useState<Like[]>([]);
  const [comments] = useState<Comment[]>([]);
  const likeOrUnlike = () => {
    console.log("TODO");
  };

  return (
    <>
      <div id={`PostMainLikes-${post?.id}`} className="relative mr-[75px]">
        <div className="absolute bottom-0 pl-2">
          {/* Like Button */}
          <div className="pb-4 text-center">
            <button
              disabled={hasClickedLike}
              onClick={() => likeOrUnlike()}
              className="rounded-full bg-gray-200 p-2 cursor-pointer"
            >
              {!hasClickedLike ? (
                <AiFillHeart
                  color={likes?.length > 0 && userLiked ? "#ff2626" : ""}
                  size="25"
                />
              ) : (
                <BiLoaderCircle className="animate-spin" size="25" />
              )}
            </button>
            <span className="text-xs text-gray-800 font-semibold">
              {likes?.length}
            </span>
          </div>

          {/* Comment Button */}
          <button
            onClick={() =>
              router.push(`/post/${post?.id}/${post?.profile?.user_id}`)
            }
            className="pb-4 text-center"
          >
            <div className="rounded-full bg-gray-200 p-2 cursor-pointer">
              <FaCommentDots size="25" />
            </div>
            <span className="text-xs text-gray-800 font-semibold">
              {comments?.length}
            </span>
          </button>

          {/* Share Button */}
          <button className="text-center">
            <div className="rounded-full bg-gray-200 p-2 cursor-pointer">
              <FaShare size="25" />
            </div>
            <span className="text-xs text-gray-800 font-semibold">55</span>
          </button>
        </div>
      </div>
    </>
  );
}
