// bcrypt dotenv jsonwebtoken express nodemon cors
require("dotenv").config();

const express = require("express");
const app = express();
const routes = require("./Routes/UserRoutes");
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  }),
);

app.use(express.json()); //body-parser
// app.use(express.urlencoded({extended:true}));
app.get("/", (req, res) => {
  res.send("Backend is working ");
});
app.use("/pages", routes);

const PORT = process.env.PORT || 8888;

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
