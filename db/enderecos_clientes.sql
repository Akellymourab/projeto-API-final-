CREATE TABLE enderecos_clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT,
  endereco VARCHAR(100) NOT NULL,
  cidade VARCHAR(50) NOT NULL,
  estado VARCHAR(2) NOT NULL,
  cep VARCHAR(10) NOT NULL,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id),
);

INSERT INTO enderecos_clientes (cliente_id, endereco, cidade, estado, cep)
 VALUES (1, 'Rua A, 123', 'São Paulo', 'SP', '12345-678');

ALTER TABLE enderecos_clientes
ADD COLUMN status INT DEFAULT 1;
ALTER TABLE enderecos_clientes
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE enderecos_clientes
ADD COLUMN update_at DATETIME NULL;