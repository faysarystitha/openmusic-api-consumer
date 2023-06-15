require('dotenv').config()
const amqp = require('amqplib')
const MailSender = require('./MailSender')
const Listener = require('./Listener')
const PlaylistsService = require('./PlaylistsService')
const SongsService = require('./SongsService')
const config = require('../utils/config')

const init = async () => {
  const mailSender = new MailSender()
  const songsService = new SongsService()
  const playlistsService = new PlaylistsService(songsService)
  const listener = new Listener(playlistsService, mailSender)

  const connection = await amqp.connect(config.rabbitMq.server)
  const channel = await connection.createChannel()

  await channel.assertQueue('export:songs', {
    durable: true
  })

  channel.consume('export:songs', listener.listen, { noAck: true })
}

init()
