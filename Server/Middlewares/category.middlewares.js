const categoryValidation = require("../Validation/category.validation");

function categoryMiddleware(req, res, next) {
  let { value, error } = categoryValidation.validate(req.body); // Payload Validation-u ödəməlidir
  if (!error) {
    next();
  }
  else{
    res.send(false)
  }
}

module.exports = categoryMiddleware ;