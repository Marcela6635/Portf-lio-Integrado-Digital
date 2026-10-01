import { materialModel } from "../models/materialModel.js";

export const cadastrarMaterial = async (req, res) => {
  try {
    const { tipo, url, registro_id } = req.body;

    const novoMaterial = await materialModel.create({
      tipo,
      url,
      registro_id,
    });

    res.status(201).json(novoMaterial);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao criar o material",
      erro: error.message,
    });
  }
};

export const listarMateriais = async (req, res) => {
  try {
    const materiais = await materialModel.findAll();

    res.status(200).json(materiais);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao buscar os materiais",
      erro: error.message,
    });
  }
};

export const buscarMaterialPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const material = await materialModel.findByPk(id);

    if (!material) {
      return res.status(404).json({
        mensagem: "Material não encontrado",
      });
    }

    res.status(200).json(material);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao buscar o material",
      erro: error.message,
    });
  }
};