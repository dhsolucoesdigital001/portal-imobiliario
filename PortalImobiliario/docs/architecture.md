# Arquitetura Multi-Tenant com RBAC

## Visão Geral
- **Multi-Tenancy:** Estrutura baseada em `tenant_id` em todas as tabelas principais. Isolamento a nível lógico (Row-Level Security).
- **RBAC (Role-Based Access Control):**
    - `SuperAdmin`: Gestão global da plataforma.
    - `TenantAdmin`: Gestão de imobiliária/usuário administrador.
    - `Agent`: Corretor/responsável pelo imóvel.
    - `Client`: Locatário/Comprador.

## Estrutura de Banco de Dados Sugerida
- Schema: Tenant Isolado no nível de aplicação (coluna `tenant_id`).
- Funções atômicas baseadas em tokens JWT que carregam o `tenant_id` do contexto.
