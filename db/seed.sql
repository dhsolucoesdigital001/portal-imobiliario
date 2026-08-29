CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  role VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS properties (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  price DECIMAL NOT NULL,
  status VARCHAR(50),
  owner_id VARCHAR(50) REFERENCES users(id)
);

-- Seed de Dados Malha Ruflo
-- Usuários
INSERT INTO users (id, name, email, role) VALUES 
('u1', 'Admin', 'admin@ruflo.com', 'SUPER_ADMIN'),
('u2', 'Imobiliária Alpha', 'imob@alpha.com', 'IMOBILIARIA'),
('u3', 'Proprietário Joao', 'joao@prop.com', 'PROPRIETARIO')
ON CONFLICT (id) DO NOTHING;

-- Imóveis de Teste
INSERT INTO properties (id, title, price, status, owner_id) VALUES
('p1', 'Apartamento Luxo', 1500000, 'AVAILABLE', 'u3'),
('p2', 'Casa de Campo', 850000, 'AVAILABLE', 'u3')
ON CONFLICT (id) DO NOTHING;