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
        <div>
            <h2>All Posts</h2>
            {posts.length > 0 ? (
                <ul>
                    {posts.map(post => (
                        <li key={post._id}>
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                            <Link to={`/post/${post._id}`}>Read more</Link>
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
