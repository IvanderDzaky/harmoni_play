import Song from "./Song.js";
import Artist from "./Artist.js";
import Album from "./Album.js";
import Playlist from "./Playlist.js";
import PlaylistSong from "./PlaylistSong.js";
import Comment from "./Comment.js"; 
import User from "./User.js";   

// --- Existing relationships ---
Song.belongsTo(Artist, {
  foreignKey: "artist_id",
  as: "Artist",
});

Song.belongsTo(Album, {
  foreignKey: "album_id",
  as: "Album",
});

Playlist.belongsToMany(Song, {
  through: PlaylistSong,
  foreignKey: "playlist_id",
  otherKey: "song_id",
});

Song.belongsToMany(Playlist, {
  through: PlaylistSong,
  foreignKey: "song_id",
  otherKey: "playlist_id",
});

PlaylistSong.belongsTo(Song, {
  foreignKey: "song_id",
  as: "Song",
});

PlaylistSong.belongsTo(Playlist, {
  foreignKey: "playlist_id",
  as: "Playlist",
});

Comment.belongsTo(User, { foreignKey: "user_id", as: "User" }); // Comment → User
User.hasMany(Comment, { foreignKey: "user_id" });

Comment.belongsTo(Song, { foreignKey: "song_id", as: "Song" }); // Comment → Song
Song.hasMany(Comment, { foreignKey: "song_id" });

export {
  Song,
  Artist,
  Album,
  Playlist,
  PlaylistSong,
  Comment,
  User,
};
