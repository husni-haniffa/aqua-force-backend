import express from 'express';
import { connectDatabase } from './infrastructure/database';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (_, res) => {
    res.send('Hello from TypeScript + Express!');
});

connectDatabase()

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});