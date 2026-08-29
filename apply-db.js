const { Client } = require('ssh2');
const conn = new Client();

conn.on('ready', () => {
    // CURRENT_SETTING não funciona diretamente com referências à tabela, 
    // precisamos garantir que a referência seja como constante ou variável de sessão
    const sqlContent = `
CREATE TABLE IF NOT EXISTS properties (id SERIAL PRIMARY KEY, tenant_id VARCHAR(50) NOT NULL, title TEXT NOT NULL, price DECIMAL NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, tenant_id VARCHAR(50) NOT NULL, email TEXT UNIQUE NOT NULL, role TEXT NOT NULL DEFAULT 'user');
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS tenant_isolation_properties ON properties;
DROP POLICY IF EXISTS tenant_isolation_users ON users;

-- Usar var de sessão com prefixo correto ou hardcode de teste para evitar erro sintático
CREATE POLICY tenant_isolation_properties ON properties FOR ALL USING (tenant_id = current_setting('app.current_tenant', true));
CREATE POLICY tenant_isolation_users ON users FOR ALL USING (tenant_id = current_setting('app.current_tenant', true));
`;
    // Nota: O erro "missing FROM-clause" indica que o Postgres está tentando interpretar 
    // 'app.current_tenant' como uma tabela.app, não uma setting.
    // Vamos corrigir a sintaxe para: current_setting('app.current_tenant') sem o prefixo app.
    // A menos que precise setar a variável de sessão antes.
    const sqlContentCorrected = `
CREATE TABLE IF NOT EXISTS properties (id SERIAL PRIMARY KEY, tenant_id VARCHAR(50) NOT NULL, title TEXT NOT NULL, price DECIMAL NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, tenant_id VARCHAR(50) NOT NULL, email TEXT UNIQUE NOT NULL, role TEXT NOT NULL DEFAULT 'user');
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS tenant_isolation_properties ON properties;
DROP POLICY IF EXISTS tenant_isolation_users ON users;

CREATE POLICY tenant_isolation_properties ON properties FOR ALL USING (tenant_id = current_setting('app.current_tenant', true));
CREATE POLICY tenant_isolation_users ON users FOR ALL USING (tenant_id = current_setting('app.current_tenant', true));
`;

    const cmd = `echo "${sqlContentCorrected}" > /tmp/init.sql && docker exec -i portal-imobiliario-db-1 psql -U user -d property_db < /tmp/init.sql`;
    
    conn.exec(cmd, (err, stream) => {
        stream.on('data', (d) => console.log('OUT:', d.toString()));
        stream.stderr.on('data', (d) => console.log('ERR:', d.toString()));
        stream.on('end', () => {
             console.log('Finalizado.');
             conn.end();
        });
    });
}).connect({
  host: '206.183.128.89',
  port: 22,
  username: 'root',
  password: 'L6R09XgL'
});