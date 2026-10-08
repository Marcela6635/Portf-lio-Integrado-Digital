import { Router } from "express";

import {
  cadastrarUsuario,
  listarUsuarios,
  buscarUsuarioPorId,
} from "../controllers/usuarioController.js";

const router = Router();

router.post("/", cadastrarUsuario);
router.get("/", listarUsuarios);
router.get("/:id", buscarUsuarioPorId);

export default router;