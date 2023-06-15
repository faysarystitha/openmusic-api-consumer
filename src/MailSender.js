const nodemailer = require('nodemailer')
const config = require('../utils/config')

class MailSender {
  constructor () {
    this._transporter = nodemailer.createTransport({
      host: config.mail.host,
      port: config.mail.port,
      auth: {
        user: config.mail.address,
        pass: config.mail.pass
      }
    })
  }

  sendEmail (targetEmail, content) {
    const message = {
      from: 'Open Music App',
      to: targetEmail,
      subject: 'Eksport lagu',
      text: 'Terlampir hasil',
      attachments: [
        {
          content
        }
      ]
    }

    return this._transporter.sendMail(message)
  }
}

module.exports = MailSender
