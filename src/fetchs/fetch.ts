import auth from "@/store/auth";
import type { Post } from "@/types/types";

export const fetchPosts = async () => {
    const res = await fetch(`http://localhost:3000/api/posts?p=${1}`, {
        headers: { Authorization: `Bearer ${auth.getToken()}` },
    });
    return await res.json();
};

export const createPost = async (post: Post) => {
    const res = await fetch("http://localhost:3000/api/posts", {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.getToken()}`,
        },
        method: "POST",
        body: JSON.stringify({ ...post, userId: auth.getUserId() }),
    })
    return res.json()
}

export const likePost = async (postId: string) => {
    const res = await fetch(`http://localhost:3000/api/posts/${postId}/like`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.getToken()}`,
        },
        method: "POST",
        body: JSON.stringify({
            userId: auth.getUserId()
        })
    });
    return res.json();
};

export const unlikePost = async (postId: string) => {
    const res = await fetch(`http://localhost:3000/api/posts/${postId}/like`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.getToken()}`,
        },
        method: "DELETE",
        body: JSON.stringify({
            userId: auth.getUserId()
        })
    });
    return res.json();
};

export const createComment = async ({ postId, content, parentId }: { postId: string, content: string, parentId?: string }) => {
    const res = await fetch("http://localhost:3000/api/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.getToken()}`,
        },
        body: JSON.stringify({
            userId: auth.getUserId(),
            postId: postId,
            content: content,
            parentId: parentId,
        }),
    });
    if (!res.ok) {
        throw new Error("Failed to post comment");
    }
    return res.json();
};