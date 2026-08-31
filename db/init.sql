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

CREATE TABLE IF NOT EXISTS leads (
    id SERIAL PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL,
    data JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Adição de campos para busca avançada
ALTER TABLE properties ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS state VARCHAR(2);
ALTER TABLE properties ADD COLUMN IF NOT EXISTS type TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS bedrooms INT;

-- Indice para performance
CREATE INDEX IF NOT EXISTS idx_properties_city_state ON properties (city, state);
