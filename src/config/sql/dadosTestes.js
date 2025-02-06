const produtoValores = `
    INSERT INTO produto_valores (usuario_id, produto_id, cliente_fornecedor_id, valor, data)
    SELECT 
        1 AS usuario_id,
        p.id AS produto_id,
        1 AS cliente_fornecedor_id,
        ROUND((RAND() * (150 - 60) + 60), 2) AS valor,
        DATE_SUB(CURDATE(), INTERVAL (FLOOR(RAND() * 360) + 1) DAY) AS data
    FROM 
        produtos p
    JOIN 
        (SELECT 1 AS dummy UNION ALL SELECT 1 UNION ALL SELECT 1 UNION ALL SELECT 1 UNION ALL SELECT 1) AS gs
    LIMIT 100;
`;

const fazendas = `
  insert into fazendas (responsavel_id, nome) values (2, 'Fazenda 1');
`;

const centroCustos = `
  insert into centro_custos (entidade_id, nome) values (1, 'Geral');
`;

const safras = `
    INSERT INTO safras (entidade_id, periodo_agricola_id, sistema_manejo_id, produto_plantado_id, fazenda_id, centro_custo_id, talhao, area_ha, data_plantio, peso_colhido)
    SELECT
        1 AS entidade_id,
        pa.id AS periodo_agricola_id,
        sm.id AS sistema_manejo_id,
        p.id AS produto_plantado_id,
        1 AS fazenda_id,
        1 AS centro_custo_id,
        r.talhao,
        round((RAND() * (200 - 100) + 100), 2) AS area_ha,
        DATE_SUB(CURDATE(), INTERVAL FLOOR(RAND() * 720) + 1 DAY) AS data_plan,
        round((RAND() * (10000 - 5000) + 5000), 2) AS peso_colhido
    FROM
        produtos p
    JOIN
        tipos pa ON pa.tipo = 'PERIODO_AGRICOLA'
    JOIN
        tipos sm ON sm.tipo = 'SISTEMA_MANEJO'
    JOIN
        (SELECT 1 AS talhao UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4) r ON TRUE
    LIMIT 100;
`;

const estoques = `
  insert into estoques (entidade_id, nome) values (1, 'Geral');
`;

const baixaEstoqueIds = `
    INSERT INTO estoque_produtos (estoque_id, produto_id, quantidade, data, sinal, lancamento_manual, criado_as)
    SELECT
        1 AS estoque_id,
        p.id AS produto_id,
        ROUND((RAND() * (250 - 100) + 100), 2) AS quantidade,
        '2000-01-01' AS data,
        1 AS sinal,
        FALSE AS lancamento_manual,
        '2000-01-01 00:00:00' AS criado_as
    FROM
        produtos p
    WHERE
        p.tipo_id != 4
    ORDER BY RAND()
    LIMIT 500;
`;

const safraUsoProdutos = `
INSERT INTO safra_uso_produtos (safra_id, pratica_agricola_id)
SELECT 
    1 AS safra_id, 
    pa.id AS pratica_agricola_id
FROM 
    tipos pa
WHERE 
    pa.tipo = 'PRATICAS_AGRICOLAS';

`;

module.exports = [
  produtoValores,
  fazendas,
  centroCustos,
  safras,
  estoques,
  baixaEstoqueIds,
  safraUsoProdutos,
];
