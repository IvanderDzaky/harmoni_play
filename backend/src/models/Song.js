import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Song = sequelize.define(
  "Song",
  {
    song_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    artist_id: DataTypes.INTEGER,
    album_id: DataTypes.INTEGER,
    lyrics: DataTypes.TEXT,
    file_audio: DataTypes.STRING,
    cover_image: DataTypes.STRING,
    uploaded_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "songs",
    timestamps: false,
  }
);

export default Song;
