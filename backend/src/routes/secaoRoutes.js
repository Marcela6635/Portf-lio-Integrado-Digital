import { Router } from "express";

import {
    cadastrarSecao,
    listarSecoes,
    buscarSecaoPorId
} from "../controllers/secaoController.js";

const router = Router();

router.post("/", cadastrarSecao);
router.get("/", listarSecoes);
router.get("/:id", buscarSecaoPorId);

export default router;