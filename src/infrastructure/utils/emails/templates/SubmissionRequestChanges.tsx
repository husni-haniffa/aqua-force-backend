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

export default function SubmissionRequestChanges({
    authorName,
    submissionTitle,
    requestedChanges,
}: SubmissionEmailProps) {
    return (
        <Tailwind config={{ presets: [pixelBasedPreset] }}>
            <Html>
                <Head />

                <Preview>
                    Your submission needs a few revisions before we can continue the review process.
                </Preview>

                <Body>
                    <Container>
                        <Section>

                            <Text>
                                Dear {authorName},
                            </Text>

                            <Text>
                                We have reviewed your submission,
                                <br />
                                <br />
                                <strong>&ldquo;{submissionTitle}&rdquo;</strong>,
                                <br />
                                <br />
                                and would like you to make a few changes before we continue with
                                the review process.
                            </Text>

                            <Section>
                                <Text>
                                    Requested changes:
                                </Text>

                                <Text>
                                    {requestedChanges}
                                </Text>
                            </Section>

                            <Text>
                                Please update your submission based on the feedback above and
                                resubmit it when ready. Our team will continue the review process
                                once the changes have been made.
                            </Text>

                            <Hr />

                            <Text>
                                If you have any questions about the requested changes, please feel
                                free to contact our support team.
                            </Text>

                            <Text>
                                Thank you for your contribution to Research Minds Net.
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