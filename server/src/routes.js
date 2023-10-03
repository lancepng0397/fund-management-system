const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const FundsController = require('./controllers/FundsController')

module.exports = (app) => {
    app.post('/register',
        AuthenticationControllerPolicy.register,
        AuthenticationController.register)
    app.post('/login',
        AuthenticationController.login)
    
    app.get('/funds',
        FundsController.index)
    app.post('/funds',
        FundsController.post)

    app.get('/funds/:fundSlug', FundsController.getBySlug);
}
