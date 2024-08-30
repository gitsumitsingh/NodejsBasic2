import express from "express";
import { Worker } from "worker_threads";
import { __dirname } from "../../config.js";

const app = express();
const port = process.env.PORT || 8000;

app.get("/non-blocking/", (req, res) => {
  res.status(200).send("This page is non-blocking");
});

app.get("/blocking", async (req, res) => {
  const fileName = __dirname + "/src/Worker/worker.cjs";
  const worker = new Worker(fileName);
  worker.on("message", (data) => {
    res.status(200).send(`result is ${data}`);
  });
  worker.on("error", (msg) => {
    res.status(404).send(`An error occurred: ${msg}`);
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
