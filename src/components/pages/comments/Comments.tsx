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
  const rootComments = post.comments?.filter((c) => !c.parentId) ?? [];
  return (
    <CardContent className="flex flex-col gap-4">
      {rootComments.map((comment) =>
        comment.parentId ? null : (
          <div key={comment.id} className="flex flex-col gap-2">
            <CommentItem
              postId={post.id!}
              comment={comment}
              handleComment={handleComment}
            />
          </div>
        )
      )}
    </CardContent>
  );
}

export default Comments;
