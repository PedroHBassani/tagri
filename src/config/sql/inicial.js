const tipos = `
  INSERT INTO tipos (tipo, nome, descricao, chave, ordem) VALUES
    ('FORMA_PAGAMENTO', 'Dinheiro', '', 'DINHEIRO', 0),
    ('PRODUTO_TIPO', 'Adubo', '', '', 0),
    ('PRODUTO_TIPO', 'Inseticida', '', '', 0),
    ('PRODUTO_TIPO', 'Semente', '', 'SEMENTE', 0),
    ('PRODUTO_TIPO', 'Fungicidas', '', '', 0),
    ('PRODUTO_TIPO', 'Herbicidas', '', '', 0),
    ('PERIODO_AGRICOLA', 'Plantio de Primavera', '', '', 0),
    ('PERIODO_AGRICOLA', 'Plantio de Verão', '', '', 0),
    ('PERIODO_AGRICOLA', 'Plantio de Outono/Inverno', '', '', 0),
    ('SISTEMA_MANEJO', 'Convencional', '', '', 0),
    ('SISTEMA_MANEJO', 'Biológico', '', '', 0),
    ('SISTEMA_MANEJO', 'Bio agrícola', '', '', 0),
    ('PRATICAS_AGRICOLAS', 'Dessecação (Herbicida Pré Emergente)', 'Controlar as ervas daninhas antes do plantio', '', 1),
    ('PRATICAS_AGRICOLAS', 'TS', 'Boa germinação e proteção das plantas', '', 2),
    ('PRATICAS_AGRICOLAS', 'Adubação de Base', 'Fornece os nutrientes necessários para o desenvolvimento saudável das plantas desde o início', '', 3),
    ('PRATICAS_AGRICOLAS', 'Adubação de Cobertura', 'Complementa a nutrição das plantas ao longo do ciclo de cultivo', '', 4),
    ('PRATICAS_AGRICOLAS', 'Dessecação (Herbicida Pós Emergente)', 'Controla as ervas daninhas que já estão presentes na lavoura', '', 5),
    ('OPERACAO_FORMA_GERAR_NUMERACAO', 'Informado pelo usuário', '', 'USUARIO', 0),
    ('OPERACAO_FORMA_GERAR_NUMERACAO', 'Sequencial', '', 'SEQUENCIAL', 0),
    ('OPERACAO_FORMA_GERAR_NUMERACAO', 'Sequencial (por ano)', '', 'SEQUENCIAL_POR_ANO', 0),
    ('UNIDADE_MEDIDA', 'Comprimento (M, KM)', '', 'COMPRIMENTO', 0),
    ('UNIDADE_MEDIDA', 'Capacidade (L)', '', 'CAPACIDADE', 0),
    ('UNIDADE_MEDIDA', 'Massa (G, KG)', '', 'MASSA', 0);
`;

const bancos = `
INSERT INTO bancos (codigo, nome) VALUES
    (001, 'Banco do Brasil'),
    (104, 'Caixa Econômica Federal'),
    (237, 'Banco Bradesco'),
    (341, 'Itaú Unibanco'),
    (033, 'Banco Santander'),
    (422, 'Banco Safra'),
    (077, 'Banco Inter'),
    (197, 'Banco Stone');
`;

const pessoas = `
  insert into pessoas (nome) values ('Root'), ('Lucas'), ('Teste entidade 1'), ('Teste entidade 2'), ('Unochapecó');
`;

const pessoasFisicas = `
  insert into pessoa_fisicas (pessoa_id, sobrenome, cpf) values (2, 'Tafarel', '8168847903');
`;

const pessoasJuridicas = `
  insert into pessoa_juridicas (pessoa_id, razao_social, cnpj) values (5, 'Universidade Comunitária da Região de Chapecó', '82804642000108');
`;

const entidades = `INSERT INTO entidades (pessoa_id) VALUES (3), (4);`;

const usuarios = `
  INSERT INTO usuarios (pessoa_id, login, senha, ultima_mudanca_senha, ultimo_acesso, criado_em) VALUES
    (1, 'root', '$2b$12$KyKaNFWx4L7UAW95bqZPCuwSpaBxslgsfJMDjylQtJq0SaoDBRPb2', now(), now(), now()),
    (2, 'lucas@tafarel.com.br', '$2b$12$KyKaNFWx4L7UAW95bqZPCuwSpaBxslgsfJMDjylQtJq0SaoDBRPb2', now(), now(), now());
`;

const usuarioEntidades = `
  INSERT INTO usuario_entidades (usuario_id, entidade_id) VALUES (1, 1), (2, 2);
`;

const moedas = `INSERT INTO moedas (nome, nome_plural, sigla) VALUES ('Real', 'Reais', 'R$');`;

const clientesFornecedores = `
  INSERT INTO cliente_fornecedores (pessoa_id) VALUES (5);
`;

module.exports = [
  tipos,
  bancos,
  pessoas,
  pessoasFisicas,
  pessoasJuridicas,
  entidades,
  usuarios,
  usuarioEntidades,
  moedas,
  clientesFornecedores,
];
