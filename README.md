## Estructura de Client y Branch
El sistema implementa los módulos de Client (cliente) y Branch (sucursal) siguiendo la Arquitectura Limpia, dividiendo la lógica en capas bien definidas:
```
src/
│
├── domain/
│   ├── entities/
│   │   ├── Client.js         # Entidad Client (modelo de negocio)
│   │   └── Branch.js         # Entidad Branch (modelo de negocio)
│   └── repositories/
│       ├── ClientRepository.js   # Interfaz abstracta de repositorio
│       └── BranchRepository.js   # Interfaz abstracta de repositorio
│
├── application/
│   ├── dtos/
│   │   ├── ClientDTO.js      # Objeto de transferencia de datos de cliente
│   │   └── BranchDTO.js      # Objeto de transferencia de datos de sucursal
│   └── use_cases/
│       ├── CreateClient.js   # Caso de uso: crear cliente
│       └── CreateBranch.js   # Caso de uso: crear sucursal
│
├── adapters/
│   └── controllers/
│       ├── ClientController.js  # Controlador HTTP de cliente
│       └── BranchController.js  # Controlador HTTP de sucursal
│
├── infrastructure/
│   └── repositories/
│       ├── MongoClientRepository.js  # Implementación MongoDB para Client
│       └── MongoBranchRepository.js  # Implementación MongoDB para Branch
│
└── routes/
    ├── clientRoutes.js       # Rutas Express para cliente
    └── branchRoutes.js       # Rutas Express para sucursal
```