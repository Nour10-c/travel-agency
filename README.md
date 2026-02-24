# Travel Agency Application

Une application web complète pour une agence de voyage avec authentification, gestion des voyages et réservations.

## Architecture

- **Frontend**: React.js avec routing et authentification
- **Backend**: Node.js/Express avec API REST
- **Base de données**: MongoDB
- **Conteneurisation**: Docker & Docker Compose
- **Orchestration**: Kubernetes
- **CI/CD**: GitHub Actions

## Fonctionnalités

- **Authentification des pèlerins** (inscription/connexion)
- **Gestion des pèlerinages** Omra et Hajj (affichage, réservation)
- **Suivi des réservations** avec statut en temps réel
- **Interface admin** pour gérer les voyages de pèlerinage
- **API REST complète** avec tests automatisés
- **Background animé** avec images de pèlerins

## DevOps Components Inclus

### Conteneurisation
- Dockerfiles pour frontend et backend
- Docker Compose pour développement local
- Images optimisées avec multi-stage builds

### Orchestration
- Déploiements Kubernetes complets
- Services et PersistentVolumeClaims
- Health checks et probes

### CI/CD
- Pipeline GitHub Actions pour tests et déploiement
- Tests automatisés (Jest/Supertest)
- Build et push d'images Docker

### Monitoring & Observabilité
- Health checks API (/health)
- Logs structurés avec Morgan
- Sécurité avec Helmet.js

### Sécurité
- Gestion des secrets dans Kubernetes
- CORS configuré
- Validation des entrées
- Authentification JWT

## Démarrage Rapide

### Développement Local
```bash
# Démarrer tous les services
docker-compose up --build

# Ou démarrer individuellement
cd backend && npm run dev
cd frontend && npm start
```

### Production
```bash
# Build et déploiement avec Docker
docker-compose -f docker-compose.prod.yml up --build

# Ou avec Kubernetes
kubectl apply -f K8s/
```

## Tests

```bash
# Tests backend
cd backend && npm test

# Tests frontend
cd frontend && npm test
```

## API Endpoints

- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/trips` - Liste des voyages
- `POST /api/trips` - Ajouter un voyage (admin)
- `GET /api/bookings` - Réservations utilisateur
- `POST /api/bookings` - Créer une réservation
- `GET /health` - Health check

## Variables d'Environnement

- `NODE_ENV`: Environnement (development/production)
- `MONGO_URI`: URI MongoDB
- `JWT_SECRET`: Clé secrète JWT
- `PORT`: Port du serveur (défaut: 5000)

## Structure du Projet

```
travel-agency/
├── backend/
│   ├── Dockerfile/
│   ├── src/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── app.js
│   ├── test/
│   └── package.json
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   └── services/
│   └── package.json
├── K8s/
│   └── deployment.yaml
├── .github/workflows/
│   └── ci-cd.yml
├── docker-compose.yml
└── README.md
```

## Recommandations DevOps

L'application inclut maintenant toutes les briques DevOps essentielles :

✅ **Conteneurisation** - Dockerfiles optimisés
✅ **Orchestration** - Kubernetes manifests
✅ **CI/CD** - Pipeline GitHub Actions
✅ **Tests** - Couverture automatisée
✅ **Monitoring** - Health checks et logs
✅ **Sécurité** - Gestion des secrets et headers
✅ **Persistance** - Volumes MongoDB
✅ **Réseau** - Services et load balancing

Pour une production complète, considérez ajouter :
- Monitoring avancé (Prometheus/Grafana)
- Logging centralisé (ELK stack)
- Backup automatisé
- Blue-green deployments
