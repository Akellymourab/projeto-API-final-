CREATE TABLE forma_pagamento (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(50) NOT NULL,
  descricao TEXT,
  ativo BOOLEAN NOT NULL DEFAULT TRUE
);
ALTER TABLE forma_pagamento ADD created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, ADD updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

INSERT INTO forma_pagamento (nome, descricao) VALUES
  ('boleto', 'Forma de pagamento via boleto bancário.'),
  ('PIX', 'Forma de pagamento via transferência PIX.'),
  ('cartão', 'Forma de pagamento via cartão de crédito ou débito.');