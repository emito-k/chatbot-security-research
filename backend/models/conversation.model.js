// models/conversation.model.js
import { DataTypes } from "sequelize";
import sequelize from "./index.js";
import User from "./user.model.js";

const Conversation = sequelize.define("Conversation", {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  user_a_id_fk: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: User, key: 'id' }, onDelete: "CASCADE" },
  user_b_id_fk: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: User, key: 'id' }, onDelete: "CASCADE" }
}, {
  timestamps: false,
});

Conversation.belongsTo(User, {
    foreignKey: "user_a_id_fk",
    onDelete: "CASCADE"
});

Conversation.belongsTo(User, {
    "foreignKey": "user_b_id_fk",
    onDelete: "CASCADE"
})

export default Conversation;
