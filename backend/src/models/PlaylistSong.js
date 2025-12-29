import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const PlaylistSong = sequelize.define(
  "PlaylistSong",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    playlist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    song_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    added_at: {                     
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "playlist_songs",
    timestamps: false,              
  }
);

export default PlaylistSong;
