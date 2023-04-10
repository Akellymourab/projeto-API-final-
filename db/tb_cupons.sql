CREATE TABLE tb_cupons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at DATETIME NULL,
    produto_id INT,
    cliente_id INT,
    FOREIGN KEY (produto_id) REFERENCES tb_produto(id),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    desconto INT 
);
INSERT INTO tb_cupons
    (produto_id, cliente_id, desconto )
VALUES
    ('1', '1', '30');