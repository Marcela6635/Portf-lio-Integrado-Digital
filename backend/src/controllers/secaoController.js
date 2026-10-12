import { secaoModel } from "../models/secaoModel.js";
import { registroModel } from "../models/registroModel.js";
import { materialModel } from "../models/materialModel.js";

export const cadastrarSecao = async (req, res) => {
  try {
      const { nome, area_unidade, periodo, origem } = req.body;

      const usuario_id = req.usuario.id;

      if (!nome || !area_unidade || !periodo || !origem) {
        return res.status(400).json({
          mensagem: "Preencha todos os campos obrigatórios."
        });
      }

      if (!["anual", "bimestral"].includes(periodo)) {
        return res.status(400).json({
          mensagem: "Período inválido."
        });
      }

      if (!["SESI", "SENAI"].includes(origem)) {
        return res.status(400).json({
          mensagem: "Origem inválida."
        });
      }

      const novaSecao = await secaoModel.create({
        nome,
        area_unidade,
        periodo,
        origem,
        usuario_id
      });

      return res.status(201).json(novaSecao);

  } catch (error) {
      console.error("Erro ao cadastrar seção:", error);

      return res.status(500).json({
        mensagem: "Erro ao cadastrar a seção."
      });
  }
};


export const listarSecoes = async (req, res) => {
  try {
      const { origem, area_unidade, periodo } = req.query;

      const filtro = {};

      if (origem) {
        filtro.origem = origem;
      }

      if (area_unidade) {
        filtro.area_unidade = area_unidade;
      }

      if (periodo) {
        filtro.periodo = periodo;
      }

      const secoes = await secaoModel.findAll({
        where: filtro
      });

      return res.status(200).json(secoes);

  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao listar seções"
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

export const atualizarSecao = async (req, res) => {
  try {
      const { id } = req.params;
      const { nome, area_unidade, periodo, origem, usuario_id } = req.body;

      const secao = await secaoModel.findByPk(id);

      if (!secao) {
        return res.status(404).json({
          mensagem: "Seção não encontrada"
        });
      }

      await secao.update({
        nome,
        area_unidade,
        periodo,
        origem,
        usuario_id,
      });

      return res.status(200).json(secao);

  } catch (error) {
      return res.status(500).json({
        mensagem: "Erro ao atualizar a seção",
        erro: error.message
      });
  }
};

export const deletarSecao = async (req, res) => {
  try {
      const { id } = req.params;

      const secao = await secaoModel.findByPk(id);

      if (!secao) {
        return res.status(404).json({
          mensagem: "Seção não encontrada"
        });
      }

      await secao.destroy();

      return res.status(200).json({
        mensagem: "Seção excluída com sucesso"
      });

  } catch (error) {
      return res.status(500).json({
        mensagem: "Erro ao excluir a seção",
        erro: error.message
      });
  }
};