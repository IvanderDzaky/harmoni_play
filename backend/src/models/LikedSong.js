import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const LikedSong = sequelize.define(
  "LikedSong",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    song_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "liked_songs",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["user_id", "song_id"],
      },
    ],
  }
);

export default LikedSong;