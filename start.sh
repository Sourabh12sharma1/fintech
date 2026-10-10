#!/bin/bash
# FinSight AI — Start Script
# Usage: bash start.sh

echo "========================================"
echo "  FinSight AI — Startup"
echo "========================================"
echo ""

# Verify dependencies
command -v python3 >/dev/null 2>&1 || { echo "Python 3 required"; exit 1; }
command -v node >/dev/null 2>&1 || { echo "Node.js required"; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "npm required"; exit 1; }

# Setup backend
echo "[1/3] Setting up Django backend..."
cd "$(dirname "$0")/backend"
python3 -m venv venv 2>/dev/null
source venv/bin/activate
pip install -q django djangorestframework django-cors-headers 2>&1 | grep -v "already satisfied" | head -5
python manage.py migrate --run-syncdb --noinput 2>&1 | tail -3
echo "  Backend ready"
echo ""

# Build frontend if needed
echo "[2/3] Building React frontend..."
cd "$(dirname "$0")/frontend"
if [ ! -d "node_modules" ]; then
    npm install 2>&1 | tail -3
fi
npm run build 2>&1 | tail -5
echo "  Frontend built"
echo ""

# Start servers
echo "[3/3] Starting servers..."
cd "$(dirname "$0")/backend"
source venv/bin/activate
python manage.py runserver 0.0.0.0:8000 --noreload > /tmp/finsight-django.log 2>&1 &
DJANGO_PID=$!
echo "  Django PID: $DJANGO_PID"

sleep 3

echo ""
echo "========================================"
echo "  FinSight AI is running!"
echo "========================================"
echo ""
echo "  Frontend:  http://localhost:8000"
echo "  API:       http://localhost:8000/api/"
echo "  Health:    http://localhost:8000/health/"
echo ""
echo "Press Ctrl+C to stop servers"
trap "kill $DJANGO_PID 2>/dev/null; echo 'Stopped.'; exit 0" INT TERM
wait
