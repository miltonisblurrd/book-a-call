import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="wrapper-footer">
          <Link href="/privacy" className="text-footer">
            Privacy
          </Link>
          <div className="line-divider-vertical footer" />
          <Link href="/terms-of-service" className="text-footer">
            Terms & Conditions
          </Link>
          <div className="line-divider-vertical footer" />
          <Link href="/book-a-call" className="text-footer">
            Book a Call
          </Link>
          <div className="line-divider-vertical footer" />
          <a
            href="https://buymeacoffee.com/blurrd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-footer"
          >
            Buy Us a Coffee
          </a>
          <div className="line-divider-vertical footer" />
          <Link href="/blog" className="text-footer">
            Blog
          </Link>
          <div className="line-divider-vertical footer" />
          <Link href="/faqs" className="text-footer">
            FAQs
          </Link>
        </div>
        <div className="text-footer u-text-gray">
          blurrd studio ©2016-2026 All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
