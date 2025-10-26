import auth from "@/store/auth";
import type { Post } from "@/types/types";

const options = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.getToken()}`,
    }
}

export const fetchPosts = async () => {
    const res = await fetch(`http://localhost:3000/api/posts?p=${1}`, {
        headers: { Authorization: `Bearer ${auth.getToken()}` },
    });
    if (res.status === 401) {
        throw new Error("unauthorized");
    }
    return await res.json();
};

export const createPost = async (post: Post) => {
    const res = await fetch("http://localhost:3000/api/posts", {
        ...options,
        method: "POST",
        body: JSON.stringify({ ...post, userId: auth.getUserId() })
    })
    return await res.json()
}

export const likePost = async (postId: string) => {
    const res = await fetch(`http://localhost:3000/api/posts/${postId}/like`, {
        ...options,
        method: "POST",
        body: JSON.stringify({
            userId: auth.getUserId()
        })
    });
    return await res.json();
};

export const unlikePost = async (postId: string) => {
    const res = await fetch(`http://localhost:3000/api/posts/${postId}/like`, {
        ...options,
        method: "DELETE",
        body: JSON.stringify({
            userId: auth.getUserId()
        })
    });
    return await res.json();
};

export const createComment = async ({ postId, content, parentId }: {
    postId: string,
    content: string,
    parentId: string | null
}) => {
    const res = await fetch("http://localhost:3000/api/comments", {
        ...options,
        method: "POST",
        body: JSON.stringify({
            userId: auth.getUserId(),
            postId: postId,
            content: content,
            parentId: parentId ?? null
        }),
    });
    if (!res.ok) {
        throw new Error("Failed to post comment");
    }
    return await res.json();
};