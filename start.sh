#!/usr/bin/env bash
set -e

echo "🚀 Starting LocalGist..."

# Comprobar si el usuario tiene permisos sobre el socket de Docker
DOCKER_PREFIX=""
if ! docker info >/dev/null 2>&1; then
  echo "⚠️  Docker daemon requires sudo privileges on this machine."
  DOCKER_PREFIX="sudo"
fi

# Detectar Docker Compose v2 vs v1
if docker compose version >/dev/null 2>&1; then
  $DOCKER_PREFIX docker compose up -d --build
elif command -v docker-compose >/dev/null 2>&1; then
  $DOCKER_PREFIX docker-compose up -d --build
else
  echo "❌ Error: Neither 'docker compose' nor 'docker-compose' was found."
  exit 1
fi

echo "✅ LocalGist is running!"
echo "👉 Frontend: http://localhost:3000"
echo "👉 Backend API: http://localhost:3001/api/snippets"