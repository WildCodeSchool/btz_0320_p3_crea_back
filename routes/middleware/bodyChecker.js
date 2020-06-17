const bodyChecker = (keysToValidate) => (req, res, next) => {
  const {
    lastName,
    firstName,
    email,
    password,
    localisation,
    phone_number
  } = req.body;
  if (req.body) {
    if (firstName && lastName && email && password && localisation && phone_number) {
      next();
    } else {
      res.status(422).json({
        status: "Incomplete",
        message: "All fields should be filled",
      });
    }
  } else {
    res.status(422).json({
      status: "Incomplete",
      message: "Please fill all fields",
    });
  }
};

module.exports = bodyChecker;
