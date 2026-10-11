import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { usuarioModel } from "../models/usuarioModel.js";

export const cadastrarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha || senha.length < 12) {
      return res.status(400).json({
        mensagem: "Preencha os campos e use uma senha de pelo menos 12 caracteres"
      });
    }

    const senhaHash = await bcrypt.hash(senha, 12);

    const usuario = await usuarioModel.create({
      nome,
      email,
      senha: senhaHash
    });

    res.status(201).json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    });

  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao cadastrar o usuário",
      erro: error.message,
    });
  }
};

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioModel.findAll({
      attributes: ["id", "nome", "email"]
    });

    res.status(200).json(usuarios);

  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao listar usuários",
      erro: error.message,
    });
  }
};

export const buscarUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await usuarioModel.findByPk(id, {
      attributes: ["id", "nome", "email"]
    });

    if (!usuario) {
      return res.status(404).json({
        mensagem: "Usuário não encontrado",
      });
    }

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao buscar usuário",
      erro: error.message,
    });
  }
};

export const loginUsuario = async (req, res) => {
  try{
    const { email, senha } = req.body;

    if(!email || !senha){
      return res.status(400).json({
        mensagem: "Informe o e-mail e a senha"
      });
    }

    const usuario = await usuarioModel.findOne({
      where: { email }
    });

    if(!usuario){
      return res.status(401).json({
        mensagem: "E-mail ou senha incorretos"
      });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if(!senhaCorreta){
      return res.status(401).json({
        mensagem: "E-mail ou senha incorretos"
      });
    }

    const token = jwt.sign(
      { id: usuario.id },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      mensagem: "Login realizado com sucesso",
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
    })
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao realizar login"
    });
  }
}