import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/posts')
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    return (
        <div className="posts-container">
            <h2 className="posts-title">All Posts</h2>
            {posts.length > 0 ? (
                <ul className="post-list">
                    {posts.map(post => (
                        <li key={post._id} className="post-item">
                            <h3 className="post-title">{post.title}</h3>
                            <p className="post-body">{post.body}</p>
                            <Link to={`/post/${post._id}`} target='_blank' className="read-more-link">Read more</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No posts available.</p>
            )}
        </div>
    );
}

export default Posts;
