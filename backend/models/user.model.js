// models/user.model.js
import { DataTypes } from "sequelize";
import sequelize from "./index.js";

const User = sequelize.define("User", {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  username: { type: DataTypes.STRING(255), allowNull: false },
  password: { type: DataTypes.STRING(255), allowNull: false },
  public_key: { type: DataTypes.STRING(255), allowNull: false },
  is_bot: { type: DataTypes.BOOLEAN, allowNull: false },
  auth_token: { type: DataTypes.STRING(255), allowNull: false }
}, {
  timestamps: false,
});

export default User;
