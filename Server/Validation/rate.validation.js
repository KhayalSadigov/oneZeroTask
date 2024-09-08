const Joi = require("joi");
const weekdayValidation = require("./weekday.Validation");

const rateValidation = Joi.object({
    isFixed: Joi.boolean().required(),
    amount: Joi.number().required(),
    isEnabled: Joi.boolean().required(),
    schedule: Joi.object({
      from: Joi.date().iso().allow(null),
      to: Joi.date().iso().allow(null),
      isActive: Joi.boolean().allow(null),
      weekdays: Joi.object({
        monday: weekdayValidation,
        tuesday: weekdayValidation,
        wednesday: weekdayValidation,
        thursday: weekdayValidation,
        friday: weekdayValidation,
        saturday: weekdayValidation,
        sunday: weekdayValidation
      }).allow(null)
    }).required()
  });

  module.exports = rateValidation;