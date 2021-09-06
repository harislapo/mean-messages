const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/images", express.static(path.join("images")));

mongoose
  .connect(
    "mongodb+srv://username:" +
      process.env.MONGO_ATLAS_PW +
      "mongo db url",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
