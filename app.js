const express = require("express");
const authRoutes = require("./routes/auth-routes");
const baseRoutes = require("./routes/base-routes");
const productRoutes = require("./routes/product-route");
const adminRoutes = require("./routes/admin-routes");
const cartRoutes = require("./routes/cart-routes");
const ordersRoutes = require("./routes/orders-routes");
const protectRoutesMiddleware = require("./middleware/protect-routes");
const cartMiddleware = require("./middleware/cart-middleware");
const path = require("path");
const csrf = require("csurf");
const expressSession = require("express-session");
const notFoundMiddleware = require("./middleware/not-found");


const app = express();

const createSessionConfig = require("./config/session");
const db = require("./data/database");

const addCSRFTokenMiddleware = require("./middleware/csrf-token");
const errorHandlerMiddleware = require("./middleware/error-handler");
const checkAuthMiddleware = require("./middleware/check-auth-status");
const updateCartMiddleware = require("./middleware/update-cart-prices");

// setting up 'ejs'
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use("/products/assets", express.static("product-data"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Session
const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));

//Secruity
app.use(csrf());


app.use(cartMiddleware);
app.use(updateCartMiddleware);

//Authorization Middleware
app.use(addCSRFTokenMiddleware);
app.use(checkAuthMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productRoutes);

app.use("/cart", cartRoutes);
app.use("/orders", ordersRoutes);
app.use("/orders",protectRoutesMiddleware.protectRoutes, ordersRoutes); 
app.use("/admin", protectRoutesMiddleware.protectRoutes,adminRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Failed to connect to database !");
    console.log(error);
  });
