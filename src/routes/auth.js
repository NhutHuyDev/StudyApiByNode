const controllers = require('../controllers')

const router = require('express').Router()

router.post('/login', controllers.login)

router.post('/register', controllers.register)

module.exports = router

