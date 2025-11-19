import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Artist = sequelize.define(
  "Artist",
  {
    artist_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
    },
    photo: {
      type: DataTypes.STRING(255),
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "artists",
    timestamps: false,
  }
);

export default Artist;