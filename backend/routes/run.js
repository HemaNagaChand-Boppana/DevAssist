const express = require("express");
const fs = require("fs");
const { exec } = require("child_process");

const router = express.Router();

router.post("/", (req, res) => {
  const { code, input } = req.body;

  fs.writeFileSync("Main.java", code);

  exec("docker build -t java-runner .", (err) => {
    if (err) {
      console.log("BUILD ERROR:", err);
      return res.json({ output: "Docker build failed" });
    }

    const runCommand = `docker run --rm -i java-runner`;

    const process = exec(runCommand, (err, stdout, stderr) => {
      const output = stdout || stderr || "No output";
      res.json({ output });
    });

    // ✅ FIXED INPUT HANDLING
    if (input) {
      const formattedInput =
        input
          .split("\n")
          .map((line) => line.trim())
          .join("\n") + "\n";

      process.stdin.write(formattedInput);
    }

    process.stdin.end();
  });
});

module.exports = router;