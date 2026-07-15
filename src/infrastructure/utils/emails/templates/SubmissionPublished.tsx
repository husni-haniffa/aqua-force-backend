import {
    Body,
    Button,
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

export default function SubmissionPublished({
    authorName,
    submissionTitle,
    publishedUrl,
}: SubmissionEmailProps) {
    return (
        <Html>
            <Head />
            <Tailwind config={{ presets: [pixelBasedPreset] }}>
                <Preview>
                    Great news! Your research has been published on Research Minds Net.
                </Preview>

                <Body className="bg-gray-100 font-sans">
                    <Container className="mx-auto my-10 max-w-[600px] rounded-lg bg-white px-6 py-10 sm:px-4 sm:py-6">
                        <Section>
                            <Heading className="mb-4 text-center text-[22px] font-bold leading-tight text-gray-900 sm:text-[20px]">
                                Your Research Has Been Published
                            </Heading>

                            <Text className="text-[15px] leading-6 text-gray-800">
                                Dear {authorName},
                            </Text>

                            <Text className="text-[15px] leading-6 text-gray-800">
                                We are delighted to inform you that your research,{" "}
                                <strong>&ldquo;{submissionTitle}&rdquo;</strong>, has been
                                officially published on Research Minds Net.
                            </Text>

                            <Section className="my-6 text-center">
                                <Button
                                    href={publishedUrl}
                                    className="rounded-md bg-gray-900 px-6 py-3 text-[14px] font-semibold text-white"
                                >
                                    View Published Research
                                </Button>
                            </Section>

                            <Text className="break-all text-[13px] leading-6 text-gray-500">
                                Or copy this link into your browser: {publishedUrl}
                            </Text>

                            <Hr className="my-6 border-gray-200" />

                            <Text className="text-[15px] leading-6 text-gray-800">
                                Congratulations on this achievement. We encourage you to share
                                this publication with your peers and network.
                            </Text>

                            <Text className="text-[15px] leading-6 text-gray-800">
                                Thank you for choosing Research Minds Net to share your research,
                                and we look forward to your future contributions.
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