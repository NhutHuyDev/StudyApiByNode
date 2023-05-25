const controllers = require('../controllers')

const router = require('express').Router()

router.get('/', controllers.getUsers)

module.exports = router

