import { Router } from "express";
import { autenticar } from "../middlewares/autenticar.js";

import {
    cadastrarRegistro,
    listarRegistros,
    buscarRegistroPorId,
    atualizarRegistro,
    deletarRegistro
} from "../controllers/registroController.js";

const router = Router();

router.post("/", autenticar, cadastrarRegistro);
router.get("/", listarRegistros);
router.get("/:id", buscarRegistroPorId);
router.patch("/:id", autenticar, atualizarRegistro);
router.delete("/:id", autenticar, deletarRegistro)

export default router;