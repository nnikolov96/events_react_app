const validations = {
  checkMinLength: function (text, minLength) {
    if (text.length >= minLength) {
      return [true, ""];
    } else {
      return [false, `length should be at least ${minLength} characters`];
    }
  },
};

export default validations;