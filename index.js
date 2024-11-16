const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// const corsOptions = {
//   origin : 'http://localhost:5173',
//   method : 'GET, POST, PUT, DELETE',
//   allowedHeaders: 'Content-Type, authorization'
// }
// app.use(cors(corsOptions))

app.use(express.static(path.join(__dirname, "./client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});
// Routes
app.use("/api/v1/user", require("./routes/user.routes.js"));
app.use("/api/v1/product", require("./routes/product.routes.js"));

//port
const port = process.env.PORT || 8080;
//listen port

app.listen(port, () => {
  console.log(`Server Running in on port ${process.env.PORT}`);
});
