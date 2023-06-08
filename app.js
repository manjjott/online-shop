const express = require("express");
const authRoutes = require("./routes/auth-routes");
const path = require("path");

const app = express();

const db = require("./data/database");

// setting up 'ejs'
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
// important for the form submission
app.use(express.urlencoded({ extended: false }));

app.use(authRoutes);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Failed to connect to database !");
    console.log(error);
  });
