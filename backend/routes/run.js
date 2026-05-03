const express = require("express");
const fs = require("fs");
const { exec } = require("child_process");

const router = express.Router();

router.post("/", (req, res) => {
  const { code, input } = req.body;

  // write file
  fs.writeFileSync("Main.java", code);

  // compile
  exec("javac Main.java", (compileErr) => {
    if (compileErr) {
      return res.json({ output: compileErr.message });
    }

    // run
    const runProcess = exec("java Main", (err, stdout, stderr) => {
      const output = stdout || stderr || "No output";
      res.json({ output });
    });

    // pass input
    if (input) {
      const formattedInput =
        input
          .split("\n")
          .map((l) => l.trim())
          .join("\n") + "\n";

      runProcess.stdin.write(formattedInput);
    }

    runProcess.stdin.end();
  });
});

module.exports = router;