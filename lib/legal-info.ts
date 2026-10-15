// Single source of truth for the business details that appear in the Privacy
// Policy and Terms of Service (messages/*.json -> privacyPolicy / termsOfService).
//
// The legal copy references these through {tokens} — {legalName}, {email},
// {phone}, {address}, {website}, {effectiveDate} — which components/legal-content.tsx
// replaces at render time. To finish or update the legal pages, edit this file
// and (when the policy text itself changes) bump `effectiveDate`.
//
// TODO before relying on these pages:
//  - legalName: use the registered entity name (e.g. "Legado Creativo, LLC") if there is one.
//  - email: ideally a role address on the company domain (e.g. privacy@legadocreativo.com)
//    instead of a personal Gmail; update contact-info.tsx and CONTACT_TO_EMAIL to match.
//  - address: add a full street address or PO Box. California's Civil Code 1789.3 notice and
//    CAN-SPAM (for any marketing email) expect a physical postal address.

export const LEGAL_INFO = {
  legalName: "Legado Creativo",
  email: "info@legadocreativo.com",
  phone: { display: "+1 (617) 515-5000", tel: "+16175155000" },
  address: "Boston, Massachusetts, United States",
  website: "https://legadocreativo.com",
  effectiveDate: {
    en: "October 11, 2026",
    es: "11 de octubre de 2026",
  },
} as const;
