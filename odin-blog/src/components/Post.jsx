import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Post() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState('');
    const [author, setAuthor] = useState('');

    useEffect(() => {
        getPost()
    }, [id]);

    const getPost = () => {
        fetch(`http://localhost:3000/post/${id}`)
            .then(response => response.json())
            .then(data => setPost(data))
            .catch(error => console.error('Error fetching post:', error));
    }

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        // Add logic here to send comment to the server if needed
        const url = `http://localhost:3000/post/${id}/comment`
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ body: comment, author })
        })
        getPost()
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="post-container">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-body">{post.body}</p>
            <h3>Comments</h3>
            {post.comments && post.comments.length > 0 ? (
                <ul className="comments-list">
                    {post.comments.map(({ body, author }, index) => (
                        <li key={index} className="comment-item">
                            <span className="comment-author">{author}</span>:
                            <span className="comment-body">{body}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No comments.</p>
            )}
            <form onSubmit={handleCommentSubmit} className="comment-form">
                <label>
                    Name:
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </label>
                <label>
                    Comment:
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
                </label>
                <button type="submit">Submit Comment</button>
            </form>
        </div>
    );
}

export default Post;
