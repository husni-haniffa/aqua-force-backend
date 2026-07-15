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

export default function SubmissionReceived({
    authorName,
    submissionTitle,
}: SubmissionEmailProps) {
    return (
        <Html>
            <Head />
            <Tailwind config={{ presets: [pixelBasedPreset] }}>
                <Preview>
                    We&apos;ve received your research submission to Research Minds Net.
                </Preview>

                <Body className="bg-gray-100 font-sans">
                    <Container className="mx-auto my-10 max-w-[600px] rounded-lg bg-white px-6 py-10 sm:px-4 sm:py-6">
                        <Section>
                            <Heading className="mb-4 text-center text-[22px] font-bold leading-tight text-gray-900 sm:text-[20px]">
                                Submission Received
                            </Heading>

                            <Text className="text-[15px] leading-6 text-gray-800">
                                Dear {authorName},
                            </Text>

                            <Text className="text-[15px] leading-6 text-gray-800">
                                Thank you for submitting your research,{" "}
                                <strong>&ldquo;{submissionTitle}&rdquo;</strong>, to Research Minds
                                Net. We have successfully received your submission and it is now
                                queued for review.
                            </Text>

                            <Hr className="my-6 border-gray-200" />

                            <Text className="text-[15px] leading-6 text-gray-800">
                                Our editorial team will carefully evaluate your work, and you will
                                be notified by email as soon as a decision has been made regarding
                                the next steps.
                            </Text>

                            <Text className="text-[15px] leading-6 text-gray-800">
                                If you have any questions in the meantime, please don&apos;t
                                hesitate to reach out to our support team. We&apos;re always happy
                                to help.
                            </Text>

                            <Hr className="my-6 border-gray-200" />

                            <Text className="text-[15px] leading-6 text-gray-800">
                                Thank you for choosing Research Minds Net to share your research.
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