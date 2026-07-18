import { FROM, resend, SubmissionEmailProps } from "../../../config/email";
import { render } from '@react-email/render';
import { SubmissionApproved, SubmissionPublished, SubmissionRejected, SubmissionReceived, SubmissionRequestChanges } from "./templates";

export async function sendSubmissionReceivedEmail(
    params: SubmissionEmailProps
) {
    const { authorName, email, submissionTitle } = params

    const html = await render(
        SubmissionReceived({
            authorName,
            submissionTitle
        })
    )

    const { data, error } = await resend.emails.send({
        from: FROM,
        to: email || 'researchmindsnet@gmail.com',
        subject: "We've received your submission",
        html
    })

    if (error) {
        console.error('Failed to send submission received email:', {
            email,
            error,
        });
        return { success: false, error };
    }

    return { success: true, data };
}

export async function sendSubmissionApprovedEmail(
    params: SubmissionEmailProps
) {
    const { authorName, email, submissionTitle } = params

    const html = await render(
        SubmissionApproved({
            authorName,
            submissionTitle
        })
    )

    const { data, error } = await resend.emails.send({
        from: FROM,
        to: email || 'researchmindsnet@gmail.com',
        subject: "Your submission has been approved",
        html
    })

    if (error) {
        console.error('Failed to send submission approved email:', {
            email,
            error,
        });
        return { success: false, error };
    }

    return { success: true, data };
}

export async function sendSubmissionRejectedEmail(
    params: SubmissionEmailProps
) {
    const { authorName, email, submissionTitle, rejectedReason } = params

    const html = await render(
        SubmissionRejected({
            authorName,
            submissionTitle,
            rejectedReason
        })
    )

    const { data, error } = await resend.emails.send({
        from: FROM,
        to: email || 'researchmindsnet@gmail.com',
        subject: 'Update on your submission',
        html
    })

    if (error) {
        console.error('Failed to send submission rejected email:', {
            email,
            error,
        });
        return { success: false, error };
    }

    return { success: true, data };
}

export async function sendSubmissionPublishedEmail(
    params: SubmissionEmailProps
) {
    const { authorName, email, submissionTitle, publishedUrl } = params

    const html = await render(
        SubmissionPublished({
            authorName,
            submissionTitle,
            publishedUrl
        })
    )

    const { data, error } = await resend.emails.send({
        from: FROM,
        to: email || 'researchmindsnet@gmail.com',
        subject: 'Your research is now published',
        html
    })

    if (error) {
        console.error('Failed to send submission published email:', {
            email,
            error,
        });
        return { success: false, error };
    }

    return { success: true, data };
}

export async function sendSubmissionRequestChangesEmail(
    params: SubmissionEmailProps
) {
    const { authorName, email, submissionTitle, requestedChanges } = params

    const html = await render(
        SubmissionRequestChanges({
            authorName,
            submissionTitle,
            requestedChanges
        })
    )

    const { data, error } = await resend.emails.send({
        from: FROM,
        to: email || 'researchmindsnet@gmail.com',
        subject: 'Changes requested for your submission',
        html
    })

    if (error) {
        console.error('Failed to send submission request changes email:', {
            email,
            error,
        });
        return { success: false, error };
    }

    return { success: true, data };
}