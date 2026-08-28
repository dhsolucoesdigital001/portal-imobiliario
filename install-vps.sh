#!/bin/bash
# Install Docker and Docker Compose
apt-get update
apt-get install -y docker.io docker-compose
systemctl enable docker
systemctl start docker
echo "Docker installed."
