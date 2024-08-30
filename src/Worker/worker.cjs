const { parentPort } = require("worker_threads");
// import { parentPort } from "worker_threads";

let counter = 0;
for (let i = 0; i < 20_000_000_000; i++) {
  counter++;
}

parentPort.postMessage(counter);

/*

This file has been saved as extension as .cjs, means CommonJS in which we can user require() method.

*/
