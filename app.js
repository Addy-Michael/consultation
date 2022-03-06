const path = require("path");
const express = require("express");
const app = express();
const recordRoutes = require("./routes/recordRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(express.json());

app.use(express.static(path.resolve("compliants")));

app.use("/patients", recordRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "compliants", "create-compliant.html"));
});

app.listen("3000", () => console.log("server is running"));

// roles should be: officer,doctor,nurse
