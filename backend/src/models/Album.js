import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Album = sequelize.define(
  "Album",
  {
    album_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    artist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cover_image: {
      type: DataTypes.STRING(255),
    },
    release_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "albums",
    timestamps: false,
  }
);

export default Album;