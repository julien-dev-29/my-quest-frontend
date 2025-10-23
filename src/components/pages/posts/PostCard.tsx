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
import { toast } from "sonner";
import CreateCommentForm from "../comments/CreateCommentForm";
import Comments from "../comments/Comments";

type Props = {
  post: Post;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};

function PostCard({ post, setPosts }: Props) {
  const [showComments, setShowComments] = useState<boolean>(false);
  const currentUser = auth.getUser();
  const hasLiked = !!post.likes?.some(
    (like) => like.user?.id === currentUser?.id
  );
  const handleLike = async () => {
    if (!currentUser) {
      toast.error("Vous devez être connecté pour aimer un post.");
      return;
    }
    setPosts((prev) =>
      prev.map((p) =>
        p.id === post.id
          ? {
              ...p,
              likes: hasLiked
                ? p.likes?.filter((like) => like.user?.id !== currentUser.id)
                : [...(p.likes || []), { user: currentUser, post }],
            }
          : p
      )
    );

    try {
      const res = await fetch(
        `http://localhost:3000/api/posts/${post.id}/like`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.getToken()}`,
          },
          method: hasLiked ? "DELETE" : "POST",
          body: JSON.stringify({ userId: currentUser.id }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur lors du like");

      toast.success(hasLiked ? "Like retiré 👍" : "Post liké ❤️");
    } catch (err) {
      console.error(err);
      toast.error("Une erreur est survenue.");
    }
  };

  const likesCount = post.likes?.length || 0;
  const commentsCount = post.comments?.length || 0;

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
            <Button variant="secondary" size="icon" onClick={handleLike}>
              <ThumbsUpIcon
                className={`w-4 h-4 transition-transform ${
                  hasLiked ? "text-blue-600 scale-110" : ""
                }`}
              />
            </Button>
          </div>
        </div>
      </CardFooter>
      {showComments && (
        <div>
          <Comments post={post} setPosts={setPosts} />
          <CreateCommentForm
            post={post}
            setPosts={setPosts}
            setShowComments={setShowComments}
          />
        </div>
      )}
    </Card>
  );
}

export default PostCard;
