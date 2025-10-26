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
    setShowReplyForm(false); // ✅ referme le form après envoi
  };

  return (
    <div className="flex flex-col justify-between items-start gap-3 border-l pl-4 mt-3">
      {/* --- Comment principal --- */}
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="font-semibold">{comment.user.username}</span>
      </div>

      <div className="text-gray-700">{comment.content}</div>

      <div className="flex items-center gap-2 mt-1">
        <Button size="sm" variant="ghost" type="button">
          <Heart className="w-4 h-4" />
          {comment.likes?.length ? (
            <span className="ml-1 text-sm">{comment.likes.length}</span>
          ) : null}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowReplyForm((prev) => !prev)}
        >
          Reply
        </Button>
      </div>

      {/* --- Sous-commentaires --- */}
      {comment.replies && comment.replies?.length > 0 && (
        <div className="ml-6 mt-2">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              postId={postId}
              comment={reply}
              handleComment={handleComment}
            />
          ))}
        </div>
      )}

      {/* --- Formulaire de réponse --- */}
      {showReplyForm && (
        <div className="w-full mt-3 ml-6">
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
