import Song from "./Song.js";
import Artist from "./Artist.js";
import Album from "./Album.js";
import Playlist from "./Playlist.js";
import PlaylistSong from "./PlaylistSong.js";
import Comment from "./Comment.js";
import User from "./User.js";
import Genre from "./Genre.js";
import SongGenre from "./SongGenre.js";

/* ================= SONG ================= */
Song.belongsTo(Artist, { foreignKey: "artist_id", as: "artist" });
Artist.hasMany(Song, { foreignKey: "artist_id", as: "songs" });

Song.belongsTo(Album, { foreignKey: "album_id", as: "album" });
Album.hasMany(Song, { foreignKey: "album_id", as: "songs" });

/* ================= PLAYLIST ================= */
Playlist.belongsToMany(Song, {
  through: PlaylistSong,
  foreignKey: "playlist_id",
  otherKey: "song_id",
  as: "songs",
});

Song.belongsToMany(Playlist, {
  through: PlaylistSong,
  foreignKey: "song_id",
  otherKey: "playlist_id",
  as: "playlists",
});

/* ================= PLAYLIST SONG ================= */
PlaylistSong.belongsTo(Song, {
  foreignKey: "song_id",
  as: "song",
});

Song.hasMany(PlaylistSong, {
  foreignKey: "song_id",
  as: "playlistSongs",
});

// PlaylistSong → Playlist
PlaylistSong.belongsTo(Playlist, {
  foreignKey: "playlist_id",
  as: "playlist",
});

Playlist.hasMany(PlaylistSong, {
  foreignKey: "playlist_id",
  as: "playlistSongs",
});

/* ================= COMMENT ================= */
Comment.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(Comment, { foreignKey: "user_id", as: "comments" });

Comment.belongsTo(Song, { foreignKey: "song_id", as: "song" });
Song.hasMany(Comment, { foreignKey: "song_id", as: "comments" });

/* ================= GENRE ================= */
Song.belongsToMany(Genre, {
  through: SongGenre,
  foreignKey: "song_id",
  as: "genres",
});

Genre.belongsToMany(Song, {
  through: SongGenre,
  foreignKey: "genre_id",
  as: "songs",
});

/* ================= EXPORT ================= */
export {
  Song,
  Artist,
  Album,
  Playlist,
  PlaylistSong,
  Comment,
  User,
  Genre,
  SongGenre,
};
