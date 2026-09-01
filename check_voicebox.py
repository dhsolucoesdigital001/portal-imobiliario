import requests
import datetime

endpoints_file = r"A:\OpenClawinstalação\.openclaw\.openclaw\workspace\endpoints.txt"
audit_log = r"A:\OpenClawinstalação\.openclaw\.openclaw\workspace\audit_log.txt"

def check_endpoints():
    with open(endpoints_file, 'r') as f:
        lines = f.readlines()
    
    with open(audit_log, 'a') as log:
        log.write(f"\n--- Auditoria iniciada em {datetime.datetime.now()} ---\n")
        
        for line in lines:
            line = line.strip()
            if not line or "@router.get(" not in line:
                continue
            
            # Extrair o endpoint da linha (ex: V:\...\routes\audio.py:@router.get("/audio/{version_id}"))
            try:
                endpoint = line.split('@router.get("')[1].split('"')[0]
                # Simulação básica de verificação (como não tenho o serviço rodando aqui, logarei tentativa)
                # Nota: Em ambiente real, aqui faria requests.get(base_url + endpoint)
                log.write(f"[{datetime.datetime.now()}] Verificando endpoint: {endpoint} -> Status: Simulado (pendente de integração com o serviço real)\n")
            except Exception as e:
                log.write(f"[{datetime.datetime.now()}] Erro ao processar linha: {line}. Erro: {e}\n")

if __name__ == "__main__":
    check_endpoints()
