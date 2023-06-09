function userDetailsAreValid(email, password, name, street, postal, city) {
  return (
    email &&
    email.includes("@") &&
    password &&
    password.trim().length >= 6 &&
    name &&
    name.trim() !== "" &&
    street &&
    postal &&
    city &&
    !street.trim() !== "" &&
    !postal.trim() !== "" &&
    !city.trim() !== ""
  );
}

function emailIsConfirmed(email, confirmedEmail) {
  return email === confirmedEmail;
}

module.exports = {
  userDetailsAreValid: userDetailsAreValid,
  emailIsConfirmed: emailIsConfirmed,
};
