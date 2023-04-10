CREATE TABLE imagens_pg3 (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  tipo_arquivo VARCHAR(50) NOT NULL,
  tamanho INT NOT NULL,
  conteudo LONGBLOB NOT NULL,
  UNIQUE KEY nome_UNIQUE (nome)
);

INSERT INTO imagens_pg3 (nome, tipo_arquivo, tamanho, link) 
VALUES ('tenis1', 'sgv', 1024, 'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/850b7cdf4c974c41aa12af8e00c3a24e_9366/Tenis_Stan_Smith_Vegan_Rosa_HQ6669_01_standard.jpg');


ALTER TABLE imagens_pg3
ADD COLUMN status INT DEFAULT 1;
ALTER TABLE imagens_pg3
ADD COLUMN link VARCHAR(255) AFTER tamanho;;
ALTER TABLE imagens_pg3
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE imagens_pg3
ADD COLUMN update_at DATETIME NULL;

ALTER TABLE imagens_pg3 DROP conteudo;
