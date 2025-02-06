import express from "express";
import path from "path";

const app = express();
const port = 3000;

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "dist")));

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
