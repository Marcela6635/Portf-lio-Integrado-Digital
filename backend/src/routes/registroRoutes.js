import { Router } from "express";

import {
    cadastrarRegistro,
    listarRegistros,
    buscarRegistroPorId,
} from "../controllers/registroController.js";

const router = Router();

router.post("/", cadastrarRegistro);
router.get("/", listarRegistros);
router.get("/:id", buscarRegistroPorId);

export default router;