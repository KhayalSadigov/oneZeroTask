const Joi = require("joi");

const weekdayValidation = Joi.object({
    from: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).allow(null), // 24-saatlıq format
    to: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).allow(null), // 24-saatlıq format
    isWorking: Joi.boolean().required()
  });

  module.exports = weekdayValidation;