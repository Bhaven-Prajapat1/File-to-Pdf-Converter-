const express = require("express");
const cors = require("cors");
const multer = require("multer");
const docTofileConverter = require("docx-pdf");
const path = require("path");
const app = express();

const port = 3000;

// setting cors
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

//setting storage for files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/convertFile", upload.single("file"), (req, res, next) => {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any

  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file was uploaded",
      });
    }
    //Defining output file path
    let outputPath = path.join(
      __dirname,
      "files",
      `${req.file.originalname}.pdf`
    );
    docTofileConverter(req.file.path, outputPath, function (err, result) {
      if (err) {
        return res.status(500).json({
          message: "Error in converting docx to pdf",
        });
      }
      res.download(outputPath, () => {
        console.log("File downloaded");
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.listen(port, () => {
  console.log(`Server running at: ${port}`);
});
