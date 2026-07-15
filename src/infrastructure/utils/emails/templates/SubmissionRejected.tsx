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


export default function SubmissionRejected({
    authorName,
    submissionTitle,
    rejectedReason,
}: SubmissionEmailProps) {
    return (
        <Html>
            <Head />
            <Tailwind config={{ presets: [pixelBasedPreset] }}>
                <Preview>
                    An update regarding your research submission to Research Minds Net.
                </Preview>

                <Body className="bg-gray-100 font-sans">
                    <Container className="mx-auto my-10 max-w-[600px] rounded-lg bg-white px-6 py-10 sm:px-4 sm:py-6">
                        <Section>
                            <Heading className="mb-4 text-center text-[22px] font-bold leading-tight text-gray-900 sm:text-[20px]">
                                Submission Update
                            </Heading>

                            <Text className="text-[15px] leading-6 text-gray-800">
                                Dear {authorName},
                            </Text>

                            <Text className="text-[15px] leading-6 text-gray-800">
                                Thank you for submitting your research,{" "}
                                <strong>&ldquo;{submissionTitle}&rdquo;</strong>, to Research Minds
                                Net. After careful review by our editorial team, we regret to
                                inform you that your submission has not been approved at this time.
                            </Text>

                            <Section className="my-6 rounded-md bg-gray-50 px-4 py-4">
                                <Text className="m-0 text-[14px] font-semibold text-gray-700">
                                    Reviewer feedback:
                                </Text>
                                <Text className="mb-0 mt-2 text-[15px] leading-6 text-gray-800">
                                    {rejectedReason}
                                </Text>
                            </Section>

                            <Text className="text-[15px] leading-6 text-gray-800">
                                We encourage you to consider this feedback and welcome future
                                submissions of revised or new research to Research Minds Net.
                            </Text>

                            <Hr className="my-6 border-gray-200" />

                            <Text className="text-[15px] leading-6 text-gray-800">
                                If you have any questions about this decision, please don&apos;t
                                hesitate to contact our support team.
                            </Text>

                            <Text className="text-[15px] leading-6 text-gray-800">
                                Thank you for your interest in Research Minds Net, and we wish you
                                continued success in your research journey.
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