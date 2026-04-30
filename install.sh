#!/bin/bash
# ============================================================
#  HELL-FIRE v2 — Restyle Installer (grafica v3)
#  Uso: sudo bash install.sh
# ============================================================
set -e
echo ""
echo "  ██╗  ██╗███████╗██╗     ██╗      ███████╗██╗██████╗ ███████╗"
echo "  ██║  ██║██╔════╝██║     ██║      ██╔════╝██║██╔══██╗██╔════╝"
echo "  ███████║█████╗  ██║     ██║█████╗█████╗  ██║██████╔╝█████╗  "
echo "  ██║  ██║██╔══╝  ██║     ██║╚════╝██╔══╝  ██║██╔══██╗██╔══╝  "
echo "  ██║  ██║███████╗███████╗███████╗ ██║     ██║██║  ██║███████╗"
echo "  ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝"
echo "  Restyle Installer — Tailwind / Glassmorphism / Arancione"
echo ""
if [ "$EUID" -ne 0 ]; then echo "❌  Esegui con sudo: sudo bash install.sh"; exit 1; fi

INSTALL_DIR="/opt/hellfire"
STATIC_DIR="$INSTALL_DIR/static"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ ! -d "$STATIC_DIR" ]; then
  echo "❌  $STATIC_DIR non trovata. Assicurati che HELL-FIRE sia installato in $INSTALL_DIR"
  exit 1
fi

echo "→ Backup file originali..."
BACKUP="$STATIC_DIR/backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP"
for f in common.css index.html manual.html auto.html; do
  [ -f "$STATIC_DIR/$f" ] && cp "$STATIC_DIR/$f" "$BACKUP/" && echo "   backed up: $f"
done

echo "→ Installazione nuovi file..."
cp "$SCRIPT_DIR/static/index.html"  "$STATIC_DIR/" && echo "   ✓ index.html"
cp "$SCRIPT_DIR/static/manual.html" "$STATIC_DIR/" && echo "   ✓ manual.html"
cp "$SCRIPT_DIR/static/auto.html"   "$STATIC_DIR/" && echo "   ✓ auto.html"
# Rimuovi common.css se esiste (non più necessario con Tailwind CDN)
[ -f "$STATIC_DIR/common.css" ] && rm "$STATIC_DIR/common.css" && echo "   ✓ common.css rimosso (ora usa Tailwind CDN)"

echo "→ Riavvio servizio..."
if systemctl is-active --quiet hellfire.service 2>/dev/null; then
  systemctl restart hellfire.service && echo "   ✓ hellfire.service riavviato"
else
  echo "   ⚠  hellfire.service non attivo — avvialo manualmente"
fi

echo ""
echo "══════════════════════════════════════════"
echo "  ✅  Restyle installato!"
echo "  Backup in: $BACKUP"
echo ""
echo "  Svuota cache Safari: tieni premuto ricarica"
echo "  → Ricarica senza cache"
echo "══════════════════════════════════════════"
