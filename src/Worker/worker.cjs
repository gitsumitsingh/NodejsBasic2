const { parentPort } = require("worker_threads");
// import { parentPort } from "worker_threads";

let counter = 0;
for (let i = 0; i < 20_000_000_000; i++) {
  counter++;
}

parentPort.postMessage(counter);

/*

This file has been saved as extension as .cjs, means CommonJS in which we can user require() method.

How to use Multithreading with "worker threads" in Node.js?
https://www.youtube.com/watch?v=MuwJJrfIfsU&list=PL5Lsd0YA4OMGN86vWiW7O52izu-cTxcS3
code for above video
https://www.digitalocean.com/community/tutorials/how-to-use-multithreading-in-node-js

for practice
https://www.digitalocean.com/community/tutorials/how-to-handle-cpu-bound-tasks-with-web-workers

https://askubuntu.com/questions/741298/how-to-get-datetime-using-curl-command
cmd
curl -v https://google.com/

*/
