import React, { useState , useContext} from "react";
import "./LoginPage.css"
import api from "../../api";
import Error from "../ui/Error";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";


const LoginPage = () => {

  const {setIsAuthenticated, get_username} = useContext(AuthContext)

    const location = useLocation()
    const navigate= useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword]= useState("")
    const[loading, setLoading]= useState(false)
    const [error, setError]= useState("")


    
   function handleSubmit(e){
    e.preventDefault();

    if (!username || !password) {
        setError("Please fill all fields");
        return;
    }

    setError("");
    setLoading(true);

    api.post("/token/", { username, password })
    .then(res => {
        const { access, refresh } = res.data;

        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);

        setIsAuthenticated(true);

        setUsername("");
        setPassword("");
        get_username()

        const from = location?.state?.from?.pathname || "/";
        navigate(from, { replace: true });
    })
    .catch(err => {
        const message =
            err.response?.data?.detail ||
            "Invalid username or password";

        setError(message);
    })
    .finally(() => {
        setLoading(false);
    });

    }
  return (
    <div className="login-container my-5">
      <div className="login-card shadow">
        {error && <Error error={error}/>}
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Please login to your account</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e)=> setUsername(e.target.value)}
              id="username"
              placeholder="Enter username"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              id="password"
              placeholder="Enter password"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            Login
          </button>
        </form>

        <div className="login-footer">
          <p>
            <a href="#">Forgot Password?</a>
          </p>
          
         <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;