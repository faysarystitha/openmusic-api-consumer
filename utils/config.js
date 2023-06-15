const config = {
  rabbitMq: {
    server: process.env.RABBITMQ_SERVER
  },
  mail: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    address: process.env.MAIL_ADDRESS,
    pass: process.env.MAIL_PASSWORD
  }
}

module.exports = config
