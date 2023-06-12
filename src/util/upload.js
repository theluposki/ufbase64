import multer from "multer";
import { generateUUID } from '../crypto/index.js'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads"); // Substitua pelo caminho do diretório de destino
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = generateUUID();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

export const upload = multer({ storage: storage });
