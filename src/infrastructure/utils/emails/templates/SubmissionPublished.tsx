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
        <Tailwind config={{ presets: [pixelBasedPreset] }}>
            <Html>
                <Head />

                <Preview>
                    Congratulations! Your research is now live and available to readers.
                </Preview>

                <Body>
                    <Container>
                        <Section>

                            <Text>
                                Dear {authorName},
                            </Text>

                            <Text>
                                Congratulations! Your research,
                                <br />
                                <br />
                                <strong>&ldquo;{submissionTitle}&rdquo;</strong>,
                                <br />
                                <br />
                                has been published on Research Minds Net.
                            </Text>

                            <Section>
                                <Button href={publishedUrl}>
                                    View Published Research
                                </Button>
                            </Section>

                            <Text>
                                You can access your published research using the link above.
                            </Text>

                            <Hr />

                            <Text>
                                Thank you for sharing your work with Research Minds Net.
                                We appreciate your contribution and look forward to more research
                                from you in the future.
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