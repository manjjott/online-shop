const express = require("express");
const authRoutes = require("./routes/auth-routes");
const path = require("path");

const app = express();

// setting up 'ejs'
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(authRoutes);

app.listen(3000);
