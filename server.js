import express from 'express';
import { DeputadoController } from './controllers/deputado_controller.js'

// server.js
const app = express();
const port = 3000;

// Middleware para simular uma resposta JSON
app.use(express.json());

// Rota simulada para retornar dados do usuário
app.get('/deputados', DeputadoController.obterDeputados);

// Rota para buscar deputado pelo nome
app.get('/deputados/deputado', DeputadoController.obterDeputado);
 
// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor ouvindo na porta http://localhost:${port}`);
});
