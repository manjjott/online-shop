const express = require("express");
const authRoutes = require("./routes/auth-routes");
const baseRoutes = require("./routes/base-routes");
const productRoutes = require("./routes/product-route");
const adminRoutes = require("./routes/admin-routes");
const protectRoutesMiddleware = require("./middleware/protect-routes");
const path = require("path");
const csrf = require("csurf");
const expressSession = require("express-session");

const app = express();

const createSessionConfig = require("./config/session");
const db = require("./data/database");

const addCSRFTokenMiddleware = require("./middleware/csrf-token");
const errorHandlerMiddleware = require("./middleware/error-handler");
const checkAuthMiddleware = require("./middleware/check-auth-status");

// setting up 'ejs'
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use("/products/assets", express.static("product-data"));
app.use(express.urlencoded({ extended: false }));

//Session
const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));
//Secruity
app.use(csrf());
app.use(addCSRFTokenMiddleware);

//Authorization Middleware
app.use(checkAuthMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productRoutes);
app.use(protectRoutesMiddleware.protectRoutes); //middleware
app.use("/admin", adminRoutes);

app.use(errorHandlerMiddleware);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Failed to connect to database !");
    console.log(error);
  });
