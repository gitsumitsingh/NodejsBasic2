import express, { Router } from "express";
import multer from "multer";
// const router = express.Router();
import cloudinary from "cloudinary";
import path from "path";
import { fileURLToPath } from "url";

// Get the current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//create profile route
const profileHandler = Router();

//setup multer
const storage = multer.diskStorage({
  destination: "./src/Public/Uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

// const storage = multer.memoryStorage();
// const singleUpload = multer({ storage }).single("photo");
// const upload = multer({ dest: "uploads/" });

profileHandler.route("/").post((req, res) => {
  try {
    var reqBody = req.body;

    res.json({
      result: "done",
      filePath: reqBody,
    });
    res.end();
  } catch (error) {
    console.error("Error in profileupload: ", req.url, error);
    res.end();
  }
});

// Route to render the HTML file
profileHandler.route("/file").get((req, res) => {
  try {
    res.sendFile(path.join(__dirname, "../Public", "index.html"));
  } catch (error) {
    console.error("Error in profileupload: ", req.url, error);
    res.end();
  }
});

/**
 * Author : Sumit Singh
 * Date : 15-Mar-2025
 * Scope : This service created to upload image file on cloud
 */
profileHandler
  .route("/profileupload")
  .post(upload.single("image"), (req, res) => {
    try {
      var resUpload = "";
      console.log("uploaded image file ", req.file);

      cloudinary.v2.uploader.upload(
        req.file.path,
        {
          folder: "NodeBasic2",
          overwrite: true,
          public_id: "profileupload",
        },
        (err, result) => {
          resUpload = err ? err : result;
          console.log("result: ", resUpload);
          res.json({
            result: "done_cloud_upload",
            fileInfo: resUpload,
          });

          res.end();
        }
      );
    } catch (error) {
      console.error("Error in upload: ", req.url, error);
      res.end();
    }
  });

export default profileHandler;
// export { profileHandler };
