import type { PostItemProps, PostListProps } from "../types"
import { useState } from "react";


const formatDate = (iso: string) => {
    return(
        new Date(iso).toLocaleString("en-US",{
        timeZone: "America/Los_Angeles",
        dateStyle: "medium",
        timeStyle: "short",
    }));}

const PostItem = ({ post, onDelete, onUpdate}: PostItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState(post.description);

    const save = async () => {
        const ok = await onUpdate(post.id, draft);
        if (ok) setIsEditing(false);
        window.location.reload();
    };

    const cancel = () => {
        setDraft(post.description);
        setIsEditing(false);
    };

    return(
        <li className="edit">
            <p><strong>Date:</strong> {formatDate(post.date)}</p>
            <p><strong>Drama:</strong> {post.drama}</p>
            {isEditing ? (
                <div>
                    <textarea 
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        rows={5}
                    />
                    <br/>
                    <button onClick={save}>Save</button>
                    <button onClick={cancel}>Cancel</button>
                </div>
                ) : (
                    <div>
                        <p><strong>Description:</strong> {post.description}</p>
                        <button onClick={() => setIsEditing(true)}>Update</button>
                        <button onClick={() => onDelete(post.id)}>Delete</button>
                    </div>
                )}
        </li>
    );
}

const PostList = ({ posts, onDelete, onUpdate }: PostListProps ) => {

    return(
        <div className="posts">
            <h2>Posts</h2>
            <ul>
                {posts.map((post) => {
                    return(
                        <PostItem
                            key={post.id}
                            post={post}
                            onDelete={onDelete}
                            onUpdate={onUpdate}
                        />
                )})}
            </ul>
        </div>
    );
}

export default PostList;