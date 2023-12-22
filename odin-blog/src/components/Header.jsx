// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="header">
            <nav className="nav">
                <ul className="nav-list">
                    <li className="nav-item"><Link to="/posts">Posts</Link></li>
                    <li className="nav-item"><Link to="/create-post">Create Post</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
