import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Posts from './components/Posts';
import Post from './components/Post';
import CreatePost from './components/CreatePost';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/posts" element={<Posts />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/create-post" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
