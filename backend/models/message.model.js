// models/message.model.js
import { DataTypes } from "sequelize";
import sequelize from "./index.js";
import User from "./user.model.js";
import Conversation from "./conversation.model.js";

const Message = sequelize.define("Message", {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  message_content: { type: DataTypes.TEXT, allowNull: false },
  conversation_id_fk: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: Conversation, key: 'id' }, onDelete: "CASCADE" },
  user_id_fk: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: User, key: 'id' }, onDelete: "CASCADE" },
  is_encrypted: { type: DataTypes.BOOLEAN, allowNull: false },
  encryption_algorithm: { type: DataTypes.STRING(255), allowNull: true },
  timestamp: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, {
  timestamps: false,
});

Message.belongsTo(User, {
    foreignKey: "user_id_fk",
    onDelete: "CASCADE"
});

Message.belongsTo(Conversation, {
    foreignKey: "conversation_id_fk",
    onDelete: "CASCADE"
});

export default Message;
