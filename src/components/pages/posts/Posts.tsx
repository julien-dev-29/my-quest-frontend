import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { SendIcon } from "lucide-react";
import CreatePostForm from "./CreatePostForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import type { Post } from "@/types/types";
import {
  createPost,
  fetchPosts,
  likePost,
  unlikePost,
  createComment,
} from "@/api/api";
import PostCard from "./PostCard";
import auth from "@/store/auth";
import { useNavigate } from "react-router";

function Posts() {
  const queryClient = useQueryClient();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  useEffect(() => {
    if (
      postsQuery.error instanceof Error &&
      postsQuery.error.message === "unauthorized"
    ) {
      auth.logout();
      navigate("/auth/login");
    }
  }, [postsQuery.error, navigate]);

  const newPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setIsVisible(false);
      toast.success("Post created successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const hasLiked = (post: Post) => {
    const currentUser = auth.getUser();
    const hasLiked = !!post.likes?.some(
      (like) => like.user?.id === currentUser?.id
    );
    return hasLiked;
  };

  const likeMutation = useMutation({
    mutationFn: (post: Post) => {
      return hasLiked(post) ? unlikePost(post.id!) : likePost(post.id!);
    },
    onSuccess: (post: Post) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success(
        hasLiked(post) ? "You 👍 the post" : "You are not 👍 the post anymore"
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const commentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Comment added!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleCreatePost = (data: { content: string }) => {
    newPostMutation.mutate(data);
  };

  const handleLike = (post: Post) => {
    if (!post.id) return;
    likeMutation.mutate(post);
  };

  const handleComment = (data: {
    postId: string;
    content: string;
    parentId: string | null;
  }) => {
    commentMutation.mutate(data);
  };

  if (postsQuery.isPending) return <Spinner />;

  if (postsQuery.isError) return toast.error("Error fetching posts");

  return (
    <div className="p-5 w-full relative">
      <h1>Posts</h1>
      <div className="mt-12">
        <Button onClick={() => setIsVisible((prev) => !prev)}>
          Something to say
          <SendIcon className="w-4 h-4 mr-2" />
        </Button>
      </div>
      <div className="w-2xl flex flex-col gap-2 mt-5">
        {postsQuery.data?.posts.map((post: Post) => (
          <PostCard
            key={post.id}
            post={post}
            handleLike={handleLike}
            handleComment={handleComment}
          />
        ))}
      </div>
      {isVisible && (
        <CreatePostForm
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          onSubmit={handleCreatePost}
        />
      )}
    </div>
  );
}

export default Posts;
