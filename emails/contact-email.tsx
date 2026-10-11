import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

import { BRAND } from "@/lib/brand-colors";

// Hex mirror of the tokens in app/globals.css (see lib/brand-colors.ts) —
// the pastel lime/blue/magenta used on the site's CTA buttons and hero panels,
// not the vivid --accent blue used for things like nav underlines.
const { lime: LIME, blue: BLUE, magenta: MAGENTA, navy: HEADING, mutedSoft: MUTED, border: BORDER } = BRAND;

// Hosted image, not embedded — email clients are unreliable with inline/
// base64 images, but reliably fetch a real HTTPS URL. Will 404 until
// legadocreativo.com is actually deployed; public/Logos/... is the source file.
const LOGO_URL = "https://legadocreativo.com/Logos/LEGADO_Logotipo-06.png";

export interface ContactEmailProps {
  name: string;
  email: string;
  company?: string;
  service: string;
  message: string;
  submittedAt: string;
}

export default function ContactEmail({
  name = "Jane Doe",
  email = "jane@example.com",
  company = "",
  service = "Visual identity",
  message = "Hi! We'd love to talk about a new brand identity for our restaurant group.",
  submittedAt = new Date().toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" }),
}: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        New message from {name} — {service}
      </Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Top accent bar — the same lime/blue/magenta trio used across
              the site's CTA buttons and section backgrounds. */}
          <div style={styles.accentBar} />

          <Section style={styles.header}>
            <Img src={LOGO_URL} alt="Legado Creativo" width="160" height="37" />
          </Section>

          <Section style={styles.content}>
            <Heading style={styles.heading}>New contact form submission</Heading>
            <Text style={styles.subheading}>
              Someone reached out through the website — details below.
            </Text>

            <Section style={styles.card}>
              <Field label="Name" value={name} />
              <Field
                label="Email"
                value={<Link href={`mailto:${email}`} style={styles.link}>{email}</Link>}
              />
              {company ? <Field label="Company" value={company} /> : null}
              <Field
                label="Interested in"
                value={<span style={styles.serviceBadge}>{service}</span>}
                noBorder
              />
            </Section>

            <Text style={styles.messageLabel}>Message</Text>
            <Section style={styles.messageBox}>
              <Text style={styles.messageText}>{message}</Text>
            </Section>

            <Link href={`mailto:${email}`} style={styles.replyButton}>
              Reply to {name.split(" ")[0]}
            </Link>
          </Section>

          <Hr style={styles.hr} />

          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              Sent from the contact form at{" "}
              <Link href="https://legadocreativo.com" style={styles.footerLink}>
                legadocreativo.com
              </Link>{" "}
              on {submittedAt}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

function Field({
  label,
  value,
  noBorder,
}: {
  label: string;
  value: React.ReactNode;
  noBorder?: boolean;
}) {
  return (
    <table
      role="presentation"
      width="100%"
      style={noBorder ? { ...styles.fieldRow, borderBottom: "none" } : styles.fieldRow}
      cellPadding={0}
      cellSpacing={0}
    >
      <tbody>
        <tr>
          <td style={styles.fieldLabel}>{label}</td>
          <td style={styles.fieldValue}>{value}</td>
        </tr>
      </tbody>
    </table>
  );
}

const styles: Record<string, React.CSSProperties> = {
  body: {
    backgroundColor: BRAND.card,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    margin: 0,
    padding: "32px 16px",
  },
  container: {
    backgroundColor: BRAND.white,
    borderRadius: 8,
    overflow: "hidden",
    maxWidth: 560,
    margin: "0 auto",
    border: `1px solid ${BORDER}`,
  },
  accentBar: {
    height: 6,
    background: `linear-gradient(90deg, ${LIME} 0%, ${BLUE} 55%, ${MAGENTA} 100%)`,
  },
  header: {
    padding: "28px 32px 8px",
  },
  content: {
    padding: "8px 32px 24px",
  },
  heading: {
    fontSize: 22,
    fontWeight: 700,
    color: HEADING,
    margin: "8px 0 4px",
  },
  subheading: {
    fontSize: 14,
    color: MUTED,
    margin: "0 0 20px",
  },
  card: {
    border: `1px solid ${BORDER}`,
    borderRadius: 6,
    padding: "4px 16px",
    marginBottom: 20,
  },
  fieldRow: {
    borderBottom: `1px solid ${BORDER}`,
  },
  fieldLabel: {
    fontSize: 13,
    color: MUTED,
    padding: "10px 8px 10px 0",
    width: 110,
    verticalAlign: "top",
  },
  fieldValue: {
    fontSize: 14,
    color: HEADING,
    fontWeight: 500,
    padding: "10px 0",
  },
  serviceBadge: {
    display: "inline-block",
    backgroundColor: LIME,
    color: HEADING,
    fontSize: 13,
    fontWeight: 600,
    padding: "4px 12px",
    borderRadius: 999,
  },
  messageLabel: {
    fontSize: 13,
    color: MUTED,
    margin: "0 0 8px",
  },
  messageBox: {
    backgroundColor: BRAND.background,
    border: `1px solid ${BORDER}`,
    borderRadius: 6,
    padding: "14px 16px",
    marginBottom: 24,
  },
  messageText: {
    fontSize: 14,
    lineHeight: "22px",
    color: HEADING,
    whiteSpace: "pre-wrap",
    margin: 0,
  },
  replyButton: {
    display: "inline-block",
    backgroundColor: LIME,
    color: HEADING,
    fontSize: 14,
    fontWeight: 700,
    textDecoration: "none",
    padding: "10px 22px",
    borderRadius: 999,
  },
  link: {
    color: BLUE,
    textDecoration: "underline",
  },
  hr: {
    borderColor: BORDER,
    margin: 0,
  },
  footer: {
    padding: "16px 32px",
  },
  footerText: {
    fontSize: 12,
    color: MUTED,
    margin: 0,
  },
  footerLink: {
    color: MUTED,
    textDecoration: "underline",
  },
};
