import 'express-async-errors';
import express, { Request, Response } from 'express';
import { connectDatabase } from './config/database';
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
import React from 'react';
import { clerkMiddleware } from '@clerk/express';
import { SubmissionApproved, SubmissionReceived, SubmissionPublished, SubmissionRejected, SubmissionRequestChanges } from './infrastructure/utils/emails/templates';
import { render } from '@react-email/render';

const app = express();

const port = 3001;

app.set('trust proxy', 1);

dotenv.config()

connectDatabase()

app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "https://research-minds-net-frontend.vercel.app",
            "https://www.researchmindsnet.com",
            "https://researchmindsnetdev.netlify.app",
            "https://dev.researchmindsnet.com"
        ],
    })
);

app.use(express.json());

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

app.get("/preview/:type", async (req, res) => {
    const { type } = req.params;

    let component: React.ReactElement | undefined;

    switch (type) {
        case "received":
            component = React.createElement(SubmissionReceived, {
                authorName: "John Doe",
                submissionTitle: "AI Research",
            });
            break;

        case "approved":
            component = React.createElement(SubmissionApproved, {
                authorName: "John Doe",
                submissionTitle: "AI Research",
            });
            break;

        case "changes-requested":
            component = React.createElement(SubmissionRequestChanges, {
                authorName: "John Doe",
                submissionTitle: "AI Research",
                requestedChanges: "Please update the methodology section and fix the references.",
            });
            break;

        case "rejected":
            component = React.createElement(SubmissionRejected, {
                authorName: "John Doe",
                submissionTitle: "AI Research",
                rejectedReason: "The submission does not meet the publication guidelines.",
            });
            break;

        case "published":
            component = React.createElement(SubmissionPublished, {
                authorName: "John Doe",
                submissionTitle: "AI Research",
                publishedUrl: "https://researchmindsnet.com/publications/ai-research",
            });
            break;

        default:
            return res.status(404).send("Template not found");
    }

    const html = await render(component);

    res.setHeader("Content-Type", "text/html");
    res.send(html);
});


app.use(GlobalErrorHandler)

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});

export default app;