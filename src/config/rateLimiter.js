const rateLimiter = require('express-rate-limit')

const limiter = rateLimiter({
    windowMs: 20 * 60 * 1000,
    max: 30,
    message: "Você ultrapassou o limite de requisições"
})

module.exports = limiter