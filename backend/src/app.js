import express from "express";
import cors from "cors";
import path from "path";

import usuarioRoutes from "./routes/usuarioRoutes.js";
import secaoRoutes from "./routes/secaoRoutes.js";
import registroRoutes from "./routes/registroRoutes.js";
import materialRoutes from "./routes/materialRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());

//Routes
app.use("/usuarios", usuarioRoutes);
app.use("/secoes", secaoRoutes);
app.use("/registros", registroRoutes);
app.use("/materiais", materialRoutes);
app.use("/upload", uploadRoutes);
app.use("/uploads", express.static(path.resolve("uploads")));

app.use((request, response) => {
  response.status(404).json({ message: "Rota não encontrada" });
});

export default app;