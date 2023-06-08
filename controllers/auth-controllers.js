function getSignup(req, res) {
    res.render("customer/auth/signup");
}

function signUp(req,res) {

}

function getLogin(req, res) {}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signUp: signUp,
};
