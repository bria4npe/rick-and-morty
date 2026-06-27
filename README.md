# Rick & Morty Explorer

Explorador de personajes de Rick and Morty. Monorepo con BFF (Express) y frontend (React + Vite).

## Estructura

```bash
rick-and-morty/
├── back/
└── front/
```

## Requisitos

- Node.js >= 24

## Levantar el proyecto

### 1. Backend

```bash
cd back
cp .env.example .env
npm install
npm run dev
```

Corre en `http://localhost:3000`.

### 2. Frontend

```bash
cd front
cp .env.example .env
npm install
npm run dev
```

Corre en `http://localhost:5173`.

## Tests

```bash
# Backend
cd back && npm test

# Frontend
cd front && npm test
```
