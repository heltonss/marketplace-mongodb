const express = require('express')
const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const controllers = require('./app/controllers')

routes.post('/users', controllers.UserController.store)
routes.get('/users', authMiddleware, (req, res) => res.json({ ok: true }))
routes.post('/sessions', controllers.SessionController.store)

routes.get('/', (req, res) => {
  res.json({ hello: 'hello world' })
})

module.exports = routes
