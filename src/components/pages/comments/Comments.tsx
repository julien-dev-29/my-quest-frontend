import { CardContent } from "@/components/ui/card";
import type { Post } from "@/types/types";
import CommentItem from "./CommentItem";

type Props = {
  post: Post;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};

function Comments({ post, setPosts }: Props) {
  return (
    <CardContent className="flex flex-col gap-4">
      {post.comments?.map((comment) => (
        <CommentItem post={post} setPosts={setPosts} comment={comment}/>
      ))}
    </CardContent>
  );
}

export default Comments;
