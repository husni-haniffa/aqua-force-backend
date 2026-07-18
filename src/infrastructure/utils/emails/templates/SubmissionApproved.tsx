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
        <Tailwind config={{ presets: [pixelBasedPreset] }}>
            <Html>
                <Head />

                <Preview>
                    Great news! Your submission has passed our review process and is now being considered for publication.
                </Preview>

                <Body>
                    <Container>
                        <Section>

                            <Text>
                                Dear {authorName},
                            </Text>

                            <Text>
                                Great news! Your submission,
                                <br />
                                <br />
                                <strong>&ldquo;{submissionTitle}&rdquo;</strong>,
                                <br />
                                <br />
                                has passed our review process and has been approved.
                            </Text>

                            <Text>
                                Your submission has now moved to the next stage and will be considered
                                for publication.
                            </Text>

                            <Text>
                                Please note that approval does not guarantee publication. You will
                                receive another email once a final decision has been made.
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