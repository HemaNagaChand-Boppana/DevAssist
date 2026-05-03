const express = require("express");
const cors = require("cors");
require("./db");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Running ✅");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});


const runRoute = require("./routes/run");
app.use("/run", runRoute);


const chatRoute = require("./routes/chat");
app.use("/chat", chatRoute);

const snippetRoute = require("./routes/snippets");
app.use("/snippets", snippetRoute);


