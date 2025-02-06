import { AiFillHeart } from "react-icons/ai";
import { FaShare, FaCommentDots } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useUser } from "../context/user";
import { BiLoaderCircle } from "react-icons/bi";
import { useGeneralStore } from "../stores/general";
import { useRouter } from "next/navigation";
import { Comment, Like, PostMainLikesCompTypes } from "../types";
import getCommentsByPostId from "../hooks/getCommentsByPostId";
import getLikesByPostId from "../hooks/getLikesByPostId";
import createLike from "../hooks/createLike";
import deleteLike from "../hooks/deleteLike";

export default function PostMainLikes({ post }: PostMainLikesCompTypes) {
  const { setIsLoginOpen } = useGeneralStore();
  const router = useRouter();
  const contextUser = useUser();

  const [hasClickedLike] = useState(false);
  const [userLiked, setUserLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [likes, setLikes] = useState<Like[]>([]);

  useEffect(() => {
    if (!post?.id) return;

    const fetchData = async () => {
      const [likesResult, commentsResult] = await Promise.all([
        getLikesByPostId(post.id),
        getCommentsByPostId(post.id),
      ]);
      setLikes(likesResult);
      setComments(commentsResult);
    };

    fetchData();
  }, [post?.id]);

  useEffect(() => {
    if (!contextUser?.user?.id) {
      setUserLiked(false);
      return;
    }
    setUserLiked(likes.some((like) => like.user_id === contextUser?.user?.id));
  }, [likes, contextUser]);

  // const isUserLiked = likes.some(
  //   (like) => like.user_id === contextUser?.user?.id
  // );
  const likeButtonColor = userLiked ? "#ff2626" : "";

  const likeOrUnlike = () => {
    if (!contextUser?.user?.id) {
      setIsLoginOpen(true);
      return;
    }

    if (!userLiked) {
      createLike(post.id, contextUser.user.id);
    } else {
      const userLike = likes.find(
        (like) =>
          like.user_id === contextUser?.user?.id && like.post_id === post.id
      );
      if (userLike) deleteLike(userLike.id);
    }
  };

  return (
    <div id={`PostMainLikes-${post?.id}`} className="relative mr-[75px]">
      <div className="absolute bottom-0 pl-2">
        {/* Like Button */}
        <div className="pb-4 text-center">
          <button
            disabled={hasClickedLike}
            onClick={likeOrUnlike}
            className="rounded-full bg-gray-200 p-2 cursor-pointer"
          >
            {!hasClickedLike ? (
              <AiFillHeart color={likeButtonColor} size="25" />
            ) : (
              <BiLoaderCircle className="animate-spin" size="25" />
            )}
          </button>
          <span className="text-xs text-gray-800 font-semibold">
            {likes.length}
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
            {comments.length}
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
  );
}
