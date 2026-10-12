import { Router } from "express";
import { autenticar } from "../middlewares/autenticar.js";

import {
  cadastrarUsuario,
  listarUsuarios,
  buscarUsuarioPorId,
  loginUsuario
} from "../controllers/usuarioController.js";

const router = Router();

router.post("/", autenticar, cadastrarUsuario);
router.post("/login", loginUsuario);
router.get("/verificar", autenticar, (req, res) => {
  return res.status(200).json({
    autenticado: true
  });
});
router.get("/", listarUsuarios);
router.get("/:id", autenticar, buscarUsuarioPorId);

export default router;