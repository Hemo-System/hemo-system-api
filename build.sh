#!/bin/bash

# filepath: /Users/garcia/Desktop/unit/nest-js/hemo_system/build.sh

# Exibe cada comando antes de executá-lo
set -e

echo "Atualizando o repositório..."
git fetch --all
git pull

echo "Parando e removendo containers antigos..."
docker compose down

echo "Construindo as imagens Docker..."
docker compose build

echo "Iniciando os containers..."
docker compose up -d

echo "Exibindo os logs dos containers..."
docker compose logs -f