#!/usr/bin/env bash
set -euo pipefail

# 1) Ir al escritorio
cd ~/Escritorio/pulsewebpro_current

# 2) Inicializar git (si no está inicializado)
git init
git branch -M main

# 3) Conectar al repo remoto (ajusta la URL si tu repo se llama distinto)
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/pulsewebpro/chatpulsewebpro.git

# 4) Añadir todos los archivos
git add .

# 5) Commit inicial
git commit -m "🚀 Subida completa del proyecto PulseWebPro Current"

# 6) Subir a GitHub
git push -u origin main
