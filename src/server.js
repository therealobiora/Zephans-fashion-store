import express from "express";
import path from "path";

const app = express();

// Serve static images
app.use("/images", express.static(path.join(__dirname, "../public/images")));

app.listen(5000, () => console.log("Server running on port 5000"));
