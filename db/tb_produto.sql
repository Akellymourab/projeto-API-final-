CREATE TABLE tb_produto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at DATETIME NULL,
    descricao VARCHAR (255),
    img_id INT,
    FOREIGN KEY (img_id) REFERENCES imagens_pg3(id),
    nome VARCHAR (55),
    valor DECIMAL,
    tamanho INT NOT NULL,
    cor VARCHAR (15),
    quantidade INT NOT NULL,
    referencia INT NOT NULL,
    marca_id INT,
    FOREIGN KEY (marca_id) REFERENCES marca(id),
    estado VARCHAR (5) NOT NULL,
    colecoes_id INT NOT NULL,
    rewies INT,
    desconto INT,
    categoria_id INT,
    FOREIGN KEY (categoria_id) REFERENCES tb_category(id)
);

INSERT INTO tb_produto
    (nome, descricao, img_id, valor, tamanho, cor, quantidade, referencia, marca_id, estado, colecoes_id, rewies, categoria_id)
VALUES
    ('SLIPSTREAM HI HERITAGE', 
    'Um tênis de basquete que voa alto, dá enterradas e mostra quem você é. Agora, ele é acompanhado pelo Slipstream Hi um retrabalho do original que traz uma energia totalmente nova ao jogo, mantendo-se fiel às raízes esportivas do OG.', 
    '2',
    '799',
    '39',
    'Preto e Branco',
    '1',
    '32017',
    '1',
    'Novo',
    '1',
    '5',
    '1');