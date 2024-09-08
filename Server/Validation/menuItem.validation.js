const Joi = require("joi");
const weekdayValidation = require("./weekday.Validation");
const rateValidation = require("./rate.validation");

const menuItemValidation = Joi.object({
    id: Joi.number().required(),
    createDate: Joi.date().iso().required(),
    lastUpdateDate: Joi.date().iso().required(),
    name: Joi.array().items(
      Joi.object({
        value: Joi.string().required(),
        languageCode: Joi.string().required()
      })
    ).required(),
    description: Joi.array().items(
      Joi.object({
        value: Joi.string().allow(''),
        languageCode: Joi.string().required()
      })
    ).required(),
    coverImageSrc: Joi.string().required(),
    otherImagesSrc: Joi.array().items(Joi.string()).required(),
    priceSell: Joi.number().required(),
    priceCost: Joi.number().allow(null),
    placeInTheList: Joi.number().required(),
    unit: Joi.object({
      id: Joi.number().required(),
      name: Joi.string().required()
    }).required(),
    amount: Joi.number().required(),
    calories: Joi.number().required(),
    timeToMake: Joi.number().required(),
    isArchived: Joi.boolean().required(),
    rate: rateValidation.required(),
    isPublished: Joi.boolean().required(),
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
    }).required(),
    tags: Joi.array().items(Joi.string()).required(),
    modifications: Joi.array().items(Joi.string()).required()
  });

  module.exports = menuItemValidation;