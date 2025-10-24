import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import type { Comment } from "@/types/types";
import { useState } from "react";
import CreateCommentForm from "./CreateCommentForm";

type Props = {
  postId: string;
  comment: Comment;
  handleComment: (data: {
    postId: string;
    content: string;
    parentId: string | null;
  }) => void;
};

function CommentItem({ postId, comment, handleComment }: Props) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const onReplySubmit = (data: { content: string }) => {
    handleComment({
      postId,
      content: data.content,
      parentId: comment.id ?? null,
    });
    setShowReplyForm(false);
  };

  return (
    <div className="flex flex-col justify-between items-start gap-4">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {comment.user.username}
      </div>
      <div>{comment.content}</div>
      <div className="flex items-center gap-0.5 mt-1.5">
        <Button size="sm" type="button">
          <Heart />
          {comment.likes.length > 0 && (
            <span>
              {comment.likes.map((like) => (
                <span key={like.id}>1</span>
              ))}
            </span>
          )}
        </Button>
        <Button
          variant="teal"
          size="sm"
          onClick={() => setShowReplyForm((prev) => !prev)}
        >
          Reply
        </Button>
      </div>
      {showReplyForm && (
        <div className="w-full pl-8">
          <CreateCommentForm
            parentId={comment.id ?? null}
            onSubmit={onReplySubmit}
            onCancel={() => setShowReplyForm(false)}
          />
        </div>
      )}
    </div>
  );
}

export default CommentItem;
