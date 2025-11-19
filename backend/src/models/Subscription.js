import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Subscription = sequelize.define(
  "Subscription",
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
    plan: {
      type: DataTypes.ENUM("free", "premium"),
      defaultValue: "free",
    },
    start_date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("active", "expired"),
      defaultValue: "active",
    },
  },
  {
    tableName: "subscriptions",
    timestamps: false,
  }
);

export default Subscription;