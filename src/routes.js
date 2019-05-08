const express = require('express')
const routes = express.Router()
const validate = require('express-validation')
const handle = require('express-async-handler')

const authMiddleware = require('./app/middlewares/auth')
const validators = require('./app/validators')
const controllers = require('./app/controllers')

routes.post('/users', validate(validators.User), handle(controllers.UserController.store))
routes.post('/sessions', validate(validators.Session), handle(controllers.SessionController.store))

routes.use(authMiddleware)

// ads
routes.get('/ads', handle(controllers.AdController.index))
routes.post('/ads', validate(validators.Ad), handle(controllers.AdController.store))
routes.get('/ads/:id', handle(controllers.AdController.show))
routes.put('/ads/:id', validate(validators.Ad), handle(controllers.AdController.update))
routes.delete('/ads/:id', handle(controllers.AdController.destroy))

// purchase
routes.post('/purchases', validate(validators.Purchase), handle(controllers.PurchaseController.store))
routes.get('/purchases', handle(controllers.PurchaseController.index))

routes.get('/', (req, res) => {
  res.json({ hello: 'hello world' })
})

module.exports = routes
