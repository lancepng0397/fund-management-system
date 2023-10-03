const Joi = require('joi')

module.exports = {
    register (req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,16}$')
            )
        })

        const {error, value} = schema.validate(req.body)

        if (error) {
            switch (error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error: 'You must use a valid email address'
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: `The password that was used failed to match the following rules:
                            <br>
                            1. It must contain ONLY the following characters: lower case, upper case, numerics
                            <br>
                            2. It must be at least 8 characters in length and not greater than 16 characters in length
                        `
                    })
                default:
                    res.status(400).send({
                        error: 'Invalid registration'
                    })
            }
        } else {
            next()
        }
    }
}