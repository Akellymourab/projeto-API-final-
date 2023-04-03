CREATE TABLE tb_pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at DATETIME NULL,
    pagamento_id INT,
    cliente_id INT,
    carrinho_id INT
);