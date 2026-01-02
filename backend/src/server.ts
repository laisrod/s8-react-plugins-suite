import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import { router as userRoutes } from './routes/userRoutes.js';
import { router as mapLocationRoutes } from './routes/mapLocationRoutes.js';
import { router as calendarEventRoutes } from './routes/calendarEventRoutes.js';
import { router as chartDataRoutes } from './routes/chartDataRoutes.js';

// Carregar variáveis de ambiente
dotenv.config();

const app: Express = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// Middlewares
app.use(cors()); // Permite requisições do frontend
app.use(express.json()); // Permite receber JSON no body

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/map-locations', mapLocationRoutes);
app.use('/api/calendar-events', calendarEventRoutes);
app.use('/api/chart-data', chartDataRoutes);

// Rota de teste
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'API funcionando!',
    endpoints: {
      users: '/api/users',
      mapLocations: '/api/map-locations',
      calendarEvents: '/api/calendar-events',
      chartData: '/api/chart-data'
    }
  });
});

// Conectar ao banco e iniciar servidor
const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`API disponível em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(' Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

startServer();