import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwt');

        try {
            const response = await axios.post('http://localhost:3000/posts',
                { title, body },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 201) {
                navigate('/posts');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="create-post-form">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-title"
            />
            <textarea
                placeholder="Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="form-body"
            />
            <button type="submit" className="submit-button">Create Post</button>
        </form>
    );
}

export default CreatePost;
