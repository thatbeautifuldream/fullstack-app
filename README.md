# Fullstack App with Auto-Generated API Client

This is a full-stack application with an **Express backend** and a **React Vite frontend**, designed to demonstrate how to:

- Build a backend API with Express and Swagger documentation.
- Auto-generate a type-safe API client for the frontend using OpenAPI Generator.
- Consume the backend API in the React frontend.

---

## Features

1. **Express Backend**:

   - RESTful APIs.
   - Swagger documentation (`/api-docs`).

2. **Type-safe API Client**:

   - Automatically generated using OpenAPI Generator.
   - Built on `typescript-axios`.

3. **React Vite Frontend**:
   - Consumes the API client with type safety.
   - Displays data from the backend.

---

## Project Structure

```bash
backend/
├── src/
│   ├── index.ts
│   ├── routes.ts
│   └── types.ts
├── package.json
├── openapitools.json
└── tsconfig.json

frontend/
├── src/
│   ├── generated-client/
│   │   ├── api.ts
│   │   ├── base.ts
│   │   ├── common.ts
│   │   ├── configuration.ts
│   │   └── index.ts
│   ├── App.tsx
│   └── api.ts
├── package.json
└── tsconfig.json
```

## Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Run the server:

```bash
npm run dev
```

The backend will be available at `http://localhost:3000`.
You can also access the Swagger UI at `http://localhost:3000/api-docs`.
And the Swagger JSON at `http://localhost:3000/swagger.json`.

## Generate API Client

- Install openapi-generator-cli

```bash
npm install -g @openapitools/openapi-generator-cli
```

- Generate API Client

```bash
cd backend
npm run generate-client
```

The generated client will be in the `frontend/src/generated-client` directory.

The actual script is in the `backend/package.json` file:

`openapi-generator-cli generate -i http://localhost:3000/swagger.json -g typescript-axios -o ../frontend/src/generated-client`

## Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run the frontend:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`.

## How frontend uses the API client

The frontend uses the API client to fetch data from the backend.

The API client is generated using OpenAPI Generator and is located in the `frontend/src/generated-client` directory.

The `api.ts` file in the frontend imports the API client and uses it to fetch data from the backend.

The `App.tsx` file in the frontend uses the API client to fetch data from the backend and displays it.

```tsx
import React, { useEffect, useState } from "react";
import api from "./api";
import { User } from "./generated-client/api";

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.apiUsersGet();
        setUsers(response?.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.id}: {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
```

## Scripts

> backend/package.json

```json
"scripts": {
  "dev": "ts-node-dev src/index.ts",
  "generate-client": "openapi-generator-cli generate -i http://localhost:3000/swagger.json -g typescript-axios -o ../frontend/src/generated-client"
}
```

> frontend/package.json

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview"
}
```

> API Client generation is in the backend/package.json file:

```json
"generate-client": "openapi-generator-cli generate -i http://localhost:3000/swagger.json -g typescript-axios -o ../frontend/src/generated-client"
```
