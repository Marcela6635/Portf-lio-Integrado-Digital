import { DataTypes } from "sequelize";
import { conn } from "../config/conn.js";

export const secaoModel = conn.define(
  "secoes",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    periodo: {
      type: DataTypes.ENUM("anual", "bimestral"),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);