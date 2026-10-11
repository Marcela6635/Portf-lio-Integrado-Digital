import { materialModel } from "../models/materialModel.js";
import { registroModel } from "../models/registroModel.js";

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

export const atualizarMaterial = async (req, res) => {
    try {
    const { id } = req.params;
    const { tipo, url, registro_id } = req.body;

    const material = await materialModel.findByPk(id);

    if (!material) {
      return res.status(404).json({
        mensagem: "Material não encontrado"
      });
    }

    await material.update({
     tipo,
     url,
     registro_id,
    });

    return res.status(200).json(material);

  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao atualizar o material",
      erro: error.message
    });
  }
};

export const deletarMaterial = async (req, res) => {
   try {
    const { id } = req.params;

    const material = await materialModel.findByPk(id);

    if (!material) {
      return res.status(404).json({
        mensagem: "Material não encontrado"
      });
    }

    await material.destroy();

    return res.status(200).json({
      mensagem: "Material excluído com sucesso"
    });

  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao excluir o material",
      erro: error.message
    });
  }
};