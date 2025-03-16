import express from "express";
import cloudinary from "cloudinary";
// import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./src/RouteHandlers/routes.js";

// Get the current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Config eng file
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "./config.env" });
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
}

const port = process.env.PORT || 7000;
const app = express();

console.log(`worker pid=${process.pid}`);

// set the cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Log the cloudinary configuration
console.log("cloudinary config: ", cloudinary.config());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "./src/Public")));

// USE HANDLERS
app.use(express.json());

////do not use fileUpload() from "express-fileupload" when using multer
// app.use(fileUpload());
// app.use(fileUpload({ useTempFiles: true }));

// IMPORT ROUTE HANDLERS
app.use("/", routes);

app.get("/", (req, res) => {
  res.send("Service is running");
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

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
