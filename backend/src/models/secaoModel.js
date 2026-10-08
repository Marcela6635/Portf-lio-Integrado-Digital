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
    area_unidade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    periodo: {
      type: DataTypes.ENUM("anual", "bimestral"),
      allowNull: false,
    },
    origem: {
      type: DataTypes.ENUM("SESI", "SENAI"),
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.UUID,
      allowNull: false
    }
  },
  {
    timestamps: false,
  },
);