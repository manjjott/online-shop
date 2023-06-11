const User = require("../models/user-model");
const authUtil = require("../util/authentication");
const validation = require("../util/validation");
const sessionFlash = require("../util/session-flash");

function getSignup(req, res) {
  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      email: "",
      confirmEmail: "",
      password: "",
      fullname: "",
      street: "",
      postal: "",
      city: "",
    };
  }
  res.render("customer/auth/signup", { inputData: sessionData });
}

async function signUp(req, res, next) {
  const enteredData = {
    email: req.body.email,
    confirmEmail: req.body["confirm-email"],
    password: req.body.password,
    fullname: req.body.fullname,
    street: req.body.street,
    postal: req.body.postal,
    city: req.body.city,
  };
  if (
    !validation.userDetailsAreValid(
      req.body.email,
      req.body.password,
      req.body.fullname,
      req.body.postal,
      req.body.street,
      req.body.city
    ) || 
    !validation.emailIsConfirmed(req.body.email, req.body["confirm-email"])
  ) {
    sessionFlash.flashDataSession(
      req,
      {
        errorMessage: "Please check your provided input!",
        ...enteredData,
      },
      function () {
        res.redirect("/signup");
      }
    );

    return;
  }

  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.postal,
    req.body.street,
    req.body.city
  );

  try {
    const existsAlready = await user.existsAlready();

    if (existsAlready) {
      sessionFlash.flashDataSession(
        req,
        {
          errorMessage: "User exists already! Try logging in instead!",
          ...enteredData,
        },
        function () {
          res.redirect("/signup");
        }
      );
      return;
    }

    await user.signup();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/login");
}

function getLogin(req, res, next) {
  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      email: "",
      password: "",
    };
  }

  res.render("customer/auth/login", { inputData: sessionData });
}

async function login(req, res) {
  const user = new User(req.body.email, req.body.password);
  let existingUser;
  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    next(error);
    return;
  }

  if (!existingUser) {
    sessionFlash.flashDataSession(
      req,
      {
        errorMessage:
          "Invalid credentials - please double-check your email and password!",
        email: user.email,
        password: user.password,
      },
      function () {
        res.redirect("/login");
      }
    );
    return;
  }

  const IsPasswordCorrect = await user.comparePassword(existingUser.password);

  if (!IsPasswordCorrect) {
    sessionFlash.flashDataSession(
      req,
      {
        errorMessage:
          "Invalid credentials - please double-check your email and password!",
        email: user.email,
        password: user.password,
      },
      function () {
        res.redirect("/login");
      }
    );
    return;
  }

  authUtil.createUserSession(req, existingUser, function () {
    res.redirect("/");
  });
}

function logout(req, res) {
  authUtil.destroyUserAuthSession(req);
  res.redirect("/login");
}
module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signUp: signUp,
  login: login,
  logout: logout,
};
