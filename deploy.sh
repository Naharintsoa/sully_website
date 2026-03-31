#!/bin/bash
set -e

export NVM_DIR="/home/deploy/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

echo "📦 Installation des dépendances..."
npm ci --production=false

echo "🔨 Build Next.js..."
npm run build

echo "🔄 Redémarrage PM2..."
pm2 restart ecosystem.config.js --env production --update-env || pm2 start ecosystem.config.js --env production

echo "💾 Sauvegarde PM2..."
pm2 save

echo "✅ Déploiement terminé"
