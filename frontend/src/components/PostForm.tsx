import { useState } from "react";
import type { Post } from "../types";

interface FormProps {
    onCreated: (post: Post) => void;
}

const PostForm = ({ onCreated }: FormProps) => {

    const [drama, setDrama] = useState("");
    const [description, setDescription] = useState("");
    

    const onSubmit = async (e: any) => {
        e.preventDefault();

        const data = {
            drama,
            description
       };

       const url = "http://127.0.0.1:5000/api/posts";
       const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
       };
       
       const response = await fetch(url, options);
       if (response.status !== 201 && response.status !== 200) {
            const data = await response.json();
            alert(data.message);
       } else {
        onCreated(await response.json());
        setDescription("");
        setDrama("");
       }
    }

    return(
        <div className="post-form">
            <form onSubmit={onSubmit}>
                <label htmlFor="drama">Drama: </label>
                <br/>
                <input
                    type="text"
                    id="drama"
                    value={drama}
                    onChange={(e) => setDrama(e.target.value)}
                />
                <br/>
                <label htmlFor="description">Post: </label>
                <br/>
                <textarea
                    name="description"
                    rows={10}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <br/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default PostForm;