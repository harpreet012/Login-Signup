import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../Services/api";
import Input from "../Components/Input";
import Button from "../Components/Button";
import "../Styles/signup.css";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      const res = await API.post("/register", {
        email: formData.email,
        password: formData.password,
      });

      alert(res.data.msg);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Signup Failed");
    }
  };

  return (
    <div className="container">
      <form className="card" onSubmit={handleSignup}>
        <h2>Signup</h2>

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

        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <Button title="Signup" type="submit" />

        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
