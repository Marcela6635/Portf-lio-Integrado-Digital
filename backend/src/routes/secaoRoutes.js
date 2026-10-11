import { Router } from "express";
import { autenticar } from "../middlewares/autenticar.js";

import {
    cadastrarSecao,
    listarSecoes,
    buscarSecaoPorId,
    atualizarSecao,
    deletarSecao
} from "../controllers/secaoController.js";

const router = Router();

router.post("/", autenticar, cadastrarSecao);
router.get("/", listarSecoes);
router.get("/:id", buscarSecaoPorId);
router.patch("/:id", autenticar, atualizarSecao);
router.delete("/:id", autenticar, deletarSecao)

export default router;