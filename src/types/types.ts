export type User = {
    id?: string
    username: string
    email: string
    password: string
    name?: string
    bio?: string
    avatarUrl?: string
    posts?: Post[]
    comments?: Comment[]
    likes?: Like[]
    followers?: Follow[]
    following?: Follow[]
    notifications?: Notification[]
    createdAt?: Date
    updatedAt?: Date
}

export type Post = {
    id?: string
    author?: User
    content: string
    media?: Media[]
    comments?: Comment[]
    likes?: Like[]
    createdAt?: Date
    updatedAt?: Date
}

export type Comment = {
    id?: string
    post: Post
    user: User
    content: string
    parentId: string
    likes?: Like[]
    replies?: Comment[]
    createdAt: Date
}

export type Like = {
    id?: string
    user: User
    post?: Post
    comment?: Comment
    createdAt?: Date
}

export type Follow = {
    id?: string
    follower: User
    following: User
}

export type Media = {
    id?: string

}