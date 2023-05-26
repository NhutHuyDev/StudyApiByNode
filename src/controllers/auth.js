const AuthServices = require('../services/auth')
const AuthServicesInstance = new AuthServices()

const asyncErrorHandler = require('../utils/asyncErrorHandler')

const joi = require('joi')
const { email, password } = require('../helpers/joiSchema')
const APIError = require('../utils/APIError')

const register = asyncErrorHandler(async (req, res) => {
    const { error } = joi.object({ email, password }).validate(req.body, { allowUnknown: true })

    if (error) {
        throw new APIError(error.message, 404, 'RegisterException')
    }

    const response = await AuthServicesInstance.register(req.body)

    res.json(response)

})

const login = asyncErrorHandler(async (req, res) => {
    const response = await AuthServicesInstance.login(req.body)

    return res.json(response)
})

module.exports = {
    register, login
}