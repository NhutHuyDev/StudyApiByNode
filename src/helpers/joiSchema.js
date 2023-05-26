const joi = require('joi')

const email = joi.string().regex(RegExp('[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+')).required()

// Minimum eight characters, at least one letter and one number
const password = joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required()

module.exports = { email, password }