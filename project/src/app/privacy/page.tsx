import LegalShell, {
  legalHeadingStyle,
  legalBodyStyle,
  legalListStyle,
} from "@/components/legal/LegalShell";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" updated="September 2026">
      <h2 style={legalHeadingStyle}>1. Introduction</h2>
      <p style={legalBodyStyle}>
        This Privacy Policy explains what personal data PRAXIS collects, how we
        use it, who we share it with, and what rights you have over it. We are
        committed to handling your data in accordance with the Kenya Data
        Protection Act, 2019 (the &ldquo;DPA&rdquo;) and, where relevant, the
        General Data Protection Regulation (GDPR) for users in the European
        Economic Area.
      </p>

      <h2 style={legalHeadingStyle}>2. Data We Collect</h2>
      <p style={legalBodyStyle}>We collect the following categories of data:</p>
      <ul style={legalListStyle}>
        <li>
          <strong>Account data.</strong> Your name, email address, password
          (hashed and stored by our authentication provider, Supabase), and
          account creation date.
        </li>
        <li>
          <strong>Learning data.</strong> Lessons you have completed, quizzes
          you have taken, scores, and your progress through the curriculum.
        </li>
        <li>
          <strong>Practice data.</strong> Simulated portfolios, trades, journal
          notes, and practice card responses you create.
        </li>
        <li>
          <strong>Community data.</strong> Posts, replies, reactions, and
          reports you create on the community platform.
        </li>
        <li>
          <strong>Interaction data.</strong> Conversations you have with the AI
          mentor, Jema, and the durable memories Jema extracts from those
          conversations to personalise future responses.
        </li>
        <li>
          <strong>Technical data.</strong> Session identifiers, IP address, and
          user agent, used for security and rate limiting.
        </li>
      </ul>

      <h2 style={legalHeadingStyle}>3. How We Use Your Data</h2>
      <p style={legalBodyStyle}>We use your data to:</p>
      <ul style={legalListStyle}>
        <li>Provide, maintain, and improve the platform.</li>
        <li>Personalise lessons, practice recommendations, and Jema responses.</li>
        <li>Send account notifications, security alerts, and, if enabled, weekly summaries.</li>
        <li>Detect, prevent, and respond to fraud, abuse, and security incidents.</li>
        <li>Comply with legal obligations under Kenyan law.</li>
      </ul>

      <h2 style={legalHeadingStyle}>4. Legal Basis</h2>
      <p style={legalBodyStyle}>
        Under the DPA we process your personal data on the following bases:
        <strong> performance of a contract</strong> (to provide the service you
        signed up for), <strong> legitimate interest</strong> (security,
        fraud prevention, and service improvement), <strong>consent</strong>{" "}
        (for optional notifications and analytics), and{" "}
        <strong> legal obligation</strong> (for tax and regulatory
        record-keeping).
      </p>

      <h2 style={legalHeadingStyle}>5. Sharing Your Data</h2>
      <p style={legalBodyStyle}>
        We share data with the following categories of third parties, each
        bound by their own privacy commitments:
      </p>
      <ul style={legalListStyle}>
        <li>
          <strong>Supabase.</strong> Database, authentication, and file storage.
        </li>
        <li>
          <strong>Groq and Google.</strong> AI model inference for Jema chat and
          practice card generation. Prompts and responses are transmitted but
          not used to train those providers&rsquo; models.
        </li>
        <li>
          <strong>Mansa Markets.</strong> Public market data for the NSE. No
          personal data is sent to this service.
        </li>
        <li>
          <strong>Upstash.</strong> Rate limiting. Only an anonymous user
          identifier is transmitted.
        </li>
      </ul>
      <p style={legalBodyStyle}>
        We do not sell your personal data. We do not share it with advertisers
        or data brokers.
      </p>

      <h2 style={legalHeadingStyle}>6. Data Retention</h2>
      <p style={legalBodyStyle}>
        Account data is retained while your account is active. When you delete
        your account, we permanently remove your account record and all
        associated learning, practice, and community data within 30 days,
        except where we are required to retain records by law. Aggregated and
        anonymised data that cannot be linked back to you may be retained
        indefinitely.
      </p>

      <h2 style={legalHeadingStyle}>7. Security</h2>
      <p style={legalBodyStyle}>
        We protect your data using industry-standard measures including
        HTTPS-only transport, HTTP-only session cookies, hashed passwords,
        signed session tokens verified server-side, rate limiting on
        authentication endpoints, and strict Content Security Policy headers.
        No system is completely secure. If we become aware of a breach that
        affects your personal data, we will notify you and the Office of the
        Data Protection Commissioner as required by the DPA.
      </p>

      <h2 style={legalHeadingStyle}>8. Your Rights</h2>
      <p style={legalBodyStyle}>Under the DPA you have the right to:</p>
      <ul style={legalListStyle}>
        <li>Be informed about how your data is used.</li>
        <li>Access the personal data we hold about you.</li>
        <li>Request correction of inaccurate data.</li>
        <li>Request deletion of your data (available directly in Settings).</li>
        <li>Object to or restrict certain processing.</li>
        <li>Request portability of your data in a machine-readable format.</li>
        <li>Lodge a complaint with the Office of the Data Protection Commissioner.</li>
      </ul>
      <p style={legalBodyStyle}>
        To exercise any of these rights, contact{" "}
        <a
          href="mailto:privacy@praxis.app"
          style={{ color: "var(--color-primary)", textDecoration: "none" }}
        >
          privacy@praxis.app
        </a>
        .
      </p>

      <h2 style={legalHeadingStyle}>9. Cookies and Sessions</h2>
      <p style={legalBodyStyle}>
        PRAXIS uses a single HTTP-only session cookie to keep you signed in.
        We do not use advertising cookies, tracking pixels, or third-party
        analytics cookies. You can clear the session cookie at any time from
        your browser settings, which will sign you out.
      </p>

      <h2 style={legalHeadingStyle}>10. Children&rsquo;s Privacy</h2>
      <p style={legalBodyStyle}>
        PRAXIS is not intended for users under 18. We do not knowingly collect
        personal data from children. If you believe a child has created an
        account, contact us and we will remove it.
      </p>

      <h2 style={legalHeadingStyle}>11. International Transfers</h2>
      <p style={legalBodyStyle}>
        Some of our service providers are located outside Kenya. When we
        transfer data internationally, we rely on appropriate safeguards under
        the DPA, including standard contractual clauses and processing
        agreements with each provider.
      </p>

      <h2 style={legalHeadingStyle}>12. Changes to This Policy</h2>
      <p style={legalBodyStyle}>
        We may update this policy from time to time. Material changes will be
        announced on the platform or by email. The &ldquo;last updated&rdquo;
        date at the top of this page always reflects the current version.
      </p>

      <h2 style={legalHeadingStyle}>13. Contact</h2>
      <p style={legalBodyStyle}>
        For any privacy question, or to exercise a data right, contact{" "}
        <a
          href="mailto:privacy@praxis.app"
          style={{ color: "var(--color-primary)", textDecoration: "none" }}
        >
          privacy@praxis.app
        </a>
        . Our Data Protection Officer can be reached at the same address.
      </p>
    </LegalShell>
  );
}
