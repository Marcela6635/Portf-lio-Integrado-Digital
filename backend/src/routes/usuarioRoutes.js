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
router.get("/", listarUsuarios);
router.get("/:id", autenticar, buscarUsuarioPorId);

export default router;