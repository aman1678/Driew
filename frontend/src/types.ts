export interface Post {
    id: number;
    drama: string;
    date: string;
    description: string;
}

interface PostActions {
    onDelete: (id: number) => void;
    onUpdate: (id:number, description: string) => Promise<boolean>;
}

export interface PostListProps extends PostActions {
    posts: Post[];
}

export interface PostItemProps extends PostActions {
    post: Post;
}
