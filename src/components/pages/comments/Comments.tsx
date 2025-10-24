import { CardContent } from "@/components/ui/card";
import type { Post } from "@/types/types";
import CommentItem from "./CommentItem.tsx";

type Props = {
  post: Post;
  handleComment: (data: {
    postId: string;
    content: string;
    parentId: string | null;
  }) => void;
};

function Comments({ post, handleComment }: Props) {
  return (
    <CardContent className="flex flex-col gap-4">
      {post.comments?.map((comment) => (
        <CommentItem
          key={comment.id}
          postId={post.id!}
          comment={comment}
          handleComment={handleComment}
        />
      ))}
    </CardContent>
  );
}

export default Comments;
