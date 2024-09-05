import express from 'express';
import cors from 'cors';
import { DeputadoController } from '../controllers/deputado_controller.js';
import { DespesasDeputadoController } from '../controllers/despesas_deputado_controller.js';

const app = express();

app.use(cors())

app.use(express.json());

app.get('/deputados', DeputadoController.obterDeputados);
app.get('/deputados/deputado', DeputadoController.obterDeputado);
app.get('/deputados/:id/despesas', DespesasDeputadoController.obterDespesasDeputados);
app.get('/deputados/:id/despesas/mes', DespesasDeputadoController.obterDespesasPorMes);

export default app;
