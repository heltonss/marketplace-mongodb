const Ad = require('../models/Ad')

class AdController {
  async index(req, res) {
    const filters = {}

    if (req.query.price_min || req.query.price_max) {
      filters.price = {}

      if (req.query.price_min) {
        filters.price.$gte = req.query.price_min
      }

      if (req.query.price_max) {
        filters.price.$lte = req.query.price_max
      }
    }

    if (req.query.title) {
      filters.title = new RegExp(req.query.title, 'i')
    }

    const ads = await Ad.paginate(filters, {
      paginate: req.query.page || 1,
      limit: 20,
      populate: ['author'],
      sort: '-createdAt'
    })

    return res.json(ads)
  }

  async store(req, res) {
    const ad = await Ad.create({ ...req.body, author: req.userId })
    return res.json(ad)
  }
}

module.exports = new AdController();
