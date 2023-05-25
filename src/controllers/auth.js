const AuthServices = require('../services/auth')
const AuthServicesInstance = new AuthServices()

const { internalServerError } = require('../middlewares/handleErrors')

const asyncErrorHandler = require('../utils/asyncErrorHandler')

const register = asyncErrorHandler(async (req, res) => {
    const { role_code, name, avatar, email, password } = req.body

    const response = await AuthServicesInstance.register({ role_code, name, avatar, email, password })

    res.json(response)

})

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const response = await services.login({ email, password })
        return res.json(response)
    } catch (error) {
        return internalServerError(req, res)
    }
}

module.exports = {
    register, login
}