import express from 'express';
import paymentRoutes from './routes/paymentRoutes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', paymentRoutes);

app.get('/', (req, res) => {
    res.send('API is running');
    }
);

export default app;
