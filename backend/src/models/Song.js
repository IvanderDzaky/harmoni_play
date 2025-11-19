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
    artist_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    album_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    lyrics: {
      type: DataTypes.TEXT,
    },
    file_audio: {
      type: DataTypes.STRING,
    },
    cover_image: {
      type: DataTypes.STRING,
    },
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