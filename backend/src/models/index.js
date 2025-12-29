import Song from "./Song.js";
import Artist from "./Artist.js";
import Album from "./Album.js";
import Playlist from "./Playlist.js";
import PlaylistSong from "./PlaylistSong.js";


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

export {
  Song,
  Artist,
  Album,
  Playlist,
  PlaylistSong,
};
