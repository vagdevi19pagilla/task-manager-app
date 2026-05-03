const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/taskapp");

app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/tasks"));

app.listen(5000, () => console.log("Server running on port 5000"));