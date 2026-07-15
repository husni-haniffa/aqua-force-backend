import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Tailwind,
    Text,
    pixelBasedPreset,
} from "react-email";
import { SubmissionEmailProps } from "../../../../config/email";

export default function SubmissionApproved({
    authorName,
    submissionTitle,
}: SubmissionEmailProps) {
    return (
        <Html>
            <Head />
            <Tailwind config={{ presets: [pixelBasedPreset] }}>
                <Preview>
                    Congratulations! Your research has successfully passed our review process.
                </Preview>

                <Body className="bg-gray-100 font-sans">
                    <Container className="mx-auto my-10 max-w-[600px] rounded-lg bg-white px-6 py-10 sm:px-4 sm:py-6">
                        <Section>
                            <Heading className="mb-4 text-center text-[22px] font-bold leading-tight text-gray-900 sm:text-[20px]">
                                Submission Approved
                            </Heading>

                            <Text className="text-[15px] leading-6 text-gray-800">
                                Dear {authorName},
                            </Text>

                            <Text className="text-[15px] leading-6 text-gray-800">
                                We are pleased to inform you that your research submission,{" "}
                                <strong>&ldquo;{submissionTitle}&rdquo;</strong>, has successfully
                                passed our review process and has been approved.
                            </Text>

                            <Text className="text-[15px] leading-6 text-gray-800">
                                Congratulations on reaching this milestone, and thank you for
                                choosing Research Minds Net to share your research. We appreciate
                                the time, effort, and dedication you invested in preparing and
                                submitting your work.
                            </Text>

                            <Hr className="my-6 border-gray-200" />

                            <Text className="text-[15px] leading-6 text-gray-800">
                                Your submission has now progressed to the next stage of our
                                publication process.{" "}
                                <strong>Approval does not guarantee publication.</strong> Our
                                editorial team will carefully consider your research for
                                publication, and you will be notified of the final decision once
                                the evaluation has been completed.
                            </Text>

                            <Text className="text-[15px] leading-6 text-gray-800">
                                If your research is selected for publication, we will send you a
                                separate email containing the publication details.
                            </Text>

                            <Text className="text-[15px] leading-6 text-gray-800">
                                If you have any questions or require further assistance, please
                                don&apos;t hesitate to contact our support team. We&apos;re always
                                happy to help.
                            </Text>

                            <Hr className="my-6 border-gray-200" />

                            <Text className="text-[15px] leading-6 text-gray-800">
                                Thank you once again for your valuable contribution. We appreciate
                                your trust in Research Minds Net and wish you continued success in
                                your research journey.
                            </Text>

                            <Text className="text-[15px] leading-6 text-gray-800">
                                Kind regards,
                                <br />
                                Research Minds Net Management Team
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}