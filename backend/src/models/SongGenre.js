import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const SongGenre = sequelize.define(
  "SongGenre",
  {
    song_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "song_genres",
    timestamps: false,
  }
);

export default SongGenre;
