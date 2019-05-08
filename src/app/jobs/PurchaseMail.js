const Mail = require('../services/Mail')

class PurchaseMail {

  get key() {
    return 'PurchaseMail'
  }

  async handle(job, done) {
    const { purchaseAd, user, content } = job.data

    await Mail.sendMail({
      from: '"Helton Souza" <diego@rocketseat.com.br>',
      to: purchaseAd.author.email,
      subject: `Solicitação de compra: ${purchaseAd.title}`,
      template: 'purchase',
      context: { user, content, ad: purchaseAd }
    })
    return done();
  }
}

module.exports = new PurchaseMail();
