-- Migrações para suporte geoespacial (PostgreSQL/PostGIS)

-- Habilitar extensão PostGIS se não estiver instalada
CREATE EXTENSION IF NOT EXISTS postgis;

-- Atualizar tabela properties para incluir dados geográficos
ALTER TABLE properties ADD COLUMN IF NOT EXISTS location GEOGRAPHY(POINT, 4326);

-- Índice GIST para performance geoespacial
CREATE INDEX IF NOT EXISTS idx_properties_location ON properties USING GIST (location);

-- Opcional: Adicionar colunas para endereços estruturados (se necessário)
ALTER TABLE properties ADD COLUMN IF NOT EXISTS address_raw TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS state TEXT;
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties (city);
CREATE INDEX IF NOT EXISTS idx_properties_state ON properties (state);

-- Garantir que as políticas RLS continuem válidas (nenhuma mudança necessária na política, mas bom checar)
-- As políticas RLS existentes continuam sendo aplicadas.
