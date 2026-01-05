# 🎣 Hooks Organization

## 📁 Estrutura Organizada por Domínio

```
hooks/
├── index.ts              → Exporta todos os hooks públicos
│
├── map/                  → Hooks relacionados ao mapa
│   ├── index.ts
│   ├── useMap.ts         → Hook principal do mapa
│   ├── useMapFilters.ts  → Lógica de filtros
│   └── useMapLocations.ts → Busca de locais
│
├── users/                → Hooks relacionados a usuários
│   ├── index.ts
│   ├── useUsers.ts       → Hook principal (orquestrador)
│   ├── useUserForm.ts    → Gerenciamento de formulário
│   ├── useUserState.ts   → Estado local (interno)
│   ├── useUserFetch.ts   → Busca de dados (interno)
│   └── useUserOperations.ts → Operações CRUD (interno)
│
├── charts/               → Hooks relacionados a gráficos
│   ├── index.ts
│   └── useCharts.ts      → Dados dos gráficos
│
└── calendar/             → Hooks relacionados ao calendário
    ├── index.ts
    └── useCalendar.ts    → Estado do calendário
```

## 🎯 Como Usar

### Importação Simplificada

```typescript
// ✅ Importar de hooks/ (recomendado)
import { useMap, useUsers, useCharts, useCalendar } from '../../hooks';

// ✅ Importar de domínio específico (se necessário)
import { useMap } from '../../hooks/map';
import { useUsers } from '../../hooks/users';
```

## 📋 Hooks Públicos vs Internos

### Hooks Públicos (Exportados)
- `useMap` - Hook principal do mapa
- `useMapFilters` - Filtros do mapa
- `useUsers` - Hook principal de usuários
- `useUserForm` - Formulário de usuários
- `useCharts` - Dados dos gráficos
- `useCalendar` - Estado do calendário

### Hooks Internos (Disponíveis mas não recomendados)
- `useMapLocations` - Usado internamente por `useMap`
- `useUserState` - Usado internamente por `useUsers`
- `useUserFetch` - Usado internamente por `useUsers`
- `useUserOperations` - Usado internamente por `useUsers`

## 🔄 Vantagens da Nova Estrutura

1. ✅ **Organização por domínio** - Fácil encontrar hooks relacionados
2. ✅ **Imports simplificados** - `from '../../hooks'` em vez de caminhos longos
3. ✅ **Separação clara** - Hooks públicos vs internos
4. ✅ **Escalável** - Fácil adicionar novos hooks por domínio
5. ✅ **Manutenível** - Estrutura clara e previsível

## 📚 Exemplos de Uso

### Map
```typescript
import { useMap } from '../../hooks';

const Map = () => {
  const { locations, loading, filteredLocations } = useMap();
  // ...
};
```

### Users
```typescript
import { useUsers, useUserForm } from '../../hooks';

const Users = () => {
  const { users, createUserHandler } = useUsers();
  const { formData, setFormData } = useUserForm();
  // ...
};
```

### Charts
```typescript
import { useCharts } from '../../hooks';

const Charts = () => {
  const { lineData, barData } = useCharts();
  // ...
};
```

### Calendar
```typescript
import { useCalendar } from '../../hooks';

const Calendar = () => {
  const { date, handleDateChange } = useCalendar();
  // ...
};
```

