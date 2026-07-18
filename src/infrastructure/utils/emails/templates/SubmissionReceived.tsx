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
        <Tailwind config={{ presets: [pixelBasedPreset] }}>
            <Html>
                <Head />

                <Preview>
                    Thanks for submitting your research. Our team will review it and keep you updated.
                </Preview>

                <Body>
                    <Container>
                        <Section>
                            <Text>
                                Dear {authorName},
                            </Text>

                            <Text>
                                Thank you for submitting your research,
                                <br />
                                <br />
                                <strong>&ldquo;{submissionTitle}&rdquo;</strong>.
                                <br />
                                <br />
                                We have successfully received your submission and it is now under review.
                            </Text>

                            <Hr />

                            <Text>
                                Our team will review your submission and you will receive an email once
                                there is an update regarding the next steps.
                            </Text>

                            <Text>
                                If you have any questions, please feel free to contact our support team.
                            </Text>

                            <Hr />

                            <Text>
                                Thank you for sharing your research with Research Minds Net.
                            </Text>

                            <Text>
                                Kind regards,
                                <br />
                                Research Minds Net Team
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Html>
        </Tailwind>
    );
}