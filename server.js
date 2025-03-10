const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Sajikan file statis dari folder build
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Frontend running on port ${PORT}`);
});
