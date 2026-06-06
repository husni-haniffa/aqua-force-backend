import 'express-async-errors';
import express from 'express';
import { connectDatabase } from './infrastructure/database';
import dotenv from 'dotenv'
import categoryRouter from './api/category';
import GlobalErrorHandler from './domain/middleware/global-error-handler';
import newsRouter from './api/news';
import eventRouter from './api/event';
import submissionRouter from './api/submission';
import cors from 'cors';
import userRouter from './api/user';
import adminRouter from './api/admin';
import publicationRouter from './api/publication';
import researchTypeRouter from './api/researchType';
import conductResearchRouter from './api/conduct-research';
import { clerkMiddleware } from '@clerk/express';

const app = express();
app.set('trust proxy', 1);
dotenv.config()
connectDatabase()
const PORT = process.env.PORT || 3001;

const corsOptions = {
    credentials: true,
    origin: ['https://aqua-force-frontend.vercel.app', 'http://localhost:3000', 'https://researchmindsnet.netlify.app']
};

app.use(express.json())
app.use(cors(corsOptions));
app.use(clerkMiddleware());
app.use('/categories', categoryRouter)
app.use('/news', newsRouter)
app.use('/events', eventRouter)
app.use('/users', userRouter)
app.use('/submissions', submissionRouter)
app.use('/publications', publicationRouter)
app.use('/research-types', researchTypeRouter)
app.use('/conduct-research', conductResearchRouter)
app.use('/admin', adminRouter)
app.use(GlobalErrorHandler)

const startServer = async () => {
    try {
        await connectDatabase();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Server startup failed", error);
    }
};

startServer();