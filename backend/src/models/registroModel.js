import { DataTypes } from "sequelize";
import { conn } from "../config/conn.js";

export const registroModel = conn.define(
  "registros",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    conteudo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    bimestre: {
      type: DataTypes.ENUM("1","2","3","4"),
      allowNull: true,
    },
    secao_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
  },
  {
    timestamps: false,
  },
);