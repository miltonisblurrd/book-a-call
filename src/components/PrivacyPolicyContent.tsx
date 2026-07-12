type PolicySectionProps = {
  title: string;
  children: React.ReactNode;
};

function PolicySection({ title, children }: PolicySectionProps) {
  return (
    <div className="wrapper-blue u-mb-2 u-scroll-none">
      <div className="wrapper-blue-header u-p-20-around">
        <div className="wrapper-header u-mb-0">
          <p className="text-paragraph u-extra-bold u-text-white u-mb-0 u-mr-2">
            {title}
          </p>
        </div>
      </div>
      <div className="u-p-all-around">
        <div className="w-richtext legal-content">{children}</div>
      </div>
    </div>
  );
}

export default function PrivacyPolicyContent() {
  return (
    <>
      <div className="wrapper-blue u-mb-2 u-scroll-none">
        <div className="wrapper-blue-header u-p-20-around">
          <div className="wrapper-header u-mb-0">
            <p className="text-paragraph u-extra-bold u-text-white u-mb-0 u-mr-2">
              07/11/2026
            </p>
          </div>
        </div>
        <p className="text-paragraph u-p-all-around">
          This Privacy Policy explains how BLURRD Studio (&ldquo;BLURRD,&rdquo;
          &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects,
          uses, and protects information when you visit{" "}
          <a href="https://www.blurrdstudio.com">blurrdstudio.com</a>, book a
          call, browse our blog, or otherwise interact with our
          website and services.
        </p>
      </div>

      <PolicySection title="1) Who We Are">
        <p>
          BLURRD Studio is a branding, design, and development studio based in
          Las Vegas, Nevada. For privacy-related questions, contact us at{" "}
          <a href="mailto:milton@blurrdstudio.com">milton@blurrdstudio.com</a>.
        </p>
      </PolicySection>

      <PolicySection title="2) Information We Collect">
        <p>Depending on how you use the site, we may collect:</p>
        <ul>
          <li>
            <strong>Booking information.</strong> When you schedule an intro call
            through <a href="/book-a-call">Book a Call</a>, we collect your
            name, email address, optional website URL, project details, budget
            range, timeline, and any additional notes you submit.
          </li>
          <li>
            <strong>Email communications.</strong> If you email us directly, we
            receive the information you choose to include in your message.
          </li>
          <li>
            <strong>Usage and analytics data.</strong> We use Google Analytics to
            understand how visitors use the site (for example, pages viewed,
            approximate location, browser type, device type, and referral
            source). Analytics data is collected through cookies and similar
            technologies.
          </li>
          <li>
            <strong>Basic site interaction data.</strong> Some pages may record
            anonymous aggregate counters (such as profile view counts) that do
            not identify you personally.
          </li>
          <li>
            <strong>Embedded content.</strong> Pages that include YouTube videos,
            Kick stream embeds, or links to GitHub may cause those platforms to
            collect information according to their own policies.
          </li>
        </ul>
      </PolicySection>

      <PolicySection title="3) How We Use Information">
        <p>We use the information we collect to:</p>
        <ul>
          <li>Schedule and manage intro calls and project inquiries</li>
          <li>Send booking confirmations and calendar invites</li>
          <li>Respond to questions you send by email</li>
          <li>Improve site performance, content, and user experience</li>
          <li>Understand which pages and resources are most useful</li>
          <li>Maintain the security and reliability of the website</li>
        </ul>
        <p>
          We do not sell your personal information. We do not use booking form
          data for unrelated marketing without your consent.
        </p>
      </PolicySection>

      <PolicySection title="4) How Bookings Are Processed">
        <p>When you book a call, your information may be processed by:</p>
        <ul>
          <li>
            <strong>Google Calendar</strong> — to create the meeting event and
            send you a calendar invite
          </li>
          <li>
            <strong>Resend</strong> — to deliver booking notification emails to
            BLURRD Studio
          </li>
          <li>
            <strong>Our hosting provider</strong> — to securely transmit form
            submissions through our booking API
          </li>
        </ul>
        <p>
          By submitting the booking form, you agree that we may use your email
          address to send scheduling-related communications for that request.
        </p>
      </PolicySection>

      <PolicySection title="5) Cookies and Analytics">
        <p>
          We use cookies and similar technologies through Google Analytics to
          measure site traffic and usage patterns. You can control cookies
          through your browser settings. Blocking cookies may affect certain site
          features.
        </p>
        <p>
          Third-party embeds (such as YouTube or Kick players) may set their own
          cookies when you interact with them.
        </p>
      </PolicySection>

      <PolicySection title="6) Third-Party Services">
        <p>
          Our site links to or integrates with services operated by third
          parties, including:
        </p>
        <ul>
          <li>Google (Analytics and Calendar)</li>
          <li>Resend (transactional email)</li>
          <li>Vercel and Cloudflare (hosting and delivery)</li>
          <li>YouTube (embedded tutorials)</li>
          <li>Kick (live stream links and embeds)</li>
          <li>GitHub (open-source repos linked from the blog)</li>
        </ul>
        <p>
          Those services have their own privacy policies. We encourage you to
          review them when you leave our site or interact with embedded content.
        </p>
      </PolicySection>

      <PolicySection title="7) Data Retention">
        <p>
          We retain booking and inquiry information for as long as needed to
          schedule calls, evaluate project fit, maintain business records, and
          comply with legal obligations. Analytics data is retained according to
          Google Analytics settings and our internal reporting needs.
        </p>
      </PolicySection>

      <PolicySection title="8) Your Choices">
        <p>You can:</p>
        <ul>
          <li>
            Opt out of non-essential cookies using your browser controls
          </li>
          <li>
            Request access to, correction of, or deletion of personal
            information you submitted by emailing{" "}
            <a href="mailto:milton@blurrdstudio.com">milton@blurrdstudio.com</a>
          </li>
          <li>
            Decline to provide optional fields on forms (though some information
            is required to book a call)
          </li>
        </ul>
      </PolicySection>

      <PolicySection title="9) Children’s Privacy">
        <p>
          BLURRD Studio services are directed at businesses and professionals.
          We do not knowingly collect personal information from children under
          13. If you believe a child has provided us information, contact us and
          we will delete it.
        </p>
      </PolicySection>

      <PolicySection title="10) Security">
        <p>
          We use reasonable administrative and technical safeguards to protect
          information submitted through the site. No method of transmission over
          the internet is completely secure, and we cannot guarantee absolute
          security.
        </p>
      </PolicySection>

      <PolicySection title="11) Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. When we do, we
          will revise the effective date at the top of this page. Continued use
          of the site after changes are posted means you accept the updated
          policy.
        </p>
      </PolicySection>

      <PolicySection title="12) Contact">
        <p>
          Questions about this Privacy Policy or your data? Email{" "}
          <a href="mailto:milton@blurrdstudio.com">milton@blurrdstudio.com</a>.
        </p>
        <p>
          See also our{" "}
          <a href="/terms-of-service">Terms of Service</a> for project and
          engagement terms.
        </p>
      </PolicySection>
    </>
  );
}
