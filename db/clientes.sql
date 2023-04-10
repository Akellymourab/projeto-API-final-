CREATE TABLE clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  sobrenome VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  telefone VARCHAR(20),
  data_nascimento DATE,
  historico_compras TEXT,
  status INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_at DATETIME NULL
);

INSERT INTO clientes (nome, sobrenome, email, telefone, data_nascimento, historico_compras)
 VALUES ('João', 'Silva', 'joao.silva@gmail.com', '11 1234-5678', '1990-01-01', 'Comprado em 01/01/2022');
