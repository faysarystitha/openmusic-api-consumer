const { Pool } = require('pg')
const { mapDBToModel } = require('../utils/forSongs')

class SongsService {
  constructor () {
    this._pool = new Pool()
  }

  async getSongsByPlaylistId (id) {
    const query = {
      text: `SELECT songs.* FROM songs
      INNER JOIN playlist_songs ON playlist_songs.song_id = songs.id
      WHERE playlist_songs.playlist_id = $1`,
      values: [id]
    }

    const result = await this._pool.query(query)
    if (!result.rowCount) return []

    return result.rows.map(mapDBToModel)
  }
}

module.exports = SongsService
