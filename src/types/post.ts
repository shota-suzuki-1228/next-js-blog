export type Post = {
    id: string;
    title: string;
    content: string;
    topImage: string | null;
    author: {
        name: string;
    };
    createdAt: Date;
}

export type PostCardProps = {
    post: Post;
}