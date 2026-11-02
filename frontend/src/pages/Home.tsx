import type { Post } from "../types";
import { useState, useEffect } from "react";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await fetch("http://127.0.0.1:5000/api/posts/all");
    const data: Post[] = await response.json();
    setPosts(data);
    console.log(data);
  };

  const updatePost = async (id: number, description: string) => {
    try {
        const options = {
            method: "PATCH",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ description }),
        };

        const response = await fetch(`http://127.0.0.1:5000/api/posts/${id}`, options)

        if (!response.ok) {
            const error = await response.json();
            alert(error.error ?? "Could not update post");
            return false;
        } 
        
        const updated: Post = await response.json();
        setPosts((prev) => prev.map((p) => (p.id ? updated : p)));
        return true;

    } catch (e) {
        alert("Network error, please try again");
        return false;
    }
  };
  
  const deletePost = async (id: number) => {
      try {
          const options = {
            method: "DELETE"
          };

          const response = await fetch(`http://127.0.0.1:5000/api/delete/${id}`, options);
          
          if (response.ok) {
            setPosts((prev) => prev.filter((p) => p.id !== id));
          } else
            console.error("Delete failed:", response.status);

      } catch (error) {
        console.error("Network error:", error);
      }
  };

  return(
    <div>
        <PostForm onCreated={(post) => setPosts((prev) => [post, ...prev])}/>
        <PostList posts={posts} onDelete={deletePost} onUpdate={updatePost}/>
    </div>
  );
}

export default Home;