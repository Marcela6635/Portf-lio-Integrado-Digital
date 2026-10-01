import express from "express";
import cors from "cors";

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
// app.use("/usuarios", usuarioRoutes)

app.use((request, response) => {
  response.status(404).json({ message: "Rota não encontrada" });
});

export default app;