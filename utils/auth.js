const passwordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);

const emailRegex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export const validatePasswordOrReturnError = (input, toCheck = true) => {
  if (input && passwordRegex.test(input)) {
    return "";
  }
  if (input.length === 0) {
    return "Please enter the password";
  }
  if (!isAtLeastEightChars(input) && toCheck) {
    return "Password must have at least eight characters";
  }

  return "";
};

export const validateEmailOrReturnError = (input) => {
  if (!emailRegex.test(input) || input.length > 100) {
    return "Invalid email address";
  }

  return "";
};

// Only validates length min 8 characters
export const isAtLeastEightChars = (input) => {
  return input.length >= 8;
};

// Only validates for containing at least one lowercase letter
const lowercaseRegex = new RegExp("^(?=.*[a-z])");
export const hasLowerCaseLetter = (input) => {
  return lowercaseRegex.test(input);
};

// Only validates for containing at least one uppercase letter
const uppercaseRegex = new RegExp("^(?=.*[A-Z])");
export const hasUpperCaseLetter = (input) => {
  return uppercaseRegex.test(input);
};

// Only validates for containing special character
const specialCharRegex = new RegExp("^(?=.*[!@#$%^&*])");
export const hasSpecialCharacter = (input) => {
  return specialCharRegex.test(input);
};

// Only validates for containing digits
const digitRegex = new RegExp("^(?=.*[0-9])");
export const hasDigit = (input) => {
  return digitRegex.test(input);
};
