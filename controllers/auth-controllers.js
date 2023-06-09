const User = require("../models/user-model");
const authUtil = require("../util/authentication");

function getSignup(req, res) {
  res.render("customer/auth/signup");
}

async function signUp(req, res,next) {
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.postal,
    req.body.street,
    req.body.city
  );

  try {
    await user.signup();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/login");
}

function getLogin(req, res,next) {
  res.render("customer/auth/login");
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
    res.redirect("/login");
    return;
  }

  const IsPasswordCorrect = await user.comparePassword(existingUser.password);

  if (!IsPasswordCorrect) {
    res.redirect("/login");
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
