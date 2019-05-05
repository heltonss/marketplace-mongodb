const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const authConfig = require('./../../config/auth')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  const [, token] = authHeader.split(' ')

  try {
    // jwt.verify(token, authConfig.secret, () => {})
    const decode = await promisify(jwt.verify)(token, authConfig.secret)
    req.userId = decode.id
    return next()
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid', text: err })
  }
}
