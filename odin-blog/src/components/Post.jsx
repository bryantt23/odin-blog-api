import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Post() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        fetch(`http://localhost:3000/post/${id}`)
            .then(response => response.json())
            .then(data => setPost(data))
            .catch(error => console.error('Error fetching post:', error));
    }, [id]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        alert(`Comment: ${comment}, Name: ${name}`);
        // Add logic here to send comment to the server if needed
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <h3>Comments</h3>
            {post.comments && post.comments.length > 0 ? (
                <ul>
                    {post.comments.map((comment, index) => (
                        <li key={index}>{comment}</li>
                    ))}
                </ul>
            ) : (
                <p>No comments.</p>
            )}
            <form onSubmit={handleCommentSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <br />
                <label>
                    Comment:
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
                </label>
                <br />
                <button type="submit">Submit Comment</button>
            </form>
        </div>
    );
}

export default Post;
