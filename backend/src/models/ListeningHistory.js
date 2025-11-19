import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const ListeningHistory = sequelize.define(
  "ListeningHistory",
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
    listened_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "listening_history",
    timestamps: false,
  }
);

export default ListeningHistory;