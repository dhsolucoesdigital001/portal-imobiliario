-- Criação de tabelas com tenant_id para isolamento
CREATE TABLE IF NOT EXISTS properties (
    id SERIAL PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL,
    title TEXT NOT NULL,
    price DECIMAL NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'user'
);

-- Ativar RLS
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY tenant_isolation_properties ON properties
    USING (tenant_id = current_setting('app.current_tenant'));

CREATE POLICY tenant_isolation_users ON users
    USING (tenant_id = current_setting('app.current_tenant'));
