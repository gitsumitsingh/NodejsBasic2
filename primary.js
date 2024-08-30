import cluster from "cluster";
import os from "os";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

let cpuCount = os.cpus().length;
// cpuCount = 4;

console.log(`import.meta.url ${import.meta.url}`);
console.log(`The total number of CPUs is ${cpuCount}`);
console.log(`Primary pid=${process.pid}`);
cluster.setupPrimary({
  exec: __dirname + "/server.js",
});

for (let i = 0; i < cpuCount; i++) {
  cluster.fork();
}
cluster.on("exit", (worker, code, signal) => {
  console.log(`worker ${worker.process.pid} has been killed`);
  console.log("Starting another worker");
  cluster.fork();
});

/*

https://youtu.be/6lHvks6R6cI?si=8ay8fne3UnFsIB1z
Scaling your Node.js app using the "cluster" module

https://www.digitalocean.com/community/tutorials/how-to-scale-node-js-applications-with-clustering#step-1-setting-up-the-project-directory

--for load test cmd
npx loadtest -n 600 -c 100 -k http://localhost:7000/heavy

--Using pm2 for Clustering
pm2 start index.js -i 0

*/
