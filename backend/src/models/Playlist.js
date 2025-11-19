import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Playlist = sequelize.define(
  "Playlist",
  {
    playlist_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "playlists",
    timestamps: false,
  }
);

export default Playlist;