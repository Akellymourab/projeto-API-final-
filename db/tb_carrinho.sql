CREATE TABLE tb_carrinho (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at DATETIME NULL,
    produto_id INT,
    cliente_id INT,
    cupons_id INT,
    valor DECIMAL
);

INSERT INTO tb_carrinho
    (produto_id, cliente_id, cupons_id, valor)
VALUES
    ('2', '5', '2', '799');