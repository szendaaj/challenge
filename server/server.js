const express = require("express");
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");
const fs = require("fs-extra");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function parseFile(filePath) {
const removeLineBreaks = (str) => str.replace(/(\r\n|\n|\r)/gm, "");
  const fileContent = await fs.readFile(filePath, "utf8");
  const lines = fileContent.split("\n");
  const header = removeLineBreaks(lines.shift()).split("|");
  const data = lines.map((line) => {
    const values = removeLineBreaks(line).split("|");
    const obj = {};
    header.forEach((key, index) => {
      obj[key] = values[index];
    });
    return obj;
  });
  return data;
}

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const data = await parseFile(filePath);
    await fs.writeFile("data.json", JSON.stringify(data, null, 2));
    res.send("File processed successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred processing the file.");
  }
});

app.get("/data", async (_req, res) => {
  try {
    const filePath = "./data.json";
    const fileExists = await fs.pathExists(filePath);

    if (!fileExists) {
      return res.status(404).send("File not found");
    }

    const data = await fs.readFile(filePath, "utf8");
    res.status(200).json(JSON.parse(data));
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

app.use(
  cors({
    origin: "http://localhost:3001",
  })
);

const port = process.env.PORT || 5300;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
