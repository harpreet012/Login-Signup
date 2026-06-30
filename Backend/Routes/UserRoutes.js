const route = require("express").Router();

const { register, login, home, dashboard } = require("../Controller/Api");

const auth = require("../Middleware/auth");

// ========================
// Public Routes
// ========================

// Register User
route.post("/register", register);

// Login User
route.post("/login", login);

// Home Page
route.get("/home", home);

// ========================
// Protected Routes
// ========================

// Dashboard (JWT Required)
route.get("/dashboard", auth, dashboard);

module.exports = route;
