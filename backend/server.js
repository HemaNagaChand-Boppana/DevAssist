const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db");

const app = express();

//  allow your frontend domain
app.use(cors({
  origin: "https://dev-assist-ruby.vercel.app"
}));

app.use(express.json());

// health check
app.get("/", (req, res) => {
  res.send("Backend Running ");
});

// routes
const runRoute = require("./routes/run");
app.use("/run", runRoute);

const chatRoute = require("./routes/chat");
app.use("/chat", chatRoute);

const snippetRoute = require("./routes/snippets");
app.use("/snippets", snippetRoute);

// important for render
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});