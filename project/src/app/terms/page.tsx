import LegalShell, {
  legalHeadingStyle,
  legalBodyStyle,
  legalListStyle,
} from "@/components/legal/LegalShell";

export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Service" updated="September 2026">
      <h2 style={legalHeadingStyle}>1. Acceptance of Terms</h2>
      <p style={legalBodyStyle}>
        By creating an account, accessing, or using PRAXIS (the platform,
        including all lessons, practice tools, market data, and community
        features), you agree to be bound by these Terms of Service. If you do
        not agree with any part of these terms, do not use the platform.
      </p>

      <h2 style={legalHeadingStyle}>2. Eligibility</h2>
      <p style={legalBodyStyle}>
        You must be at least 18 years old to use PRAXIS. By registering, you
        confirm that you meet this requirement and that all information you
        provide is accurate and current.
      </p>

      <h2 style={legalHeadingStyle}>3. Your Account</h2>
      <p style={legalBodyStyle}>
        You are responsible for maintaining the confidentiality of your account
        credentials and for all activity that occurs under your account. Notify
        us immediately if you believe your account has been compromised. We may
        suspend or terminate accounts that violate these terms.
      </p>

      <h2 style={legalHeadingStyle}>4. The Service</h2>
      <p style={legalBodyStyle}>
        PRAXIS is an educational platform. It provides structured lessons on
        financial concepts, a simulated practice portfolio, delayed market data
        for the Nairobi Securities Exchange, and an AI mentor named Jema.
      </p>
      <p style={legalBodyStyle}>
        All trading on PRAXIS is simulated. No real money changes hands. No
        brokerage relationship is created. No securities are bought or sold.
        Portfolio values, positions, and gains shown in the platform are
        hypothetical.
      </p>

      <h2 style={legalHeadingStyle}>5. Investment Disclaimer</h2>
      <p style={legalBodyStyle}>
        PRAXIS does not provide investment advice, financial advice, tax advice,
        or legal advice. Nothing on the platform constitutes a recommendation to
        buy, sell, or hold any security. All content is for educational
        purposes only.
      </p>
      <p style={legalBodyStyle}>
        Past performance in a simulated environment is not indicative of future
        results. Investing in real securities involves risk, including the risk
        of losing your entire investment. You should consult a licensed
        financial adviser before making any real investment decisions.
      </p>

      <h2 style={legalHeadingStyle}>6. Acceptable Use</h2>
      <p style={legalBodyStyle}>
        You agree not to:
      </p>
      <ul style={legalListStyle}>
        <li>Use the platform for any unlawful purpose.</li>
        <li>
          Attempt to gain unauthorised access to any part of the platform, its
          data, or other users&rsquo; accounts.
        </li>
        <li>
          Post content that constitutes investment advice, price predictions,
          solicitations, scams, or harassment.
        </li>
        <li>
          Reverse-engineer, scrape, or otherwise extract data from the platform
          at scale.
        </li>
        <li>
          Impersonate another person or misrepresent your affiliation with any
          entity.
        </li>
      </ul>
      <p style={legalBodyStyle}>
        We reserve the right to remove content and to suspend or terminate
        accounts that violate these rules.
      </p>

      <h2 style={legalHeadingStyle}>7. Community Content</h2>
      <p style={legalBodyStyle}>
        You retain ownership of any content you post to the community, but by
        posting you grant PRAXIS a non-exclusive, worldwide, royalty-free
        licence to display, distribute, and moderate that content within the
        platform. You are responsible for ensuring that your content does not
        infringe the rights of others.
      </p>

      <h2 style={legalHeadingStyle}>8. Third-Party Services</h2>
      <p style={legalBodyStyle}>
        PRAXIS uses third-party services to operate, including Supabase (data
        storage and authentication), Groq and Google (AI model inference),
        Mansa Markets (market data), and Upstash (rate limiting). Your use of
        PRAXIS is also subject to the terms of those providers where applicable.
        We are not responsible for interruptions, errors, or delays in any
        third-party service.
      </p>

      <h2 style={legalHeadingStyle}>9. Intellectual Property</h2>
      <p style={legalBodyStyle}>
        All lesson content, curriculum structure, code, design, and branding
        are owned by PRAXIS and protected by copyright. You may use the
        platform for personal, non-commercial learning. You may not reproduce,
        distribute, or resell any part of the content without written
        permission.
      </p>

      <h2 style={legalHeadingStyle}>10. Termination</h2>
      <p style={legalBodyStyle}>
        You may close your account at any time from the Account section of
        Settings. We may suspend or terminate your account if you violate these
        terms or if required by law. Upon termination, your right to use the
        platform ends immediately.
      </p>

      <h2 style={legalHeadingStyle}>11. Disclaimers</h2>
      <p style={legalBodyStyle}>
        The platform is provided on an &ldquo;as is&rdquo; and &ldquo;as
        available&rdquo; basis. To the maximum extent permitted by law, PRAXIS
        disclaims all warranties, express or implied, including any warranty of
        merchantability, fitness for a particular purpose, or non-infringement.
        We do not warrant that the platform will be uninterrupted, secure, or
        free of errors.
      </p>

      <h2 style={legalHeadingStyle}>12. Limitation of Liability</h2>
      <p style={legalBodyStyle}>
        To the maximum extent permitted by law, PRAXIS and its operators shall
        not be liable for any indirect, incidental, special, consequential, or
        punitive damages arising out of or related to your use of the platform.
        Our total liability for any claim arising out of these terms shall not
        exceed the amount you have paid us in the twelve months preceding the
        claim.
      </p>

      <h2 style={legalHeadingStyle}>13. Governing Law</h2>
      <p style={legalBodyStyle}>
        These terms are governed by the laws of Kenya. Any dispute arising out
        of or relating to these terms shall be subject to the exclusive
        jurisdiction of the courts of Kenya.
      </p>

      <h2 style={legalHeadingStyle}>14. Changes to These Terms</h2>
      <p style={legalBodyStyle}>
        We may update these terms from time to time. Material changes will be
        announced on the platform or by email. Continued use of the platform
        after a change takes effect constitutes acceptance of the new terms.
      </p>

      <h2 style={legalHeadingStyle}>15. Contact</h2>
      <p style={legalBodyStyle}>
        Questions about these terms may be sent to{" "}
        <a
          href="mailto:legal@praxis.app"
          style={{ color: "var(--color-primary)", textDecoration: "none" }}
        >
          legal@praxis.app
        </a>
        .
      </p>
    </LegalShell>
  );
}
