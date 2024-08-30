import express from "express";

const port = 7000;
const app = express();

console.log(`worker pid=${process.pid}`);

app.get("/", (req, res) => {
  let reqBody = req.body || "";
  res.send(`Hello World ${JSON.stringify(reqBody)}\n`);
  res.end();
});

app.get("/heavy", (req, res) => {
  let total = 0;
  for (let i = 0; i < 4_00_00_00_000; i++) {
    total++;
  }
  res.send(`The result of the CPU intensive task is ${total}\n`);
  res.end();
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
