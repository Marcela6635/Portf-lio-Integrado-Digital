import { secaoModel } from "../models/secaoModel.js";
import { registroModel } from "../models/registroModel.js";
import { materialModel } from "../models/materialModel.js";

export const cadastrarSecao = async (req, res) => {
  try {
    const { nome, periodo } = req.body;

    const novaSecao = await secaoModel.create({
      nome,
      periodo,
    });

    res.status(201).json(novaSecao);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao criar a seção",
      erro: error.message,
    });
  }
};

export const listarSecoes = async (req, res) => {
  try {
    const secoes = await secaoModel.findAll();

    res.status(200).json(secoes);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao buscar as seções",
      erro: error.message,
    });
  }
};

export const buscarSecaoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const secao = await secaoModel.findByPk(id, {
      include: {
        model: registroModel,
        include: materialModel
      },
    });

    if (!secao) {
      return res.status(404).json({
        mensagem: "Seção não encontrada",
      });
    }

    res.status(200).json(secao);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao buscar a seção",
      erro: error.message,
    });
  }
};