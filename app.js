const express = require("express");
const app = express();
const recordRoutes = require("./routes/recordRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(express.json());

app.use("/patients", recordRoutes);
app.use("/users", userRoutes);

app.listen("3000", () => console.log("server is running"));
