import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Register routes from centralized index
routes.forEach((r) => {
  app.use(r.path, r.router as any);
});

app.get('/', (_, res) => res.json({ ok: true }));

export default app;
