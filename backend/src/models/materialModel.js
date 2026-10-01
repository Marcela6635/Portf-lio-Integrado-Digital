import { DataTypes } from "sequelize";
import { conn } from "../config/conn.js";

export const materialModel = conn.define(
  "materiais",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    tipo: {
      type: DataTypes.ENUM("imagem", "video", "link", "arquivo"),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    registro_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);