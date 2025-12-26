import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import { router as userRoutes } from './routes/userRoutes.js';

// Carregar variáveis de ambiente
dotenv.config();

const app: Express = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// Middlewares
app.use(cors()); // Permite requisições do frontend
app.use(express.json()); // Permite receber JSON no body

// Rotas
app.use('/api/users', userRoutes);

// Rota de teste
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'API funcionando!' });
});

// Conectar ao banco e iniciar servidor
const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📡 API disponível em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

startServer();