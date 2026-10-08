import { usuarioModel } from "./usuarioModel.js";
import { secaoModel } from "./secaoModel.js";
import { registroModel } from "./registroModel.js";
import { materialModel } from "./materialModel.js";

usuarioModel.hasMany(secaoModel, {
  foreignKey: "usuario_id",
});

secaoModel.belongsTo(usuarioModel, {
  foreignKey: "usuario_id",
});

secaoModel.hasMany(registroModel, {
  foreignKey: "secao_id",
});

registroModel.belongsTo(secaoModel, {
  foreignKey: "secao_id",
});

registroModel.hasMany(materialModel, {
  foreignKey: "registro_id",
});

materialModel.belongsTo(registroModel, {
  foreignKey: "registro_id",
});

export { usuarioModel, secaoModel, registroModel, materialModel, };