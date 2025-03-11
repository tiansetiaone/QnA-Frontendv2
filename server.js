const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Log untuk debugging
console.log("Serving static files from:", path.join(__dirname, "build"));

// Sajikan file statis
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  const filePath = path.join(__dirname, "build", "index.html");
  console.log("Serving:", filePath);
  res.sendFile(filePath);
});

app.listen(PORT, () => {
  console.log(`Frontend running on port ${PORT}`);
});
