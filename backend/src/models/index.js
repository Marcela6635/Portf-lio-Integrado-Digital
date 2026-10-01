import { secaoModel } from "./secaoModel.js";
import { registroModel } from "./registroModel.js";
import { materialModel } from "./materialModel.js";

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

export { secaoModel, registroModel, materialModel, };