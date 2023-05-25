const handleError = (req, res) => {
    return res.json(payload)
}

const internalServerError = (req, res) => {    
    return res.json({
        code: 500,
        status: "fail",
        message: "Internal Server Error",
    })
}

module.exports = { handleError, internalServerError }
