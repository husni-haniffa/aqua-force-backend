import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);
export const FROM = 'Research Minds Net <noreply@researchmindsnet.com>';

export interface SubmissionEmailProps {
    email?: string
    authorName: string
    submissionTitle: string
    requestedChanges?: string
    rejectedReason?: string
    publishedUrl?: string
}