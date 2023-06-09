const express = require("express");
const authRoutes = require("./routes/auth-routes");
const path = require("path");
const csrf = require("csurf");
const expressSession = require('express-session');

const app = express();

const createSessionConfig = require('./config/session');
const db = require("./data/database");



const addCSRFTokenMiddleware = require("./middleware/csrf-token");
const errorHandlerMiddleware = require("./middleware/error-handler");

// setting up 'ejs'
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

//Session
const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
//Secruity
app.use(csrf());
app.use(addCSRFTokenMiddleware);



app.use(authRoutes);

app.use(errorHandlerMiddleware);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Failed to connect to database !");
    console.log(error);
  });
