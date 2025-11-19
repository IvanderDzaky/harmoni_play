import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Genre = sequelize.define(
  "Genre",
  {
    genre_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "genres",
    timestamps: false,
  }
);

export default Genre;