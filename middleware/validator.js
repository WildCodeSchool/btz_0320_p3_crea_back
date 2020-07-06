const Joi = require("@hapi/joi");

const postForPut = Joi.object({
  title: Joi.string(),
  content: Joi.string(),
  localisation: Joi.string(),
  language: Joi.string(),
  UserId : Joi.string().guid({ version: "uuidv4" }),
  TypePostId: Joi.string().guid({ version: "uuidv4" }),
  JobCategoryId: Joi.string().guid({ version: "uuidv4" })
})


const validator = (schema, propToValidate) => async (req, res, next) => {
  try {
    await schema.validateAsync(req[propToValidate], {abortEarly: false})
    next()
  } catch(err) {
    const errors = err.details.map(err => ({
      message: err.message,
      type: err.type
    }))
    res.status(422).json({
      status: 422,
      message : err.message,
      errors,
    })
  }
}

module.exports = {
  validator,
  postForPut
}