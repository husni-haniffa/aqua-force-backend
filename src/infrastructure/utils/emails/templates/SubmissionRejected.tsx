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
        <Tailwind config={{ presets: [pixelBasedPreset] }}>
            <Html>
                <Head />

                <Preview>
                    We've completed our review. Please see the feedback from our team.
                </Preview>

                <Body>
                    <Container>
                        <Section>

                            <Text>
                                Dear {authorName},
                            </Text>

                            <Text>
                                We have completed the review of your submission,
                                <br />
                                <br />
                                <strong>&ldquo;{submissionTitle}&rdquo;</strong>.
                                <br />
                                <br />
                                After careful consideration, we are unable to approve it for
                                publication at this time.
                            </Text>

                            <Section>
                                <Text>
                                    Feedback from our team:
                                </Text>

                                <Text>
                                    {rejectedReason}
                                </Text>
                            </Section>

                            <Text>
                                We appreciate the time and effort you put into your research.
                                We encourage you to consider the feedback and submit future work
                                to Research Minds Net.
                            </Text>

                            <Hr />

                            <Text>
                                If you have any questions regarding this decision, please feel free
                                to contact our support team.
                            </Text>

                            <Text>
                                Thank you for your interest in Research Minds Net.
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