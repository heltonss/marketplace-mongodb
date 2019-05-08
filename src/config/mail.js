module.exports = {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.REDIS_HOST,
    pass: process.env.MAIL_PORT
  }
}
