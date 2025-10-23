import { Button } from "@/components/ui/button";

import auth from "@/store/auth";
import type { Post } from "@/types/types";
import { useEffect, useState } from "react";

import { SendIcon } from "lucide-react";
import CreatePostForm from "./CreatePostForm";
import PostCard from "./PostCard";
import { useNavigate } from "react-router";

function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [currentPage] = useState<number>(1);
  const navigate = useNavigate();
  const token = auth.getToken();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/posts?p=${currentPage}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.status === 401) {
          auth.logout();
          navigate("/auth/login");
        }
        const data = await res.json();
        setPosts(data.posts);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, [currentPage, token, navigate]);
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
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            posts={posts}
            setPosts={setPosts}
          />
        ))}
      </div>
      {isVisible && (
        <CreatePostForm
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          setPosts={setPosts}
        />
      )}
    </div>
  );
}

export default Posts;
