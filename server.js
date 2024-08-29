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

/*
https://www.digitalocean.com/community/tutorials/how-to-scale-node-js-applications-with-clustering#step-1-setting-up-the-project-directory

--for load test cmd
loadtest -n 1200 -c 200 -k http://localhost:3000/heavy

--Using pm2 for Clustering
pm2 start index.js -i 0
*/
