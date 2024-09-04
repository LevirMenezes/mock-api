import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export class DespesasDeputadoController {

  static lerArquivoJson(deputado_id) {
    const data = fs.readFileSync(`./dados_deputados/despesas_deputado_${deputado_id}.json`); // Lê o arquivo JSON
    //return JSON.parse(data); // Converte o conteúdo para um objeto JavaScript
    return data || null; // Converte o conteúdo para um objeto JavaScript
  }

  static obterDespesasDeputados(req, res) {

    const deputado_id = req.params.id;

    const despesasDeputado = JSON.parse(DespesasDeputadoController.lerArquivoJson(deputado_id));

    if (!despesasDeputado)
      res.status(500).send('Não há despesas do Deputado!');
    else
      res.json({ ...despesasDeputado });
  }  

  static obterDeputado(req, res) {
    try {
      const deputados = JSON.parse(DespesasDeputadoController.lerArquivoJson()); // Lê o arquivo JSON com os deputados
  
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