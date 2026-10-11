import { registroModel } from "../models/registroModel.js";
import { materialModel } from "../models/materialModel.js";

export const cadastrarRegistro = async (req, res) => {
  try {
    const { titulo, conteudo, bimestre, secao_id } = req.body;

    const novoRegistro = await registroModel.create({
      titulo,
      conteudo,
      bimestre,
      secao_id
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
     const { secao_id, bimestre } = req.query;

    const filtro = {};

    if (secao_id) {
      filtro.secao_id = secao_id;
    }

    if (bimestre) {
      filtro.bimestre = bimestre;
    }

    const registros = await registroModel.findAll({
      where: filtro,
      include: [
        {
          model: materialModel
        }
      ]
    });

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

    const registro = await registroModel.findByPk(id, {
        include: [
        {
          model: materialModel
        }
      ]
    });

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

export const atualizarRegistro = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, conteudo, bimestre, secao_id } = req.body;

    const registro = await registroModel.findByPk(id);

    if (!registro) {
      return res.status(404).json({
        mensagem: "Registro não encontrado"
      });
    }

    await registro.update({
      titulo,
      conteudo,
      bimestre,
      secao_id
    });

    return res.status(200).json(registro);

  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao atualizar o registro",
      erro: error.message
    });
  }
};

export const deletarRegistro = async (req, res) => {
  try {
    const { id } = req.params;

    const registro = await registroModel.findByPk(id);

    if (!registro) {
      return res.status(404).json({
        mensagem: "Registro não encontrado"
      });
    }

    await registro.destroy();

    return res.status(200).json({
      mensagem: "Registro excluído com sucesso"
    });

  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao excluir o registro",
      erro: error.message
    });
  }
};