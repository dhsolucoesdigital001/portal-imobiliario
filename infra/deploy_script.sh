#!/bin/bash
cd /var/www/portal-imobiliario
git pull origin main
docker compose up -d
curl -s http://localhost:3000 | head -n 15
