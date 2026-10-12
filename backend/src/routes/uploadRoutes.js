import { Router } from "express";
import upload from "../middlewares/upload.js";
import { autenticar } from "../middlewares/autenticar.js";


const router = Router();

router.post(
  "/imagem",
  autenticar,
  upload.single("imagem"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        mensagem: "Nenhuma imagem enviada."
      });
    }

    return res.status(201).json({
      mensagem: "Imagem enviada com sucesso!",
      url: `/uploads/imagens/${req.file.filename}`
    });
  }
);

export default router;