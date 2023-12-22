function Login() {
    const handleLogin = () => {
        // Perform login logic, then set login status
        localStorage.setItem("isLoggedIn", "true");
    };

    return <button onClick={handleLogin}>Login</button>;
}

export default Login;
