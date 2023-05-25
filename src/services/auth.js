const db = require('../models')
const hashPasword = require('../utils/hashPassword')
const comparePassword = require('../utils/comparePassword')
const createToken = require('../utils/createToken')
const APIError = require('../utils/APIError')

class AuthServices {
    constructor() {
    }

    register({ role_code, name, avatar, email, password }) {
        return new Promise(async (resolve, reject) => {
            try {
                const [user, created] = await db.User.findOrCreate({
                    where: { email },
                    defaults: {
                        role_code: role_code || "R3",
                        name,
                        avatar: avatar || "/public/img/user-avatar.webp",
                        email,
                        password: hashPasword(password)
                    }
                });

                if (created) {
                    resolve({
                        code: 200,
                        message: "register successfully",
                        data: {
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                role_code: user.role_code,
                                avatar: user.avatar
                            },
                            authToken: createToken({
                                id: user.id,
                                email: user.email,
                                role_code: user.role_code
                            }, process.env.JWT_SECRET_TOKEN)
                        }
                    })
                } else {
                    throw new APIError("your email is used by other account", 400, "RegisterException")
                }
            } catch (error) {
                reject(error)
            }
        })
    }
}

// const register = ({ role_code, name, avatar, email, password }) =>

const login = ({ email, password }) => new Promise(async (resolve, reject) => {
    try {
        const user = await db.User.findOne({
            where: { email },
        });

        if (user) {
            if (comparePassword(password, user.password)) {
                resolve({
                    code: 200,
                    status: "success",
                    message: "Login Successfully",
                    data: {
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            role_code: user.role_code,
                            avatar: user.avatar
                        },
                        authToken: createToken({
                            id: user.id,
                            email: user.email,
                            role_code: user.role_code
                        }, process.env.JWT_SECRET_TOKEN)
                    }
                })
            } else {
                resolve({
                    code: 400,
                    status: "error",
                    message: "email or password is incorrect",
                    data: "InvalidAuthentication"
                })
            }
        } else {
            resolve({
                code: 400,
                status: "error",
                message: "email or password is incorrect",
                data: 'LoginException'
            })
        }
    } catch (error) {
        reject({
            code: 500,
            status: "fail",
            message: "Internal Server Error",
            data: 'LoginException'
        })
    }
})


module.exports = AuthServices