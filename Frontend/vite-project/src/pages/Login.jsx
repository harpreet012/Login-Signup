import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../Services/api";
import Input from "../Components/Input";
import Button from "../Components/Button";
import "../Styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/login", formData);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        alert(res.data.msg);
        navigate("/dashboard");
      } else {
        alert(res.data.msg);
      }
    } catch (error) {
      console.log(error);
      alert("Login Failed");
    }
  };

  return (
    <div className="container">
      <form className="card" onSubmit={handleLogin}>
        <h2>Login</h2>

        <Input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />

        <Input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
        />

        <Button title="Login" type="submit" />

        <p>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
