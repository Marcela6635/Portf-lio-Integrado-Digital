import { Router } from "express";

import {
    cadastrarMaterial,
    listarMateriais,
    buscarMaterialPorId,
} from "../controllers/materialController.js";

const router = Router();

router.post("/", cadastrarMaterial);
router.get("/", listarMateriais);
router.get("/:id", buscarMaterialPorId);

export default router;