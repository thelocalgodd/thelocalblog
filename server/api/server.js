const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database Connection Successful");
  })
  .catch((error) => {
    console.log("Database Connection Failed", error);
  });

// routess
app.get("/", (req, res) => {
  res.json({ message: "hello my niggur" });
});

const postsRouter = require("../routes/post.route");
app.use("/api", postsRouter);

// create server
app.listen(PORT, () => {
  console.log("Server is Up and Running on http://localhost:" + PORT);
});
