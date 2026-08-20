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

// Same exact brand hex as emails/contact-email.tsx — keep both in sync by
// hand if the palette in app/globals.css ever changes.
const LIME = "#E0FEAE";
const BLUE = "#7A95D8";
const MAGENTA = "#EDB7FC";
const HEADING = "#0a1a3f";
const MUTED = "#5b6472";
const BORDER = "#e5e7eb";

// Hosted image, not embedded — email clients are unreliable with inline/
// base64 images, but reliably fetch a real HTTPS URL. Will 404 until
// legadocreativo.com is actually deployed; public/Logos/... is the source file.
const LOGO_URL = "https://legadocreativo.com/Logos/LEGADO_Logotipo-06.png";

export type ContactConfirmationLocale = "en" | "es";

const COPY: Record<
  ContactConfirmationLocale,
  {
    preview: string;
    heading: string;
    body: string;
    signoff: string;
    footer: (site: React.ReactNode) => React.ReactNode;
  }
> = {
  en: {
    preview: "We got your message — thanks for reaching out!",
    heading: "Thanks for reaching out!",
    body: "We've received your message and will get back to you within 24 hours on business days.",
    signoff: "— The Legado Creativo team",
    footer: (site) => <>You're receiving this because you contacted us at {site}</>,
  },
  es: {
    preview: "Recibimos tu mensaje — ¡gracias por escribirnos!",
    heading: "¡Gracias por escribirnos!",
    body: "Hemos recibido tu mensaje y te responderemos dentro de 24 horas en días hábiles.",
    signoff: "— El equipo de Legado Creativo",
    footer: (site) => <>Recibes esto porque nos contactaste en {site}</>,
  },
};

export interface ContactConfirmationEmailProps {
  name: string;
  locale?: ContactConfirmationLocale;
}

export default function ContactConfirmationEmail({
  name = "Jane",
  locale = "en",
}: ContactConfirmationEmailProps) {
  const t = COPY[locale];
  const firstName = name.trim().split(" ")[0] || name;

  return (
    <Html lang={locale}>
      <Head />
      <Preview>{t.preview}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <div style={styles.accentBar} />

          <Section style={styles.header}>
            <Img src={LOGO_URL} alt="Legado Creativo" width="160" height="37" />
          </Section>

          <Section style={styles.content}>
            <Heading style={styles.heading}>{t.heading}</Heading>
            <Text style={styles.body_}>
              {locale === "es" ? `Hola ${firstName},` : `Hi ${firstName},`}
            </Text>
            <Text style={styles.body_}>{t.body}</Text>
            <Text style={styles.signoff}>{t.signoff}</Text>
          </Section>

          <Hr style={styles.hr} />

          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              {t.footer(
                <Link href="https://legadocreativo.com" style={styles.footerLink}>
                  legadocreativo.com
                </Link>,
              )}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles: Record<string, React.CSSProperties> = {
  body: {
    backgroundColor: "#f4f5f7",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    margin: 0,
    padding: "32px 16px",
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    overflow: "hidden",
    maxWidth: 560,
    margin: "0 auto",
    border: `1px solid ${BORDER}`,
  },
  accentBar: {
    height: 6,
    background: `linear-gradient(90deg, ${MAGENTA} 0%, ${BLUE} 50%, ${LIME} 100%)`,
  },
  header: {
    padding: "28px 32px 8px",
  },
  content: {
    padding: "8px 32px 28px",
  },
  heading: {
    fontSize: 22,
    fontWeight: 700,
    color: HEADING,
    margin: "8px 0 16px",
  },
  body_: {
    fontSize: 14,
    lineHeight: "22px",
    color: HEADING,
    margin: "0 0 12px",
  },
  signoff: {
    fontSize: 14,
    color: MUTED,
    margin: "16px 0 0",
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
