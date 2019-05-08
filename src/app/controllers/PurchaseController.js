const Ad = require('../models/Ad')
const User = require('../models/User')
const Purchase = require('../models/Purchase')
const PurchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')

class PurchaseController {


  // async index(req, res) {
  //   const ad = await

  //   return res.json(ad)
  // }

  async store(req, res) {
    const { ad, content } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    Queue.create(PurchaseMail.key, {
      purchaseAd: purchaseAd,
      user,
      content
    }).save()

    const purchase = await Purchase.create(req.body)

    return res.json(purchase)
  }

  async index(req, res) {
    const purchase = await Purchase.find().populate('ad')

    return res.json(purchase)
  }
}

module.exports = new PurchaseController()
