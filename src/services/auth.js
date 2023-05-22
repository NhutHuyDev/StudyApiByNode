const db = require('../models')

const register = () => new Promise((resolve, reject) => {
    try {
        resolve('register service')
    } catch (error) {
        reject(error)
    }
})

module.exports = { register }