const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const saltRound = 10;
const secretKey = "acharya";

const filePath = path.join(__dirname, "../Data/users.json");

// Register
const register = (req, res) => {
  const data = req.body;

  let users = [];

  if (fs.existsSync(filePath)) {
    users = JSON.parse(fs.readFileSync(filePath, "utf8"));
  }

  const account = users.find((item) => item.email === data.email);

  if (account) {
    return res.send({
      msg: "This email already exists",
    });
  }

  data.password = bcrypt.hashSync(data.password, saltRound);

  users.push(data);

  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  const token = jwt.sign(
    {
      user: data.email,
    },
    secretKey,
    {
      expiresIn: "365d",
    }
  );

  res.send({
    msg: "User Registered Successfully",
    token,
  });
};

// Login
const login = async (req, res) => {
  const data = req.body;

  let users = [];

  if (fs.existsSync(filePath)) {
    users = JSON.parse(fs.readFileSync(filePath, "utf8"));
  }

  const account = users.find((item) => item.email === data.email);

  if (!account) {
    return res.send({
      msg: "User is not registered",
    });
  }

  const checkPassword = await bcrypt.compare(
    data.password,
    account.password
  );

  if (!checkPassword) {
    return res.send({
      msg: "Password is incorrect",
    });
  }

  const token = jwt.sign(
    {
      user: account.email,
    },
    secretKey,
    {
      expiresIn: "365d",
    }
  );

  res.send({
    msg: "User Logged in Successfully",
    token,
  });
};

// Home
const home = (req, res) => {
  res.send({
    message: "This is Home Page",
  });
};

// Dashboard
const dashboard = (req, res) => {
  res.send({
    msg: "Welcome to Dashboard",
  });
};

module.exports = {
  register,
  login,
  home,
  dashboard,
};