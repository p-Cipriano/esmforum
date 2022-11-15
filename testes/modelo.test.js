const bd = require('../bd/bd_utils.js');
const modelo = require('../modelo.js');

beforeEach(() => {
  bd.reconfig('./bd/esmforum-teste.db');
  // limpa dados de todas as tabelas
  bd.exec('delete from perguntas', []);
  bd.exec('delete from respostas', []);
});

test('Testando banco de dados vazio', () => {
  expect(modelo.listar_perguntas().length).toBe(0);
});

test('Testando cadastro de três perguntas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');
  const perguntas = modelo.listar_perguntas(); 
  expect(perguntas.length).toBe(3);
  expect(perguntas[0].texto).toEqual('1 + 1 = ?');
  expect(perguntas[1].texto).toEqual('2 + 2 = ?');
  expect(perguntas[2].num_respostas).toBe(0);
  expect(perguntas[1].id_pergunta).toBe(perguntas[2].id_pergunta-1);
});

test('Testando cadastro de pergunta e respostas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  const pergunta = modelo.listar_perguntas(); 
  expect(pergunta.length).toBe(1);
  expect(pergunta[0].texto).toEqual('1 + 1 = ?');
  expect(pergunta[0].num_respostas).toBe(0);
  modelo.cadastrar_resposta(pergunta[0].id_pergunta, '0')
  modelo.cadastrar_resposta(pergunta[0].id_pergunta, '2')
  getPerg = modelo.get_pergunta(pergunta[0].id_pergunta)
  expect(getPerg.texto).toEqual('1 + 1 = ?');
  num_respostas = modelo.get_num_respostas(pergunta[0].id_pergunta)
  expect(num_respostas).toBe(2);
  respostas = modelo.get_respostas(pergunta[0].id_pergunta)
  expect(respostas[0]["texto"]).toBe("0")
  expect(respostas[1]["texto"]).toBe("2")
});