import jwt from "jsonwebtoken";
import { usuarioModel } from "../models/usuarioModel.js";

export const autenticar = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        mensagem: "Token não informado"
      });
    }

    const dados = jwt.verify(token, process.env.JWT_SECRET);

    const usuario = await usuarioModel.findByPk(dados.id);

    if (!usuario) {
      return res.status(401).json({
        mensagem: "Usuário não encontrado"
      });
    }

    if (usuario.id !== process.env.ADMIN_USER_ID) {
      return res.status(403).json({
        mensagem: "Acesso não permitido"
      });
    }

    req.usuario = usuario;
    next();

  } catch (error) {
    res.status(401).json({
      mensagem: "Token inválido ou expirado"
    });
  }
};