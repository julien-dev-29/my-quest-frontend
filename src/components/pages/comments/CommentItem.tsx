import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import CreateCommentForm from "./CreateCommentForm";
import type { Comment, Post } from "@/types/types";
import { useState } from "react";

type Props = {
  post: Post;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  comment: Comment;
};

function CommentItem({ post, setPosts, comment }: Props) {
  const [showComments, setShowComments] = useState(false);
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
      {showComments && (
        <div className="w-full">
          <CreateCommentForm
            post={post}
            setPosts={setPosts}
            setShowComments={setShowComments}
          />
        </div>
      )}
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
        <Button variant="teal" size="sm" onClick={() => setShowComments(true)}>
          Répondre
        </Button>
      </div>
    </div>
  );
}

export default CommentItem;
