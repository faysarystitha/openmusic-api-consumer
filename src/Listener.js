const autoBind = require('auto-bind')

class Listener {
  constructor (playlistsService, mailSender) {
    this._mailSender = mailSender
    this._playlistsService = playlistsService

    autoBind(this)
  }

  async listen (message) {
    try {
      const { targetEmail, playlistId } = JSON.parse(message.content.toString())

      const playlist = await this._playlistsService.getPlaylistById(playlistId)
      const data = {
        playlist
      }
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(data))
      console.log(result)
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = Listener
