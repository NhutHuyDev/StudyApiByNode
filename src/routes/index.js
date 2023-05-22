const user = require('./users')
const auth = require('./auth')

const initRoutes = (app) => {

    app.use('/api/v1/auth', auth)
    app.use('/api/v1/users', user)

    return app.use('/', (req, res) => {
        return res.send('Server on')
    })
}

module.exports = initRoutes