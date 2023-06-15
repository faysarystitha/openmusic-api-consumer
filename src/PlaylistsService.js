const { mapDBToModel } = require('../utils/forPlaylist')
const { Pool } = require('pg')
const NotFoundError = require('../../openmusic-api/src/exceptions/NotFoundError')

class PlaylistsService {
  constructor (songsService) {
    this._pool = new Pool()
    this._songsService = songsService
  }

  async getPlaylistById (id) {
    const query = {
      text: `SELECT playlists.id, playlists.name FROM playlists
      INNER JOIN users ON users.id = playlists.owner
      WHERE playlists.id = $1
      GROUP BY playlists.id`,
      values: [id]
    }

    const result = await this._pool.query(query)
    if (!result.rowCount) throw new NotFoundError('Playlist tidak ditemukan')

    const playlist = mapDBToModel(result.rows[0])
    playlist.songs = await this._songsService.getSongsByPlaylistId(id)

    return playlist
  }
}

module.exports = PlaylistsService
