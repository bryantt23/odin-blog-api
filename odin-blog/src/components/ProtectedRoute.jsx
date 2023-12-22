import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const hasJwt = localStorage.getItem("jwt")

    if (!hasJwt) {
        return <Navigate to="/login" />
    }

    return children;
}

export default ProtectedRoute