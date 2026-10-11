import { Router } from "express";
import { autenticar } from "../middlewares/autenticar.js";

import {
    cadastrarMaterial,
    listarMateriais,
    buscarMaterialPorId,
    atualizarMaterial,
    deletarMaterial
} from "../controllers/materialController.js";

const router = Router();

router.post("/", autenticar, cadastrarMaterial);
router.get("/", listarMateriais);
router.get("/:id", buscarMaterialPorId);
router.patch("/:id", autenticar, atualizarMaterial);
router.delete("/:id", autenticar, deletarMaterial);

export default router;