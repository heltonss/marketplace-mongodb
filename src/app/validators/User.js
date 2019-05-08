const joi = require('joi')

module.exports = {
  body: {
    name: joi.string().required(),
    password: joi.string().required().min(6)
  }
}
