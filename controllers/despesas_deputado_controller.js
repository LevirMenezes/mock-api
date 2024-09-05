import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export class DespesasDeputadoController {

  static obtemNomeMes(numMes) {
    let nomeMes;
    switch (Number(numMes)) {
      case 1:
        nomeMes = "Janeiro"
        break;
      case 2:
        nomeMes = "Fevereiro"
        break;
      case 3:
        nomeMes = "Março"
        break;
      case 4:
        nomeMes = "Abril"
        break;
      case 5:
        nomeMes = "Maio"
        break;
      case 6:
        nomeMes = "Junho"
        break;
      case 7:
        nomeMes = "Julho"
        break;
      case 8:
        nomeMes = "Agosto"
        break;
      case 9:
        nomeMes = "Setembro"
        break;
      case 10:
        nomeMes = "Outubro"
        break;
      case 11:
        nomeMes = "Novembro"
        break;
      case 12:
        nomeMes = "Dezembro"
        break;
      default:
        nomeMes = "Mês desconhecido"
        break
    }
    return nomeMes;
  }

  static lerArquivoJson(deputado_id) {
    const data = fs.readFileSync(`./dados_deputados/despesas_deputado_${deputado_id}.json`); // Lê o arquivo JSON
    //return JSON.parse(data); // Converte o conteúdo para um objeto JavaScript
    return data || null; // Converte o conteúdo para um objeto JavaScript
  }

  static obterDespesasDeputados(req, res) {
    try {
      const deputado_id = req.params.id;

      const despesasDeputado = JSON.parse(DespesasDeputadoController.lerArquivoJson(deputado_id));

      // Verifica se há resultados e responde de acordo
      if (despesasDeputado.dados.length === 0)
        return res.status(404).send(`Sem despesas do deputado: ${deputado_id}!`);
      else
        return res.json({ ...despesasDeputado });
    } catch (error) {
      console.error(`Erro ao obter despesas do deputado: `, error.message); // Log do erro ao obter lista de deputados
      return res.status(500).send('Erro interno do servidor'); // Retorna status code 500
    }
  }

  static obterDespesasPorMes(req, res) {
    try {
      const deputado_id = req.params.id;

      const despesas = JSON.parse(DespesasDeputadoController.lerArquivoJson(deputado_id)); // Lê o arquivo JSON com os deputados

      // Obtém os parâmetros 'nome' e 'partido' da query string, usando string vazia como valor padrão se não estiver definido
      const mes = req.query.mes || '';

      // Filtra os deputados com base nos parâmetros da query string
      const resultado = despesas.dados.filter(despesa => Number(despesa.mes) == Number(mes));

      // Verifica se há resultados e responde de acordo
      if (resultado.length === 0) {
        return res.status(404).send(`Nenhuma despesa encontrada para o deputado no mês de ${DespesasDeputadoController.obtemNomeMes(mes)}!`);
      } else {
        return res.json(resultado);
      }
    } catch (error) {
      console.error('Erro ao obter despesa do deputado:', error.message); // Log do erro ao obter despesas
      return res.status(500).send('Erro interno do servidor'); // Retorna status code 500
    }
  }
}
