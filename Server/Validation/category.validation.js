
const Joi = require("joi");
const weekdayValidation = require("./weekday.Validation");
const menuItemValidation = require("./menuItem.validation");

const categoryValidation = Joi.object({
  createDate: Joi.date().iso().required(),
  lastUpdateDate: Joi.date().iso().required(),
  isPublished: Joi.boolean().required(),
  isArchived: Joi.boolean().required(),
  placeInTheList: Joi.number().required(),
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
      sunday: weekdayValidation,
    }).allow(null),
  }).required(),
  name: Joi.array()
    .items(
      Joi.object({
        value: Joi.string().required(),
        languageCode: Joi.string().required(),
      })
    )
    .required(),
  menuItems: Joi.array().items(menuItemValidation).allow(null),
});
module.exports = categoryValidation;
