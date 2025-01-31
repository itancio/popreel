import { database, storage } from "@/libs/AppWriteClient";
import useDeleteComment from "./deleteComment";
import useDeleteLike from "./deleteLike";
import getCommentsByPostId from "./getCommentsByPostId";
import getLikesByPostId from "./getLikesByPostId";

const deletePostById = async (postId: string, currentImage: string) => {
  try {
    const likes = await getLikesByPostId(postId);
    likes.forEach(async (like) => {
      await useDeleteLike(like?.id);
    });

    const comments = await getCommentsByPostId(postId);
    comments.forEach(async (comment) => {
      await useDeleteComment(comment?.id);
    });

    await database.deleteDocument(
      String(process.env.NEXT_PUBLIC_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_COLLECTION_ID_POST),
      postId
    );
    await storage.deleteFile(
      String(process.env.NEXT_PUBLIC_BUCKET_ID),
      currentImage
    );
  } catch (error) {
    throw error;
  }
};

export default deletePostById;
