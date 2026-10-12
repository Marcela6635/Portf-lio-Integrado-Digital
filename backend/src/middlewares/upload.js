import multer from "multer";
import path from "path";
import { randomUUID } from "crypto";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pastaUploads = path.resolve(
  __dirname,
  "../../uploads/imagens"
);
fs.mkdirSync(pastaUploads, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pastaUploads);
  },

  filename: (req, file, cb) => {
    const extensao = path.extname(
      file.originalname
    ).toLowerCase();

    const nomeArquivo = `${randomUUID()}${extensao}`;

    cb(null, nomeArquivo);
  }
});

const tiposPermitidos = [
  "image/jpeg",
  "image/png",
  "image/webp"
];

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024
  },

  fileFilter: (req, file, cb) => {
    if (tiposPermitidos.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Formato de imagem não permitido."));
    }
  }
});

export default upload;