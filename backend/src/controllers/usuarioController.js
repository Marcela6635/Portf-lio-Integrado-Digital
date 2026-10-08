import { usuarioModel } from "../models/usuarioModel.js";

export const cadastrarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const novoUsuario = await usuarioModel.create({
      nome,
      email,
      senha,
    });

    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao criar o usuário",
      erro: error.message,
    });
  }
};

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioModel.findAll();

    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao buscar os usuários",
      erro: error.message,
    });
  }
};

export const buscarUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await usuarioModel.findByPk(id);

    if (!usuario) {
      return res.status(404).json({
        mensagem: "Usuário não encontrado",
      });
    }

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao buscar o usuário",
      erro: error.message,
    });
  }
};
