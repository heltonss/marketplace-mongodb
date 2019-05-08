const express = require('express')
const routes = express.Router()
const validate = require('express-validator')

const authMiddleware = require('./app/middlewares/auth')

const controllers = require('./app/controllers')

routes.post('/users', controllers.UserController.store)
routes.post('/sessions', controllers.SessionController.store)

routes.use(authMiddleware)

routes.get('/ads', controllers.AdController.index)
routes.post('/ads', controllers.AdController.store)
routes.get('/ads/:id', controllers.AdController.show)
routes.put('/ads/:id', controllers.AdController.update)
routes.delete('/ads/:id', controllers.AdController.destroy)

//purchase
routes.post('/purchases', controllers.PurchaseController.store)

routes.get('/', (req, res) => {
  res.json({ hello: 'hello world' })
})

module.exports = routes
