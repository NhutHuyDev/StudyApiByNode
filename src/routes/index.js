const user = require('./users')
const auth = require('./auth')
const APIError = require('../utils/APIError')
const globalErrorHandler = require('../controllers/errorHandler')

const initRoutes = (app) => {

    app.use('/api/v1/auth', auth)
    app.use('/api/v1/users', user)

    app.use('*', (req, res, next) => {
        const error = new APIError(`Cannot find ${req.originalUrl} on the server`, 404)
        next(error)
    })

    app.use(globalErrorHandler)
}

module.exports = initRoutes