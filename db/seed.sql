-- Seed de Dados Malha Ruflo
-- Usuários
INSERT INTO users (id, name, email, role) VALUES 
('u1', 'Admin', 'admin@ruflo.com', 'SUPER_ADMIN'),
('u2', 'Imobiliária Alpha', 'imob@alpha.com', 'IMOBILIARIA'),
('u3', 'Proprietário Joao', 'joao@prop.com', 'PROPRIETARIO');

-- Imóveis de Teste
INSERT INTO properties (id, title, price, status, owner_id) VALUES
('p1', 'Apartamento Luxo', 1500000, 'AVAILABLE', 'u3'),
('p2', 'Casa de Campo', 850000, 'AVAILABLE', 'u3');
