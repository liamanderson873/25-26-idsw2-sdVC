<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md)|
|-:|

</div>

# Frontend — React + Vite

Interfaz web del sistema Jorgestor. Consume la API REST del backend Spring Boot.

## Stack

|||
|-|-|
React 18|Componentes por vista (Boundary en BCE)
Vite|Bundler y servidor de desarrollo con HMR
TanStack Query|Gestión de estado del servidor, caché y estados de carga/error
React Router DOM|Enrutamiento SPA con `useNavigate` y `useSearchParams`
Axios|Cliente HTTP para las llamadas a la API

## Estructura

```
src/
├── pages/        # Una página por caso de uso (Boundary)
├── components/   # Componentes reutilizables
├── hooks/        # Custom hooks (TanStack Query)
├── api/          # Funciones de llamada a la API (axios)
└── main.tsx      # Punto de entrada + router
```

## Inicio

```powershell
.\start-all.ps1
```

O manualmente:

```powershell
cd frontend
npm install
npm run dev
```
