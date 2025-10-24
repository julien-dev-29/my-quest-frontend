import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import auth from "@/store/auth";
import type { Post } from "@/types/types";
import { MessageCircle, ThumbsUpIcon } from "lucide-react";
import { useState } from "react";
import Comments from "../comments/Comments";
import CreateCommentForm from "../comments/CreateCommentForm";

type Props = {
  post: Post;
  handleLike: (post: Post) => void;
  handleComment: (data: {
    postId: string;
    content: string;
    parentId: string | null;
  }) => void;
};

function PostCard({ post, handleLike, handleComment }: Props) {
  const [showComments, setShowComments] = useState<boolean>(false);
  const currentUser = auth.getUser();
  const hasLiked = !!post.likes?.some(
    (like) => like.user?.id === currentUser?.id
  );
  const likesCount = post.likes?.length || 0;
  const commentsCount = post.comments?.length || 0;

  const onCommentSubmit = (data: { content: string }, parentId: string) => {
    if (!post.id) return;
    handleComment({
      postId: post.id,
      content: data.content,
      parentId: parentId,
    });
    setShowComments(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-start space-x-2 items-center">
          <Avatar className="rounded-lg">
            <AvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
            />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
          <div>{post.author?.username}</div>
        </div>
      </CardHeader>

      <CardContent>{post.content}</CardContent>

      <CardFooter>
        <div className="flex justify-between w-full items-center">
          <div className="flex gap-3 text-sm text-gray-500">
            <div>
              {commentsCount > 0 ? `${commentsCount} comments` : "No comments"}
            </div>
            <div>
              {likesCount > 0
                ? `${likesCount} like${likesCount === 1 ? "" : "s"}`
                : "No likes"}
            </div>
          </div>

          <div className="space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowComments((prev) => !prev)}
            >
              <MessageCircle className="w-4 h-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => handleLike(post)}
            >
              <ThumbsUpIcon
                className={`w-4 h-4 transition-transform ${
                  hasLiked ? "text-blue-600 scale-110" : ""
                }`}
              />
            </Button>
          </div>
        </div>
      </CardFooter>
      {showComments && post.id && (
        <div>
          <Comments post={post} handleComment={handleComment} />
          <CreateCommentForm
            parentId={null}
            onSubmit={onCommentSubmit}
            onCancel={() => setShowComments(false)}
          />
        </div>
      )}
    </Card>
  );
}

export default PostCard;
