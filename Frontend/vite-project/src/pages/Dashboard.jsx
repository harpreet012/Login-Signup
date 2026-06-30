import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Services/api";
import Navbar from "../Components/Navbar";
import "../Styles/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      try {
        const res = await API.get("/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMessage(res.data.msg);
      } catch (error) {
        console.log(error);
        alert("Unauthorized");
        navigate("/");
      }
    };

    fetchDashboard();
  }, [navigate]);

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <div className="dashboard-card">
          <h1>Dashboard</h1>

          <p>{message}</p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
