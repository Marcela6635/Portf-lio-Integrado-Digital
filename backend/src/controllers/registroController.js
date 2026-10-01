import { registroModel } from "../models/registroModel.js";

export const cadastrarRegistro = async (req, res) => {
  try {
    const { titulo, conteudo, secao_id } = req.body;

    const novoRegistro = await registroModel.create({
      titulo,
      conteudo,
      secao_id,
    });

    res.status(201).json(novoRegistro);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao criar o registro",
      erro: error.message,
    });
  }
};

export const listarRegistros = async (req, res) => {
  try {
    const registros = await registroModel.findAll();

    res.status(200).json(registros);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao buscar os registros",
      erro: error.message,
    });
  }
};

export const buscarRegistroPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const registro = await registroModel.findByPk(id);

    if (!registro) {
      return res.status(404).json({
        mensagem: "Registro não encontrado",
      });
    }

    res.status(200).json(registro);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao buscar o registro",
      erro: error.message,
    });
  }
};