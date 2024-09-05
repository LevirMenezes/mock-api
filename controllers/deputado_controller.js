import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export class DeputadoController {

  static lerArquivoJson() {
    const data = fs.readFileSync('mock_deputados.json'); // Lê o arquivo JSON
    //return JSON.parse(data); // Converte o conteúdo para um objeto JavaScript
    return data || null; // Converte o conteúdo para um objeto JavaScript
  }

  static obterDeputados(_req, res) {
    try {
      const deputados = JSON.parse(DeputadoController.lerArquivoJson());

      // Verifica se há resultados e responde de acordo
      if (deputados.length === 0) {
        return res.status(404).send('Nenhum deputado encontrado!');
      } else {
        return res.json({ ...deputados });
      }
    } catch (error) {
      console.error('Erro ao obter lista de deputados:', error.message); // Log do erro ao obter despesas
      return res.status(500).send('Erro interno do servidor'); // Retorna status code 500
    }


  }

  static obterDeputado(req, res) {
    try {
      const deputados = JSON.parse(DeputadoController.lerArquivoJson()); // Lê o arquivo JSON com os deputados

      // Obtém os parâmetros 'nome' e 'partido' da query string, usando string vazia como valor padrão se não estiver definido
      const nome = req.query.nome || '';
      const partido = req.query.partido || '';

      // Filtra os deputados com base nos parâmetros da query string
      const resultado = deputados.deputados.filter(deputado =>
        deputado.nome.toLowerCase().includes(nome.toLowerCase()) &&
        deputado.siglaPartido.toLowerCase().includes(partido.toLowerCase())
      );

      // Verifica se há resultados e responde de acordo
      if (resultado.length === 0) {
        return res.status(404).send('Nenhum deputado encontrado com os critérios fornecidos.');
      } else {
        return res.json(resultado);
      }
    } catch (error) {
      console.error('Erro ao obter deputado:', error.message); // Log do erro para depuração
      return res.status(500).send('Erro interno do servidor'); // Retorna uma resposta de erro HTTP
    }
  }
}
